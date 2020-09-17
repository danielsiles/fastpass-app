import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import IndexScreen from '_scenes/index/index.js';
import LoginScreen from '_scenes/login/index.js';
import RegisterScreen from '_scenes/register/index.js';

const AuthNavigatorConfig = {
  initialRouteName: 'Index',
  header: null,
  headerMode: 'none',
};

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator {...AuthNavigatorConfig}>
      <Stack.Screen name="Index" component={IndexScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
