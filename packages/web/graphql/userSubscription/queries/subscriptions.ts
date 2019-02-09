import gql from "graphql-tag";
import { userSubscriptionInfoFragment } from "../fragments/UserSubscriptionInfo";

export const userSubscriptionsQuery = gql`
  query UserSubscriptions {
    userSubscriptions {
      ...UserSubscriptionInfo
    }
  }

  ${userSubscriptionInfoFragment}
`;
