import gql from "graphql-tag";
import { userInfoFragment } from "../../user/fragments/UserInfo";

export const meQuery = gql`
  query Me {
    me {
      ...UserInfo
    }
  }

  ${userInfoFragment}
`;
