import db from '../db/models';
import { client } from './index';
import getRetweets from './retweeters';
import getTweet from './tweet';

var active_subscription = false;

export default async screen_name => {
  if (active_subscription) {
    return false;
  }
  try {
    const response = await client.get('users/show', {
      screen_name
    });
    const success = await handleResponse(response);
    return success;
  } catch (e) {
    console.error(e);
    throw new Error('Something went wrong.');
  }
};

const handleResponse = async response => {
  if (!response.status) return false;

  let sub_data = {
    id: response.id_str,
    screen_name: response.screen_name,
    latest_tweet: response.status.id_str,
    counter: 0
  };

  let subscription = setInterval(checkSubscription, 1000 * 5);
  sub_data['subscription'] = subscription;
  active_subscription = sub_data;
  return true;
};

const checkSubscription = async () => {
  try {
    const response = await client.get('users/show', {
      screen_name: active_subscription.screen_name
    });
    if (response.status.id_str !== active_subscription.latest_tweet) {
      active_subscription.latest_tweet = response.status.id_str;
      clearInterval(active_subscription.subscription);
      await getTweet(response.status.id_str);
      collectRetweets(response.status.id_str);
    }
  } catch (e) {
    console.error(e);
    console.error('wat');
  }
};

const collectRetweets = async id => {
  getRetweets(active_subscription.latest_tweet);
  let subscription = setInterval(latestRetweets, 1000 * 10);
  active_subscription['subscription'] = subscription;
};

const latestRetweets = () => {
  getRetweets(active_subscription.latest_tweet);
  active_subscription.counter += 1;
  // Collect retweets for 3h
  if (active_subscription.counter == 3600) {
    clearInterval(active_subscription.subscription);
    active_subscription = false;
  }
};
