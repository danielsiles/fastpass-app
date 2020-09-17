import {createReducer} from '@reduxjs/toolkit';
import actions from './actions';
import {reduceAction} from '_utils/reducerUtil';

const initState = {
  token: '',
  loginUserStatus: '',
  getUserStatus: '',
  isLoggedIn: false,
  user: null,
};

const surveyReducer = createReducer(initState, {
  ...reduceAction(
    actions.LOGIN,
    'loginUserStatus',
    [
      {data: 'token', value: 'token'},
      {data: 'user', value: 'user'},
    ],
    'loginUser',
  ),
  ...reduceAction(actions.GET_SURVEY, 'getSurveyStatus', 'survey'),
});

export default surveyReducer;
