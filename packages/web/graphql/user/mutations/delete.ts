import gql from "graphql-tag";

export const deleteUserMutation = gql`
  mutation DeleteUser($userId: ObjectId!) {
    deleteUser(userId: $userId) {
      errors {
        path
        message
      }
    }
  }
`;
