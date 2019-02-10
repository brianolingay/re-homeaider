import gql from "graphql-tag";
import { serviceRequestInfoFragment } from "../fragments/ServiceRequestInfo";

export const newBookingServiceRequestSubscription = gql`
  subscription NewBookingServiceRequest($serviceIds: [ObjectId!]!) {
    newBookingServiceRequest(serviceIds: $serviceIds) {
      ...ServiceRequestInfo
    }
  }

  ${serviceRequestInfoFragment}
`;
