import gql from "graphql-tag";

export const availableCategoryInfoFragment = gql`
  fragment AvailableCategoryInfo on AvailableCategorieResponse {
    _id
    name
    totalServices
  }
`;
