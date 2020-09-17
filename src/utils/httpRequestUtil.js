import axios from 'axios';
import {GraphQLClient} from 'graphql-request';
import {BASE_URL} from '../config';
import * as withAbsintheSocket from '@absinthe/socket';
import {absintheSocket} from '../socket';

export function getAction(
  dispatch,
  getState,
  type,
  url,
  callbackSucceeded = () => {},
  callbackFailed = () => {},
) {
  return {
    type: type + '_FETCHING',
    payload: axios
      .get(BASE_URL + url, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.token,
          Accept: 'application/json',
        },
      })
      .then((response) => {
        dispatch({type: type + '_SUCCEEDED', payload: response.data});
        callbackSucceeded(response.data);
      })
      .catch((error) => {
        dispatch({type: type + '_FAILED', payload: error.response});
        callbackFailed(error.response);
      }),
  };
}

export function postAction(
  dispatch,
  getState,
  type,
  url,
  data,
  callbackSucceeded = () => {},
  callbackFailed = () => {},
) {
  return {
    type: type + '_FETCHING',
    payload: axios
      .post(BASE_URL + url, data, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.token,
          Accept: 'application/json',
        },
      })
      .then((response) => {
        dispatch({type: type + '_SUCCEEDED', payload: response.data});
        callbackSucceeded(response.data);
      })
      .catch((error) => {
        dispatch({type: type + '_FAILED', payload: error.response});
        callbackFailed(error.response);
      }),
  };
}

export function query(
  dispatch,
  getState,
  type,
  queryString,
  variables,
  callbackSucceeded = () => {},
  callbackFailed = () => {},
) {
  const client = new GraphQLClient('http://localhost:4000/api/graphql', {
    headers: {
      authorization: 'Bearer ' + getState().auth.token,
    },
  });
  return {
    type: type + '_FETCHING',
    payload: client
      .request(queryString, variables)
      .then((response) => {
        dispatch({type: type + '_SUCCEEDED', payload: response});
        callbackSucceeded(response);
      })
      .catch((error) => {
        dispatch({type: type + '_FAILED', payload: error.response});
        callbackFailed(error.response);
      }),
  };
}

export function subscribe(
  dispatch,
  getState,
  type,
  queryString,
  variables,
  callbackSucceeded = () => {},
  onEvent = () => {},
) {
  let operation = queryString;
  const notifier = withAbsintheSocket.send(absintheSocket, {
    operation,
    variables: variables,
  });

  const dispatchEvent = (eventName) => (...args) => {
    dispatch({
      type: type + '_' + eventName,
      payload: args[0],
    });
    if (eventName === 'RESULT') {
      onEvent(args[0]);
    }
  };

  let updatedNotifier = withAbsintheSocket.observe(absintheSocket, notifier, {
    onAbort: dispatchEvent('ABORT'),
    onError: dispatchEvent('ERROR'),
    onStart: dispatchEvent('OPEN'),
    onResult: dispatchEvent('RESULT'),
  });

  callbackSucceeded(updatedNotifier);
  return {
    type: type + '_SUBSCRIBE',
    payload: updatedNotifier,
  };
}

export function unsubscribe(dispatch, getState, notifier) {
  let updatedNotifier = notifier;
  let index = -1;
  for (let i = 0; i < absintheSocket.notifiers.length; i++) {
    if (absintheSocket.notifiers[i].request === notifier.request) {
      index = i;
      break;
    }
  }
  if (index < 0) {
    index = 0;
  }
  withAbsintheSocket.cancel(absintheSocket, absintheSocket.notifiers[index]);
  return {
    type: '_UNSUBSCRIBE',
    payload: updatedNotifier,
  };
}
