import gql from "graphql-tag";
import { userSubscriptionInfoFragment } from "./../../userSubscription/fragments/UserSubscriptionInfo";
import { roleInfoFragment } from "./../../role/fragments/RoleInfo";

export const userInfoFragment = gql`
  fragment UserInfo on User {
    _id
    email
    firstName
    lastName
    mobile
    phone
    address
    city
    country
    coordinates
    userSubscription {
      ...UserSubscriptionInfo
    }
    subscribedAt
    role {
      ...RoleInfo
    }
  }

  ${userSubscriptionInfoFragment}
  ${roleInfoFragment}
`;
