import gql from "graphql-tag";
import { errorInfoFragment } from "../../shared/fragments/ErrorInfo";

export const updateCategoryMutation = gql`
  mutation UpdateCategory(
    $service: ObjectId!
    $categoryId: ObjectId!
    $input: CategoryInput!
  ) {
    updateCategory(service: $service, categoryId: $categoryId, input: $input) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${errorInfoFragment}
`;
