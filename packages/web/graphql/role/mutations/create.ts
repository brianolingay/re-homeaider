import gql from "graphql-tag";
import { errorInfoFragment } from "../../shared/fragments/ErrorInfo";

export const createRoleMutation = gql`
  mutation CreateRole($input: LoginInput!) {
    createRole(input: $input) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${errorInfoFragment}
`;
