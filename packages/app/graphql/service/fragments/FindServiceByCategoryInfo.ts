import gql from "graphql-tag";

export const findServicesByCategoryInfoFragment = gql`
  fragment FindServicesByCategoryInfo on FindServicesByCategoryResponse {
    _id
    name
    totalUsers
  }
`;
