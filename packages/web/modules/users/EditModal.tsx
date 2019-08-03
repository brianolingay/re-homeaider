import { validUpdateUserSchema } from "@homeaider/common";
import { ApolloQueryResult } from "apollo-boost";
import React from "react";
import {
  useUpdateUserMutation,
  AllAdminExceptCurrentUserQuery,
} from "../../components/apollo-components";
import { UserFormModal, FormValues } from "./FormModal";

interface Props {
  showEditModal: boolean;
  handleEditModal: (role: any) => void;
  refetch: () => Promise<ApolloQueryResult<AllAdminExceptCurrentUserQuery>>;
  user: any;
  roles: any;
}

export const EditModal = ({
  showEditModal,
  handleEditModal,
  refetch,
  user,
  roles,
}: Props) => {
  const updateUser = useUpdateUserMutation();
  return (
    <UserFormModal
      modalName="Edit User"
      submit={async ({ userId, role, ...input }: FormValues) => {
        return await updateUser({
          variables: { userId, role, input },
        });
      }}
      method="updateUser"
      refetch={refetch}
      showModal={showEditModal}
      handleModal={handleEditModal}
      user={user}
      roles={roles}
      validationSchema={validUpdateUserSchema}
    />
  );
};
