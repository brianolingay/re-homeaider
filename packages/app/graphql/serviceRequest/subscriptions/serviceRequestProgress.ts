import gql from "graphql-tag";
import { serviceRequestInfoFragment } from "../fragments/ServiceRequestInfo";

export const serviceRequestProgressSubscription = gql`
  subscription ServiceRequestProgress($serviceRequestId: ObjectId!) {
    serviceRequestProgress(serviceRequestId: $serviceRequestId) {
      ...ServiceRequestInfo
    }
  }

  ${serviceRequestInfoFragment}
`;
