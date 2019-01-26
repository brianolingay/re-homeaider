import gql from "graphql-tag";

export const deleteCategoryMutation = gql`
  mutation DeleteCategory($categoryId: ObjectId!) {
    deleteCategory(categoryId: $categoryId) {
      errors {
        path
        message
      }
    }
  }
`;
