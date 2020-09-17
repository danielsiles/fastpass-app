import {createReducer} from '@reduxjs/toolkit';
import actions from './actions';
import {reduceAction, reduceSubscription} from '_utils/reducerUtil';

const initState = {};

const ticketReducer = createReducer(initState, {
  ...reduceAction(
    actions.CURRENT_TICKET,
    'currentTicketStatus',
    'currentTicket',
  ),
  [actions.CURRENT_TICKET + '_SUCCEEDED']: (state, action) => {
    state.currentTicket = action.payload.me.currentTicket;
    state.currentTicketStatus = 'SUCCEEDED';
  },
  ...reduceAction(
    actions.CANCEL_TICKET,
    'cancelTicketStatus',
    'canceledTicket',
    'cancelTicket',
  ),
  ...reduceSubscription(
    actions.SUBSCRIBE_TICKET,
    'ticketCallNotifier',
    'ticketCall',
  ),
  [actions.SUBSCRIBE_TICKET_CALL + '_RESULT']: (state, action) => {
    state.currentTicket.estimatedWaitingTime =
      action.payload.data.callTicket.estimatedWaitingTime;

    state.currentTicket.status = action.payload.data.callTicket.status;
  },
  ...reduceAction(
    actions.LATEST_TICKETS,
    'latestTicketsStatus',
    'latestTickets',
    'latestTickets',
  ),
});

export default ticketReducer;
