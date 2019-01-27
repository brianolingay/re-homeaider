import gql from "graphql-tag";
import { serviceInfoFragment } from "../fragments/ServiceInfo";

export const servicesQuery = gql`
  query Services {
    services {
      ...ServiceInfo
    }
  }

  ${serviceInfoFragment}
`;
