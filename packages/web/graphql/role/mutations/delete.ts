import gql from "graphql-tag";

export const deleteRoleMutation = gql`
  mutation DeleteRole($roleId: ObjectId!) {
    deleteRole(roleId: $roleId) {
      errors {
        path
        message
      }
    }
  }
`;
