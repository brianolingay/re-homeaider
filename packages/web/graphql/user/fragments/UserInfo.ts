import gql from "graphql-tag";
import { roleInfoFragment } from "../../role/fragments/RoleInfo";

export const userInfoFragment = gql`
  fragment UserInfo on User {
    _id
    email
    firstName
    lastName
    mobile
    role {
      ...RoleInfo
    }
  }

  ${roleInfoFragment}
`;
