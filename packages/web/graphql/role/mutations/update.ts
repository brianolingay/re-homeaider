import gql from "graphql-tag";
import { errorInfoFragment } from "../../shared/fragments/ErrorInfo";

export const updateRoleMutation = gql`
  mutation UpdateRole($roleId: ObjectId!, $input: LoginInput!) {
    updateRole(roleId: $roleId, input: $input) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${errorInfoFragment}
`;
