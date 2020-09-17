import {createReducer} from '@reduxjs/toolkit';
import actions from './actions';
import {reduceAction} from '_utils/reducerUtil';
import {RED} from '_styles/colors';

const initState = {
  branchFilter: 'RESTAURANT',
  branchColor: RED,
};

const homeReducer = createReducer(initState, {
  ...reduceAction(
    actions.LIST_BRANCHES,
    'branchesStatus',
    'branches',
    'branches',
  ),
  [actions.FILTER_BRANCH]: (state, action) => {
    state.branchFilter = action.payload.type;
    state.branchColor = action.payload.color;
    return state;
  },
});

export default homeReducer;
