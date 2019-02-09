import gql from "graphql-tag";

export const categoryInfoFragment = gql`
  fragment CategoryInfo on Category {
    _id
    name
    totalServices
  }
`;
