import gql from "graphql-tag";

export const createSubscriptionMutation = gql`
  mutation CreateSubscription($input: SubscriptionInput!) {
    createSubscription(input: $input) {
      errors {
        path
        message
      }
    }
  }
`;
