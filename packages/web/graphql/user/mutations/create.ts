import gql from "graphql-tag";

export const createUserMutation = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      errors {
        path
        message
      }
    }
  }
`;
