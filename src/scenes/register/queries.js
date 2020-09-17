export const REGISTER_USER = `
mutation ($email: String!, $password: String!, $firstName: String!, $lastName: String!, $cpf: String!, $phoneNumber: String!){
  registerUser(input: {
    email: $email
    password: $password
    firstName: $firstName
    lastName: $lastName,
    phoneNumber: $phoneNumber,
    cpf: $cpf
  }) {
    id
  }
}
`;
