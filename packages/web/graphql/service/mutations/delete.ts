import gql from "graphql-tag";
import { errorInfoFragment } from "../../shared/fragments/ErrorInfo";

export const deleteServiceMutation = gql`
  mutation DeleteService($serviceId: ObjectId!) {
    deleteService(serviceId: $serviceId) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${errorInfoFragment}
`;
