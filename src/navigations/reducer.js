import {createReducer} from '@reduxjs/toolkit';
import actions from './actions';

const initState = {
  tabBarVisibility: true,
};

const navigationReducer = createReducer(initState, {
  [actions.setTabBarVisibility]: (state, action) => {
    state.tabBarVisibility = action.payload.visible;
  },
});

export default navigationReducer;
