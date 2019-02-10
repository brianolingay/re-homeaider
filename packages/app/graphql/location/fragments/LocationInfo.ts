import gql from "graphql-tag";

export const locationInfoFragment = gql`
  fragment LocationInfo on LocationResponse {
    coordinates
  }
`;
