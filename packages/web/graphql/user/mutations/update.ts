import gql from "graphql-tag";
import { errorInfoFragment } from "../../shared/fragments/ErrorInfo";

export const updateUserMutation = gql`
  mutation UpdateUser($userId: ObjectId!, $input: LoginInput!) {
    updateUser(userId: $userId, input: $input) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${errorInfoFragment}
`;
