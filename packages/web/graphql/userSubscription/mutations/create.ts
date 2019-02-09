import gql from "graphql-tag";

export const createUserSubscriptionMutation = gql`
  mutation CreateUserSubscription($input: UserSubscriptionInput!) {
    createUserSubscription(input: $input) {
      errors {
        path
        message
      }
    }
  }
`;
