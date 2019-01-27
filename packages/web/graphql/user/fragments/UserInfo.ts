import gql from "graphql-tag";

export const userInfoFragment = gql`
  fragment UserInfo on User {
    _id
    email
    role {
      _id
      name
    }
  }
`;
