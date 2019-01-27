import gql from "graphql-tag";

export const createRoleMutation = gql`
  mutation CreateRole($input: RoleInput!) {
    createRole(input: $input) {
      errors {
        path
        message
      }
    }
  }
`;
