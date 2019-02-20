import gql from "graphql-tag";
import { providerServiceBasicInfoFragment } from "../../providerService/fragments/ProviderServiceBasicInfo";
import { roleInfoFragment } from "../../role/fragments/RoleInfo";
import { serviceInfoFragment } from "../../service/fragments/ServiceInfo";
import { userSubscriptionInfoFragment } from "../../userSubscription/fragments/UserSubscriptionInfo";

export const userInfoFragment = gql`
  fragment UserInfo on User {
    _id
    email
    firstName
    lastName
    mobile
    phone
    address
    city
    country
    coordinates
    userSubscription {
      ...UserSubscriptionInfo
    }
    subscribedAt
    providerServices {
      ...ProviderServiceBasicInfo
      service {
        ...ServiceInfo
      }
    }
    role {
      ...RoleInfo
    }
  }

  ${userSubscriptionInfoFragment}
  ${providerServiceBasicInfoFragment}
  ${serviceInfoFragment}
  ${roleInfoFragment}
`;
