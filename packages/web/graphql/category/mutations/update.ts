import gql from "graphql-tag";

export const updateCategoryMutation = gql`
  mutation UpdateCategory($categoryId: ObjectId!, $input: CategoryInput!) {
    updateCategory(categoryId: $categoryId, input: $input) {
      errors {
        path
        message
      }
    }
  }
`;
