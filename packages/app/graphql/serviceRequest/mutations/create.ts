import gql from "graphql-tag";

export const createServiceRequestMutation = gql`
  mutation CreateServiceRequest($input: ServiceRequestInput!) {
    createServiceRequest(input: $input) {
      serviceRequestId
      errors {
        path
        message
      }
    }
  }
`;
