import { userBasicInfoFragment } from "./../../user/fragments/UserInfo";
import gql from "graphql-tag";
import { serviceInfoFragment } from "../../service/fragments/ServiceInfo";
// import { userBasicInfoFragment } from "../..s/user/fragments/UserInfo";

export const providerServiceBasicInfoFragment = gql`
  fragment ProviderServiceBasicInfo on ProviderServiceWithService {
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

export const providerServiceInfoFragment = gql`
  fragment ProviderServiceInfo on ProviderServiceWithUser {
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
