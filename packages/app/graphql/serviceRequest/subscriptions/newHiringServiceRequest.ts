import gql from "graphql-tag";
import { serviceRequestInfoFragment } from "../fragments/ServiceRequestInfo";

export const newHiringServiceRequestSubscription = gql`
  subscription NewHiringServiceRequest($providerId: ObjectId!) {
    newHiringServiceRequest(providerId: $providerId) {
      ...ServiceRequestInfo
    }
  }

  ${serviceRequestInfoFragment}
`;
