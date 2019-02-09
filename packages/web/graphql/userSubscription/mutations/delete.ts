import gql from "graphql-tag";

export const deleteUserSubscriptionMutation = gql`
  mutation DeleteUserSubscription($userSubscriptionId: ObjectId!) {
    deleteUserSubscription(userSubscriptionId: $userSubscriptionId) {
      errors {
        path
        message
      }
    }
  }
`;
