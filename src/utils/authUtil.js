// import { AccessToken } from "react-native-fbsdk";
// import { postAction } from "_utils";
// import { BASE_URL } from "src/config";
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import authActions from '_scenes/login/actions';
import * as rootNavigation from '../rootNavigation';

export const loginUserFacebook = (data) => {
  return (dispatch, getState) => {
    LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            dispatch(
              authActions.loginUserWithFacebook(
                data.accessToken,
                (data) => {
                  dispatch(getUser());
                },
                (error) => {
                  console.log(error);
                  console.log(error.data);
                  rootNavigation.navigate('QuickRegister');
                },
              ),
            );
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };
};

export const loginUser = (email, password) => {
  return (dispatch, getState) => {
    dispatch(
      authActions.loginUser(email, password, (data) => {
        dispatch(getUser());
      }),
    );
  };
};

export const getUser = () => {
  return (dispatch, getState) => {
    dispatch(
      authActions.getUser(() => {
        rootNavigation.navigate('App');
      }),
    );
  };
};
