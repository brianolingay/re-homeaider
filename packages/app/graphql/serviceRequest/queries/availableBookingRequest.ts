import gql from "graphql-tag";
import { serviceRequestInfoFragment } from "../fragments/ServiceRequestInfo";

export const availableBookingRequestQuery = gql`
  query AvailableBookingRequest($input: AvailableBookingInput!) {
    availableBookingRequest(input: $input) {
      ...ServiceRequestInfo
    }
  }

  ${serviceRequestInfoFragment}
`;
