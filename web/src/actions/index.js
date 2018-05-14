import axios from 'axios';

export const FETCH_TWEET = 'FETCH_TWEET';
export const FETCH_RETWEETERS = 'FETCH_RETWEETERS';
export const INIT_SUBSCRIPTION = 'INIT_SUBSCRIPTION';

// Construct URL based on the current domain
let url = window.location.href;
let urlSplit = url.split(':');
const ROOT_URL = urlSplit[0] + ':' + urlSplit[1] + ':3001/api';

export function fetchTweet(tweetId) {
  const url = `${ROOT_URL}/tweet/${tweetId}`;
  const request = axios.get(url);

  return {
    type: FETCH_TWEET,
    payload: request
  };
}

export function fetchRetweeters(tweetId) {
  const url = `${ROOT_URL}/tweet/${tweetId}/retweeters`;
  console.log(url);
  const request = axios.get(url);

  return {
    type: FETCH_RETWEETERS,
    payload: request
  };
}

export function initSubscription(screenName) {
  const url = `${ROOT_URL}/subscribe/${screenName}`;
  const request = axios.post(url);

  return {
    type: INIT_SUBSCRIPTION,
    payload: request
  };
}
