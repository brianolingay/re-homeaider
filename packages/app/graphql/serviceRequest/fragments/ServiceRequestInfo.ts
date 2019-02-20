import gql from "graphql-tag";
import { serviceInfoFragment } from "../../service/fragments/ServiceInfo";
import { userBasicInfoFragment } from "../../user/fragments/UserBasicInfo";

export const serviceRequestInfoFragment = gql`
  fragment ServiceRequestInfo on ServiceRequest {
    _id
    serviceSeeker {
      ...UserBasicInfo
    }
    provider {
      ...UserBasicInfo
    }
    service {
      ...ServiceInfo
    }
    amount
    address
    coordinates
    accepted
    arrivedAt
    startedAt
    canceledAt
    completedAt
    ignoredAt
    feedBack
    rating
  }

  ${userBasicInfoFragment}
  ${serviceInfoFragment}
`;
