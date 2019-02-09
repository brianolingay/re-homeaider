import gql from "graphql-tag";

export const updateUserSubscriptionMutation = gql`
  mutation UpdateUserSubscription(
    $userSubscriptionId: ObjectId!
    $input: UserSubscriptionInput!
  ) {
    updateUserSubscription(
      userSubscriptionId: $userSubscriptionId
      input: $input
    ) {
      errors {
        path
        message
      }
    }
  }
`;
