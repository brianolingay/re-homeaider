import gql from "graphql-tag";
import { providerServiceInfoFragment } from "../fragments/ProviderServiceCompleteInfo";

export const providersByServiceQuery = gql`
  query ProvidersByService($serviceId: ObjectId!) {
    providersByService(serviceId: $serviceId) {
      ...ProviderServiceInfo
    }
  }

  ${providerServiceInfoFragment}
`;
