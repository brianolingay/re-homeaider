import gql from "graphql-tag";
import { locationInfoFragment } from "./../fragments/LocationInfo";

export const currentLocationQuery = gql`
  query CurrentLocation {
    currentLocation {
      ...LocationInfo
    }
  }

  ${locationInfoFragment}
`;
