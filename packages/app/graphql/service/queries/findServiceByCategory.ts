import gql from "graphql-tag";
import { findServicesByCategoryInfoFragment } from "../fragments/FindServiceByCategoryInfo";

export const findServicesByCategoryQuery = gql`
  query FindServicesByCategory($categoryId: ObjectId!) {
    findServicesByCategory(categoryId: $categoryId) {
      ...FindServicesByCategoryInfo
    }
  }

  ${findServicesByCategoryInfoFragment}
`;
