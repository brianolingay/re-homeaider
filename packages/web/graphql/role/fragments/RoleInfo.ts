import gql from "graphql-tag";

export const roleInfoFragment = gql`
  fragment RoleInfo on Role {
    _id
    name
    description
  }
`;
