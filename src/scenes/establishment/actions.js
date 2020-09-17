import {query, subscribe, unsubscribe} from '_utils/httpRequestUtil';
import {
  LIST_WORKING_SERVICES,
  CREATE_TICKET,
  SUBSCRIBE_TICKET,
  GET_BRANCH_DETAILS,
  CREATE_BOOKING,
} from './queries';

const actions = {
  LIST_WORKING_SERVICES: 'LIST_WORKING_SERVICES',
  CREATE_TICKET: 'CREATE_TICKET',
  SUBSCRIBE_TICKET: 'SUBSCRIBE_TICKET',
  GET_BRANCH_DETAILS: 'GET_BRANCH_DETAILS',
  listWorkingServices: (
    branchId,
    callbackSucceded = () => {},
    callbackFailed = () => {},
  ) => {
    let variables = {
      branchId: branchId,
    };
    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.LIST_WORKING_SERVICES,
          LIST_WORKING_SERVICES,
          variables,
          callbackSucceded,
          callbackFailed,
        ),
      );
    };
  },
  createTicket: (
    serviceId,
    type,
    callbackSucceded = () => {},
    callbackFailed = () => {},
  ) => {
    let variables = {
      serviceId: serviceId,
    };

    let queryString;
    if (type === 'booking') {
      queryString = CREATE_BOOKING;
    } else {
      queryString = CREATE_TICKET;
    }
    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.CREATE_TICKET,
          queryString,
          variables,
          callbackSucceded,
          callbackFailed,
        ),
      );
    };
  },
  getBranchDetails: (
    branchId,
    callbackSucceded = () => {},
    callbackFailed = () => {},
  ) => {
    let variables = {
      branchId: branchId,
    };
    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.GET_BRANCH_DETAILS,
          GET_BRANCH_DETAILS,
          variables,
          callbackSucceded,
          callbackFailed,
        ),
      );
    };
  },
  subscribeTicket: (
    branchId,
    callbackSucceded = () => {},
    callbackFailed = () => {},
  ) => {
    let variables = {
      branchId: branchId,
    };
    return (dispatch, getState) => {
      dispatch(
        subscribe(
          dispatch,
          getState,
          actions.SUBSCRIBE_TICKET,
          SUBSCRIBE_TICKET,
          variables,
          callbackSucceded,
          callbackFailed,
        ),
      );
    };
  },
  unsubscribeTicket: (notifier) => {
    return (dispatch, getState) => {
      dispatch(unsubscribe(dispatch, getState, notifier));
    };
  },
};
export default actions;
