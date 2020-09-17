export const CURRENT_TICKET = `
query {
  me {
    currentTicket {
      id
      isFastpass
      calledCount
      ticketNumber
      insertedAt
      status
      estimatedWaitingTime
      booking {
        minimumArrivalTime
        maximumArrivalTime
        checkIn
      }
      service {
        name
        branch {
          id
          name
          latitude
          longitude
          neighborhood
          company {
            name
            type
          }
        }
      }
    }
  }
}
`;

export const CANCEL_TICKET = `
mutation ($ticketId: String!) {
  cancelTicket(ticketId: $ticketId) {
    id
    status
  }
}
`;

export const SUBSCRIBE_TICKET_CALL = `
    subscription ($ticketId: String!)  {
      callTicket (ticketId: $ticketId) {
        id
        estimatedWaitingTime
        status
        ticketNumber
        service {
          branch {
            id
          }
        }
      }
    }
`;

export const CHECK_IN = `
    mutation ($ticketId: String!)  {
      checkInBooking(ticketId: $ticketId) {
        id
      }
    }
`;

export const LATEST_TICKETS = `
query ($branchId: String!) {
  latestTickets(branchId:$branchId) {
    ticketNumber
  }
}
`;
