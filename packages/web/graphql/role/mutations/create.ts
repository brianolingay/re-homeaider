import gql from "graphql-tag";
import { errorInfoFragment } from "../../shared/fragments/ErrorInfo";

export const createRoleMutation = gql`
  mutation CreateRole($input: RoleInput!) {
    createRole(input: $input) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${errorInfoFragment}
`;
