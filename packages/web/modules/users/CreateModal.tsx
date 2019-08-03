import { validUserSchema } from "@homeaider/common";
import { ApolloQueryResult } from "apollo-boost";
import React from "react";
import {
  useCreateUserMutation,
  AllAdminExceptCurrentUserQuery,
} from "../../components/apollo-components";
import { UserFormModal, FormValues } from "./FormModal";

interface Props {
  showCreateModal: boolean;
  handleCreateModal: () => void;
  refetch: () => Promise<ApolloQueryResult<AllAdminExceptCurrentUserQuery>>;
  roles: any;
}

export const CreateModal = ({
  showCreateModal,
  handleCreateModal,
  refetch,
  roles,
}: Props) => {
  const createUser = useCreateUserMutation();
  return (
    <UserFormModal
      modalName="New User"
      submit={async ({ userId, role, ...input }: FormValues) => {
        return await createUser({
          variables: { role, input },
        });
      }}
      method="createUser"
      refetch={refetch}
      showModal={showCreateModal}
      handleModal={handleCreateModal}
      user={null}
      roles={roles}
      validationSchema={validUserSchema}
    />
  );
};
