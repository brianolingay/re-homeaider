import gql from "graphql-tag";
import { availableCategoryInfoFragment } from "../fragments/AvailableCategoryInfo";

export const availableCategoriesQuery = gql`
  query AvailableCategories {
    availableCategories {
      ...AvailableCategoryInfo
    }
  }

  ${availableCategoryInfoFragment}
`;
