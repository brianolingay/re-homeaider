import gql from "graphql-tag";
export const userBasicInfoFragment = gql`
  fragment UserBasicInfo on User {
    _id
    email
    firstName
    lastName
    mobile
    phone
    address
    city
    country
    coordinates
  }
`;
