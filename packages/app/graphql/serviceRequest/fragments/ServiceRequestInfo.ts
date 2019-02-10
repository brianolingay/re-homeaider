import gql from "graphql-tag";
import { userInfoFragment } from "../../user/fragments/UserInfo";
import { serviceInfoFragment } from "../../service/fragments/ServiceInfo";

export const serviceRequestInfoFragment = gql`
  fragment ServiceRequestInfo on ServiceRequest {
    _id
    serviceSeeker {
      ...UserInfo
    }
    provider {
      ...UserInfo
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

  ${userInfoFragment}
  ${serviceInfoFragment}
`;
