import {createAction} from '@reduxjs/toolkit';

const actions = {
  inputChange: createAction('input/change', function prepare(
    formName,
    inputName,
    inputValue,
  ) {
    return {
      payload: {
        formName: formName,
        inputName: inputName,
        inputValue: inputValue,
      },
    };
  }),
  fillAddress: createAction('input/fillAddress', function prepare(
    formName,
    values,
  ) {
    return {
      payload: {
        formName: formName,
        values: values,
      },
    };
  }),
};
export default actions;
