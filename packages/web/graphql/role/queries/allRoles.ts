import gql from "graphql-tag";
import { roleInfoFragment } from "../fragments/RoleInfo";

export const allRolesQuery = gql`
  query allRoles {
    roles {
      ...RoleInfo
    }
  }

  ${roleInfoFragment}
`;
