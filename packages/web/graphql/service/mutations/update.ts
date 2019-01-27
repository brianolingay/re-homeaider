import gql from "graphql-tag";

export const updateServiceMutation = gql`
  mutation UpdateService(
    $categoryId: ObjectId!
    $serviceId: ObjectId!
    $input: ServiceInput!
  ) {
    updateService(
      categoryId: $categoryId
      serviceId: $serviceId
      input: $input
    ) {
      errors {
        path
        message
      }
    }
  }
`;
