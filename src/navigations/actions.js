import {createAction} from '@reduxjs/toolkit';

const actions = {
  setTabBarVisibility: createAction('navigation/tabBar', function prepare(
    visible,
  ) {
    return {
      payload: {
        visible: visible,
      },
    };
  }),
};
export default actions;
