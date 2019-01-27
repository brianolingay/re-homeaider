import gql from "graphql-tag";
import { subscriptionInfoFragment } from "../fragments/SubscriptionInfo";

export const subscriptionsQuery = gql`
  query Subscriptions {
    subscriptions {
      ...SubscriptionInfo
    }
  }

  ${subscriptionInfoFragment}
`;
