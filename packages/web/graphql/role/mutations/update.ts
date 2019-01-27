import gql from "graphql-tag";

export const updateRoleMutation = gql`
  mutation UpdateRole($roleId: ObjectId!, $input: RoleInput!) {
    updateRole(roleId: $roleId, input: $input) {
      errors {
        path
        message
      }
    }
  }
`;
