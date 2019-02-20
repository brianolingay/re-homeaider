import gql from "graphql-tag";
import { serviceInfoFragment } from "../../service/fragments/ServiceInfo";
import { userBasicInfoFragment } from "./../../user/fragments/UserBasicInfo";

export const providerServiceInfoFragment = gql`
  fragment ProviderServiceInfo on ProviderService {
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
    user {
      ...UserBasicInfo
    }
  }

  ${userBasicInfoFragment}
  ${serviceInfoFragment}
`;
