import gql from "graphql-tag";
import { errorInfoFragment } from "../../shared/fragments/ErrorInfo";

export const updateUserMutation = gql`
  mutation UpdateUser(
    $userId: ObjectId!
    $role: ObjectId!
    $input: UserInput!
  ) {
    updateUser(userId: $userId, role: $role, input: $input) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${errorInfoFragment}
`;
