import gql from "graphql-tag";

export const userSubscriptionInfoFragment = gql`
  fragment UserSubscriptionInfo on UserSubscription {
    _id
    name
    description
    amount
    benefits
    paymentMode
  }
`;
