export const LOGIN_USER = `
mutation ($email: String!, $password: String!){
  loginUser(input: {
    email: $email
    password: $password
  }) {
    token
    user {
      id
      firstName
      lastName
      current_ticket {
        id
      }
    }
  }
}
`;
