import gql from "graphql-tag";
import { errorInfoFragment } from "../../shared/fragments/ErrorInfo";
import { userInfoFragment } from "graphql/user/fragments/UserInfo";

export const loginMutation = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        ...UserInfo
      }
      errors {
        ...ErrorInfo
      }
    }
  }

  ${userInfoFragment}
  ${errorInfoFragment}
`;
