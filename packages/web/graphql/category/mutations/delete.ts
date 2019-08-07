import gql from "graphql-tag";
import { errorInfoFragment } from "../../shared/fragments/ErrorInfo";

export const deleteCategoryMutation = gql`
  mutation DeleteCategory($categoryId: ObjectId!) {
    deleteCategory(categoryId: $categoryId) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${errorInfoFragment}
`;
