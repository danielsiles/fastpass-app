import {createReducer} from '@reduxjs/toolkit';
import actions from './actions';

const initState = {};

const inputReducer = createReducer(initState, {
  [actions.inputChange]: (state, action) => {
    if (!state[action.payload.formName]) {
      state[action.payload.formName] = {};
      state[action.payload.formName][action.payload.inputName] =
        action.payload.inputValue;
    } else {
      state[action.payload.formName][action.payload.inputName] =
        action.payload.inputValue;
    }
  },
  [actions.fillAddress]: (state, action) => {
    state[action.payload.formName].neighborhood = action.payload.values.bairro;
    state[action.payload.formName].city = action.payload.values.localidade;
    state[action.payload.formName].street = action.payload.values.logradouro;
  },
});

export default inputReducer;
