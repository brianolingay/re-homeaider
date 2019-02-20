import gql from "graphql-tag";
import { serviceRequestInfoFragment } from "../fragments/ServiceRequestInfo";

export const newBookingServiceRequestSubscription = gql`
  subscription NewBookingServiceRequest($input: AvailableBookingInput!) {
    newBookingServiceRequest(input: $input) {
      ...ServiceRequestInfo
    }
  }

  ${serviceRequestInfoFragment}
`;
