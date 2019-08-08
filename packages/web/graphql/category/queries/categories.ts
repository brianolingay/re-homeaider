import gql from "graphql-tag";
import { categoryInfoFragment } from "../fragments/CategoryInfo";

export const categoriesQuery = gql`
  query Categories($serviceId: ObjectId!) {
    categories(serviceId: $serviceId) {
      ...CategoryInfo
    }
  }

  ${categoryInfoFragment}
`;
