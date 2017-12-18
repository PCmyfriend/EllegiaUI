import { fromJS } from 'immutable';

import { SHOW_LOADING, HIDE_LOADING } from './constants';

const initialState = fromJS({
  loading: false,
});

function progressReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADING:
      return state
        .set('loading', true);
    case HIDE_LOADING:
      return state
        .set('loading', false);
    default:
      return state;
  }
}

export default progressReducer;
