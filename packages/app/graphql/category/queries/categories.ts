import gql from "graphql-tag";
import { categoryInfoFragment } from "./../fragments/CategoryInfo";

export const availableCategoriesQuery = gql`
  query AvailableCategories {
    availableCategories {
      ...CategoryInfo
    }
  }

  ${categoryInfoFragment}
`;
