import authReducer from '_scenes/login/reducer';
import establishmentReducer from '_scenes/establishment/reducer';
import ticketReducer from '_scenes/ticket/reducer';
import homeReducer from '_scenes/home/reducer';
import inputReducer from '_atoms/input/reducer';

export default {
  auth: authReducer,
  input: inputReducer,
  establishment: establishmentReducer,
  ticket: ticketReducer,
  home: homeReducer,
};
