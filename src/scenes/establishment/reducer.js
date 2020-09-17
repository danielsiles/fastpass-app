import {createReducer} from '@reduxjs/toolkit';
import actions from './actions';
import {reduceAction, reduceSubscription} from '_utils/reducerUtil';

const initState = {};

const establishmentReducer = createReducer(initState, {
  [actions.SUBSCRIBE_TICKET + '_RESULT']: (state, action) => {
    let services = state.branch.services;
    for (let i = 0; i < services.length; i++) {
      if (services[i].id === action.payload.data.newTicket.service.id) {
        services[i].nextFastPassPeriod =
          action.payload.data.newTicket.service.nextFastPassPeriod;
        break;
      }
    }
    state.branch.services = services;
    return state;
  },
  ...reduceAction(
    actions.LIST_WORKING_SERVICES,
    'listWorkingServicesStatus',
    'workingServices',
    'workingServices',
  ),
  ...reduceAction(
    actions.CREATE_TICKET,
    'createTicketStatus',
    'currentTicket',
    'createTicket',
  ),
  ...reduceAction(
    actions.GET_BRANCH_DETAILS,
    'branchStatus',
    'branch',
    'branch',
  ),
  ...reduceSubscription(actions.SUBSCRIBE_TICKET, 'ticketNotifier', 'ticket'),
});

export default establishmentReducer;
