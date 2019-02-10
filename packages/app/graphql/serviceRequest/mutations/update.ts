import gql from "graphql-tag";

export const updateServiceRequestMutation = gql`
  mutation UpdateServiceRequest(
    $serviceRequestId: ObjectId!
    $input: ServiceRequestInput!
  ) {
    updateServiceRequest(serviceRequestId: $serviceRequestId, input: $input) {
      errors {
        path
        message
      }
    }
  }
`;
