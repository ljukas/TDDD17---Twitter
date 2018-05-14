import { FETCH_RETWEETERS } from "../actions";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_RETWEETERS:
      if (action.error) {
        return state;
      }
      return action.payload.data;
    default:
      return state;
  }
}
