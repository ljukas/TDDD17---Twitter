import { combineReducers } from 'redux';
import TweetReducer from './reducer_tweet';
import RetweetersReducer from './reducer_retweeters';

const rootReducer = combineReducers({
  tweet: TweetReducer,
  retweeters: RetweetersReducer
});

export default rootReducer;
