export const LIST_WORKING_SERVICES = `
query ($branchId: String!){
  workingServices(branchId: $branchId) {
    id
    name
    serviceLetter
  }
}
`;

export const GET_BRANCH_DETAILS = `
  query ($branchId: String!) {
    branch(branchId: $branchId) {
      id
      latitude
      longitude
      name
      company {
        type
        name
      }
      services {
        id
        name
        nextFastPassPeriod {
          minimumArrivalTime
          maximumArrivalTime
        }
        waitingTime
      }
    }
  }  
`;

export const CREATE_TICKET = `
  mutation ($serviceId: String!) {
    createTicket(input:{
      bookingFrom:APP,
      priority: false,
      serviceId: $serviceId
    }) {
      id
      insertedAt
      bookingFrom
      service {
        name
      }
    }
  }
`;

export const CREATE_BOOKING = `
  mutation ($serviceId: String!) {
    createBooking(input:{
      bookingFrom:APP,
      priority: false,
      serviceId: $serviceId
    }) {
      id
      insertedAt
      bookingFrom
      service {
        name
      }
    }
  }
`;

export const SUBSCRIBE_TICKET = `

    subscription ($branchId: String!)  {
      newTicket (branchId: $branchId) {
        id
        service {
          id
          name
          nextFastPassPeriod {
            minimumArrivalTime
            maximumArrivalTime
          }
        }
      }
    }
    
`;
