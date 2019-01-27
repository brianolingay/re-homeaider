import gql from "graphql-tag";

export const updateSubscriptionMutation = gql`
  mutation UpdateSubscription(
    $subscriptionId: ObjectId!
    $input: SubscriptionInput!
  ) {
    updateSubscription(subscriptionId: $subscriptionId, input: $input) {
      errors {
        path
        message
      }
    }
  }
`;
