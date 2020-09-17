import {query, subscribe} from '_utils/httpRequestUtil';
import {
  CURRENT_TICKET,
  SUBSCRIBE_TICKET_CALL,
  CANCEL_TICKET,
  CHECK_IN,
  LATEST_TICKETS,
} from './queries';

const actions = {
  CURRENT_TICKET: 'CURRENT_TICKET',
  CANCEL_TICKET: 'CANCEL_TICKET',
  SUBSCRIBE_TICKET_CALL: 'SUBSCRIBE_TICKET_CALL',
  CHECK_IN: 'CHECK_IN',
  LATEST_TICKETS: 'LATEST_TICKETS',
  currentTicket: (callbackSucceded = () => {}, callbackFailed = () => {}) => {
    let variables = {};
    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.CURRENT_TICKET,
          CURRENT_TICKET,
          variables,
          callbackSucceded,
          callbackFailed,
        ),
      );
    };
  },
  cancelTicket: (
    ticketId,
    callbackSucceded = () => {},
    callbackFailed = () => {},
  ) => {
    let variables = {
      ticketId: ticketId,
    };
    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.CANCEL_TICKET,
          CANCEL_TICKET,
          variables,
          callbackSucceded,
          callbackFailed,
        ),
      );
    };
  },
  subscribeTicketCall: (
    ticketId,
    callbackSucceded = () => {},
    callbackFailed = () => {},
  ) => {
    let variables = {
      ticketId: ticketId,
    };
    return (dispatch, getState) => {
      dispatch(
        subscribe(
          dispatch,
          getState,
          actions.SUBSCRIBE_TICKET_CALL,
          SUBSCRIBE_TICKET_CALL,
          variables,
          callbackSucceded,
          callbackFailed,
        ),
      );
    };
  },
  checkIn: (
    ticketId,
    callbackSucceded = () => {},
    callbackFailed = () => {},
  ) => {
    let variables = {
      ticketId: ticketId,
    };
    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.CHECK_IN,
          CHECK_IN,
          variables,
          callbackSucceded,
          callbackFailed,
        ),
      );
    };
  },
  latestTickets: (
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
          actions.LATEST_TICKETS,
          LATEST_TICKETS,
          variables,
          callbackSucceded,
          callbackFailed,
        ),
      );
    };
  },
};
export default actions;
