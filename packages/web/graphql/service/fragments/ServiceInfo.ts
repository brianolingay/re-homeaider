import gql from "graphql-tag";

export const serviceInfoFragment = gql`
  fragment ServiceInfo on Service {
    _id
    name
    description
  }
`;
