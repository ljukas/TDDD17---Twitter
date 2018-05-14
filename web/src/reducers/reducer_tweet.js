import { FETCH_TWEET, INIT_SUBSCRIPTION } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_TWEET:
      if (action.error) {
        console.log('ERROR');
        return {};
      }
      return action.payload.data;
    case INIT_SUBSCRIPTION:
      console.log('Subscription:', action);
      return state;
    default:
      return state;
  }
}
