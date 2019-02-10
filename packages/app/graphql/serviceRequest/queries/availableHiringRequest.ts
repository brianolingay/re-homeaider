import gql from "graphql-tag";
import { serviceRequestInfoFragment } from "../fragments/ServiceRequestInfo";

export const availableHiringRequestQuery = gql`
  query AvailableHiringRequest {
    availableHiringRequest {
      ...ServiceRequestInfo
    }
  }

  ${serviceRequestInfoFragment}
`;
