import gql from "graphql-tag";
import { errorInfoFragment } from "../../shared/fragments/ErrorInfo";

export const createCategoryMutation = gql`
  mutation CreateCategory($service: ObjectId!, $input: CategoryInput!) {
    createCategory(service: $service, input: $input) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${errorInfoFragment}
`;
