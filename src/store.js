import {createStore, combineReducers, applyMiddleware} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const middlewares = [thunk];

const combinedReducers = combineReducers({
  ...reducers,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const store = createStore(persistedReducer, applyMiddleware(...middlewares));

let persistor = persistStore(store);

export default store;
export {persistor};
