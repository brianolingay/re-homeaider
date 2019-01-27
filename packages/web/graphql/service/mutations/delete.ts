import gql from "graphql-tag";

export const deleteServiceMutation = gql`
  mutation DeleteService($categoryId: ObjectId!, $serviceId: ObjectId!) {
    deleteService(categoryId: $categoryId, serviceId: $serviceId) {
      errors {
        path
        message
      }
    }
  }
`;
