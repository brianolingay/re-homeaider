import gql from "graphql-tag";
import { errorInfoFragment } from "../../shared/fragments/ErrorInfo";

export const deleteRoleMutation = gql`
  mutation DeleteRole($roleId: ObjectId!) {
    deleteRole(roleId: $roleId) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${errorInfoFragment}
`;
