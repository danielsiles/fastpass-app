import {query} from '_utils/httpRequestUtil';
import {REGISTER_USER} from './queries';

const actions = {
  REGISTER_USER: 'REGISTER_USER',
  registerUser: (
    registerForm,
    callbackSucceded = () => {},
    callbackFailed = () => {},
  ) => {
    let variables = {
      ...registerForm,
    };
    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.REGISTER_USER,
          REGISTER_USER,
          variables,
          callbackSucceded,
          callbackFailed,
        ),
      );
    };
  },
};
export default actions;
