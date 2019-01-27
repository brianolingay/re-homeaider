import gql from "graphql-tag";

export const subscriptionInfoFragment = gql`
  fragment SubscriptionInfo on Subscription {
    _id
    name
    description
    amount
    benefits
    paymentMode
  }
`;
