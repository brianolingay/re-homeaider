import gql from "graphql-tag";
import { errorInfoFragment } from "../../shared/fragments/ErrorInfo";

export const updateServiceMutation = gql`
  mutation UpdateService($serviceId: ObjectId!, $input: ServiceInput!) {
    updateService(serviceId: $serviceId, input: $input) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${errorInfoFragment}
`;
