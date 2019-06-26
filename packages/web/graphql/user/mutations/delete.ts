import gql from "graphql-tag";
import { errorInfoFragment } from "../../shared/fragments/ErrorInfo";

export const deleteUserMutation = gql`
  mutation DeleteUser($userId: ObjectId!) {
    deleteUser(userId: $userId) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${errorInfoFragment}
`;
