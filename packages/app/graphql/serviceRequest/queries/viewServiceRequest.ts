import gql from "graphql-tag";
import { serviceRequestInfoFragment } from "../fragments/ServiceRequestInfo";

export const viewServiceRequestQuery = gql`
  query ViewServiceRequest($serviceRequestId: ObjectId!) {
    viewServiceRequest(serviceRequestId: $serviceRequestId) {
      ...ServiceRequestInfo
    }
  }

  ${serviceRequestInfoFragment}
`;
