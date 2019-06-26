import gql from "graphql-tag";
import { errorInfoFragment } from "../../shared/fragments/ErrorInfo";

export const createUserMutation = gql`
  mutation CreateUser($role: String!, $input: LoginInput!) {
    createUser(role: $role, input: $input) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${errorInfoFragment}
`;
