import gql from "graphql-tag";

export const deleteSubscriptionMutation = gql`
  mutation DeleteSubscription($subscriptionId: ObjectId!) {
    deleteSubscription(subscriptionId: $subscriptionId) {
      errors {
        path
        message
      }
    }
  }
`;
