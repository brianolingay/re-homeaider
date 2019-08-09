import gql from "graphql-tag";
import { categoryInfoFragment } from "../fragments/CategoryInfo";

export const categoriesByServiceIdQuery = gql`
  query CategoriesByServiceId($serviceId: ObjectId!) {
    categoriesByServiceId(serviceId: $serviceId) {
      ...CategoryInfo
    }
  }

  ${categoryInfoFragment}
`;
