import gql from "graphql-tag";

export const createServiceMutation = gql`
  mutation CreateService($categoryId: ObjectId!, $input: ServiceInput!) {
    createService(categoryId: $categoryId, input: $input) {
      errors {
        path
        message
      }
    }
  }
`;
