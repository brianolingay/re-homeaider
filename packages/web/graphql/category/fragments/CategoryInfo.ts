import gql from "graphql-tag";
import { serviceInfoFragment } from "../../service/fragments/ServiceInfo";

export const categoryInfoFragment = gql`
  fragment CategoryInfo on Category {
    _id
    name
    description
    statement
    details
    service {
      ...ServiceInfo
    }
  }

  ${serviceInfoFragment}
`;
