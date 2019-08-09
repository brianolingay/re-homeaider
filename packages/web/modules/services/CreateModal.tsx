import { validServiceSchema } from "@homeaider/common";
import { ApolloQueryResult } from "apollo-boost";
import React from "react";
import {
  ServicesQuery,
  useCreateServiceMutation,
} from "../../components/apollo-components";
import { FormValues, ServiceFormModal } from "./FormModal";

interface Props {
  showCreateModal: boolean;
  handleCreateModal: () => void;
  refetch: () => Promise<ApolloQueryResult<ServicesQuery>>;
}

export const CreateModal = ({
  showCreateModal,
  handleCreateModal,
  refetch,
}: Props) => {
  const createService = useCreateServiceMutation();

  return (
    <ServiceFormModal
      modalName="New Service"
      submit={async ({ serviceId, ...input }: FormValues) => {
        return await createService({
          variables: { input },
        });
      }}
      method="createService"
      refetch={refetch}
      showModal={showCreateModal}
      handleModal={handleCreateModal}
      service={null}
      validationSchema={validServiceSchema}
    />
  );
};
