import gql from "graphql-tag";
import { serviceInfoFragment } from "../../service/fragments/ServiceInfo";

export const providerServiceBasicInfoFragment = gql`
  fragment ProviderServiceBasicInfo on ProviderService {
    _id
    description
    certificates {
      name
      description
      certifiedAt
      images {
        filepath
        filename
      }
    }
    approved
    service {
      ...ServiceInfo
    }
  }

  ${serviceInfoFragment}
`;
