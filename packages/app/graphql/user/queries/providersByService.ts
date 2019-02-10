import gql from "graphql-tag";
import { userInfoFragment } from "../fragments/UserInfo";

export const providersByServiceQuery = gql`
  query ProvidersByService($serviceId: ObjectId!) {
    providersByService(serviceId: $serviceId) {
      ...UserInfo
    }
  }

  ${userInfoFragment}
`;
