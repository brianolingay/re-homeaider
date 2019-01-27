import gql from "graphql-tag";
import { roleInfoFragment } from "../fragments/RoleInfo";

export const rolesQuery = gql`
  query Roles {
    roles {
      ...RoleInfo
    }
  }

  ${roleInfoFragment}
`;
