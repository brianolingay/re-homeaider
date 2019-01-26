import gql from "graphql-tag";

export const createCategoryMutation = gql`
  mutation CreateCategory($input: CategoryInput!) {
    createCategory(input: $input) {
      errors {
        path
        message
      }
    }
  }
`;
