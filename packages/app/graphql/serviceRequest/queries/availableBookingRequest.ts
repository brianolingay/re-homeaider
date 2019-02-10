import gql from "graphql-tag";
import { serviceRequestInfoFragment } from "../fragments/ServiceRequestInfo";

export const availableBookingRequestQuery = gql`
  query AvailableBookingRequest {
    availableBookingRequest {
      ...ServiceRequestInfo
    }
  }

  ${serviceRequestInfoFragment}
`;
