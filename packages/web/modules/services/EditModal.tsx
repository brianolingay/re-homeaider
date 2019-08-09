import { validServiceSchema } from "@homeaider/common";
import { ApolloQueryResult } from "apollo-boost";
import React from "react";
import {
  ServicesQuery,
  useUpdateServiceMutation,
} from "../../components/apollo-components";
import { FormValues, ServiceFormModal } from "./FormModal";

interface Props {
  showEditModal: boolean;
  handleEditModal: (serivce: any) => void;
  refetch: () => Promise<ApolloQueryResult<ServicesQuery>>;
  service: any;
}

export const EditModal = ({
  showEditModal,
  handleEditModal,
  refetch,
  service,
}: Props) => {
  const updateService = useUpdateServiceMutation();
  return (
    <ServiceFormModal
      modalName="Edit Service"
      submit={async ({ serviceId, ...input }: FormValues) => {
        return await updateService({
          variables: { serviceId, input },
        });
      }}
      method="updateService"
      refetch={refetch}
      showModal={showEditModal}
      handleModal={handleEditModal}
      service={service}
      validationSchema={validServiceSchema}
    />
  );
};
