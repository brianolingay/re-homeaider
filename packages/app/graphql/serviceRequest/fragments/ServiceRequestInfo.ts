import gql from "graphql-tag";
import { userInfoFragment } from "../../user/fragments/UserInfo";
import { serviceInfoFragment } from "../../service/fragments/ServiceInfo";

export const serviceRequestInfoFragment = gql`
  fragment ServiceRequestInfo on ServiceRequest {
    _id
    serviceSeeker {
      _id
      email
      firstName
      lastName
      mobile
      phone
      address
      city
      country
    }
    provider {
      _id
      email
      firstName
      lastName
      mobile
      phone
      address
      city
      country
    }
    service {
      _id
      name
      category {
        _id
        name
      }
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
