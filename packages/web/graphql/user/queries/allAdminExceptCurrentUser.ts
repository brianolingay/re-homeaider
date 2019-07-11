import gql from "graphql-tag";
import { userInfoFragment } from "../fragments/UserInfo";

export const allAdminExceptCurrentUserQuery = gql`
  query AllAdminExceptCurrentUser {
    allAdminExceptCurrentUser {
      ...UserInfo
    }
  }

  ${userInfoFragment}
`;
