import gql from "graphql-tag";
import { categoryInfoFragment } from "./../../category/fragments/CategoryInfo";

export const serviceInfoFragment = gql`
  fragment ServiceInfo on Service {
    _id
    name
    description
    category {
      ...CategoryInfo
    }
  }

  ${categoryInfoFragment}
`;
