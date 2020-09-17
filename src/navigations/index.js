import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AuthNavigator from './auth-navigator';
import AppStackNavigator from './app-navigator';

import {navigationRef} from './../rootNavigation';

const AuthNavigatorConfig = {
  initialRouteName: 'Login',
  header: null,
  headerMode: 'none',
};

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator {...AuthNavigatorConfig}>
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="App" component={AppStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
