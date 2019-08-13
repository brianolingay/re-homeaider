import { validServiceSchema } from "@homeaider/common";
import { ApolloQueryResult } from "apollo-boost";
import React from "react";
import {
  CategoriesQuery,
  useUpdateCategoryMutation,
} from "../../components/apollo-components";
import { CategoryFormModal, FormValues } from "./FormModal";

interface Props {
  showEditModal: boolean;
  handleEditModal: (category: any) => void;
  refetch: () => Promise<ApolloQueryResult<CategoriesQuery>>;
  category: any;
  services: any;
}

export const EditModal = ({
  showEditModal,
  handleEditModal,
  refetch,
  category,
  services,
}: Props) => {
  const updateCategory = useUpdateCategoryMutation();
  return (
    <CategoryFormModal
      modalName="Edit Category"
      submit={async ({ categoryId, service, ...input }: FormValues) => {
        return await updateCategory({
          variables: { categoryId, service, input },
        });
      }}
      method="updateCategory"
      refetch={refetch}
      showModal={showEditModal}
      handleModal={handleEditModal}
      category={category}
      services={services}
      validationSchema={validServiceSchema}
    />
  );
};
