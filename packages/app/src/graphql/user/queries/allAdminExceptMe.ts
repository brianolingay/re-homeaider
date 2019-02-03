import gql from "graphql-tag";
import { userInfoFragment } from "../fragments/UserInfo";

export const allAdminExceptMeQuery = gql`
  query AllAdminExceptMe {
    allAdminExceptMe {
      ...UserInfo
    }
  }

  ${userInfoFragment}
`;
