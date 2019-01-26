import gql from "graphql-tag";
import { categoryInfoFragment } from "./../fragments/CategoryInfo";

export const categoriesQuery = gql`
  query Categories {
    categories {
      ...CategoryInfo
    }
  }

  ${categoryInfoFragment}
`;
