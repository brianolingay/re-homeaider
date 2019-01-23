import gql from "graphql-tag";
import { errorInfoFragment } from "../../shared/fragments/ErrorInfo";

export const loginMutation = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      errors {
        ...ErrorInfo
      }
    }
  }

  ${errorInfoFragment}
`;
