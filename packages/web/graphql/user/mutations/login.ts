import { LoginMutation } from "./../../../components/apollo-components";
import gql from "graphql-tag";
import { errorInfoFragment } from "../../shared/fragments/ErrorInfo";
import { userInfoFragment } from "./../fragments/UserInfo";

export const loginMutation = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      errors {
        ...ErrorInfo
      }
      user {
        ...UserInfo
      }
    }
  }

  ${errorInfoFragment}
  ${userInfoFragment}
`;
