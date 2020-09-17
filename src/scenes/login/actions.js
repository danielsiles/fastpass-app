import {postAction, getAction} from '_utils/httpRequestUtil';
import {query} from '_utils/httpRequestUtil';
import {LOGIN_USER} from './queries';

const actions = {
  LOGIN: 'LOGIN',
  GET_USER: 'GET_USER',
  LOGOUT: 'LOGOUT',
  SET_PERMISSION: 'SET_PERMISSION',
  loginUser: (
    userName,
    password,
    callbackSucceded = () => {},
    callbackFailed = () => {},
  ) => {
    let variables = {
      email: userName,
      password: password,
    };
    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.LOGIN,
          LOGIN_USER,
          variables,
          callbackSucceded,
          callbackFailed,
        ),
      );
    };
  },
  loginUserWithFacebook: (
    access_token,
    callbackSucceded = () => {},
    callbackFailed = () => {},
  ) => {
    let data = {
      client_id: 3,
      client_secret: 'Q0zbzXxtoobtaggXiTOD0UuArr1u3by7FGL6BazD',
      grant_type: 'facebook_login',
      fb_token: access_token,
    };
    return (dispatch, getState) => {
      dispatch(
        postAction(
          dispatch,
          getState,
          actions.LOGIN,
          'oauth/token',
          data,
          callbackSucceded,
          callbackFailed,
        ),
      );
    };
  },
  getUser: (callbackSucceded = () => {}, callbackFailed = () => {}) => {
    return (dispatch, getState) => {
      dispatch(
        getAction(
          dispatch,
          getState,
          actions.GET_USER,
          'api/user',
          callbackSucceded,
          callbackFailed,
        ),
      );
    };
  },
  logout: () => {
    return {
      type: actions.LOGOUT,
    };
  },
  setPermission: (permission) => {
    return {
      type: actions.SET_PERMISSION,
      payload: permission,
    };
  },
};
export default actions;
