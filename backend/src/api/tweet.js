import db from '../db/models';
import { client } from './index';

export default async id => {
  try {
    const response = await client.get('statuses/show', { id });
    const tweet_data = await handleResponse(response);
    return tweet_data;
  } catch (e) {
    console.error(e);
    throw new Error('Something went wrong.');
  }
};

const handleResponse = async data => {
  const tweet_data = {
    id: data.id_str,
    text: data.text,
    retweet_count: data.retweet_count,
    favorite_count: data.favorite_count
  };
  const user_data = {
    id: data.user.id_str,
    user_name: data.user.name,
    screen_name: data.user.screen_name,
    location: data.user.location,
    followers_count: data.user.followers_count,
    friends_count: data.user.friends_count,
    statuses_count: data.user.statuses_count
  };
  await createUser(user_data);
  await createTweet(tweet_data, user_data.id);
  return { tweet_data, user_data };
};

const createUser = async ({
  id,
  followers_count,
  friends_count,
  statuses_count,
  location
}) => {
  const [twitter_user, user_created] = await db.User.findOrCreate({
    where: {
      id
    },
    defaults: {
      followers_count,
      friends_count,
      statuses_count,
      location
    }
  });
};

const createTweet = async (
  { id, favorite_count, retweet_count },
  twitter_user_id
) => {
  const [db_tweet, tweet_created] = await db.Tweet.findOrCreate({
    where: {
      id
    },
    defaults: {
      favorite_count,
      retweet_count,
      twitter_user_id
    }
  });
  if (!tweet_created) {
    // update count fields.
  }
};
