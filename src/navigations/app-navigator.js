import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '_scenes/home';
import EstablishmentScreen from '_scenes/establishment';
import TicketScreen from '_scenes/ticket';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Ticket" component={TicketScreen} />
    </Drawer.Navigator>
  );
};

const Stack = createStackNavigator();

const AppStackNavigator = () => {
  const StackAppNavigatorConfig = {
    // initialRouteName: 'Profile',
    header: null,
    headerMode: 'none',
  };

  return (
    <Stack.Navigator {...StackAppNavigatorConfig}>
      <Stack.Screen name="App" component={AppNavigator} />
      <Stack.Screen name="Establishment" component={EstablishmentScreen} />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
