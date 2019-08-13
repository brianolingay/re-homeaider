import { validServiceSchema } from "@homeaider/common";
import { ApolloQueryResult } from "apollo-boost";
import React from "react";
import {
  CategoriesQuery,
  useCreateCategoryMutation,
} from "../../components/apollo-components";
import { FormValues, CategoryFormModal } from "./FormModal";

interface Props {
  showCreateModal: boolean;
  handleCreateModal: () => void;
  refetch: () => Promise<ApolloQueryResult<CategoriesQuery>>;
  services: any;
}

export const CreateModal = ({
  showCreateModal,
  handleCreateModal,
  refetch,
  services,
}: Props) => {
  const createCategory = useCreateCategoryMutation();

  return (
    <CategoryFormModal
      modalName="New Category"
      submit={async ({ categoryId, service, ...input }: FormValues) => {
        return await createCategory({
          variables: { service, input },
        });
      }}
      method="createCategory"
      refetch={refetch}
      showModal={showCreateModal}
      handleModal={handleCreateModal}
      category={null}
      services={services}
      validationSchema={validServiceSchema}
    />
  );
};
