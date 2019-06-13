import gql from "graphql-tag";

export const errorInfoFragment = gql`
  fragment ErrorInfo on ErrorResponse {
    path
    message
  }
`;
