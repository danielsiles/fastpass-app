import React from 'react';
import {Provider} from 'react-redux';
import store, {persistor} from './store';
import {PersistGate} from 'redux-persist/integration/react';
import 'moment/locale/pt-br';
import moment from 'moment';
moment.locale('pt-br');

import RootNavigator from '_navigations';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
