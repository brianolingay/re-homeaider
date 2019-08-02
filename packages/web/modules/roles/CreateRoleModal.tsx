import { validRoleSchema } from "@homeaider/common";
import { ApolloQueryResult } from "apollo-boost";
import React from "react";
import {
  AllRolesQuery,
  useCreateRoleMutation,
} from "../../components/apollo-components";
import { RoleModal, RoleFormValues } from "./RoleModal";

interface Props {
  showCreateRoleModal: boolean;
  handleCreateRoleModal: () => void;
  refetch: () => Promise<ApolloQueryResult<AllRolesQuery>>;
}

export const CreateRoleModal = ({
  showCreateRoleModal,
  handleCreateRoleModal,
  refetch,
}: Props) => {
  const createRole = useCreateRoleMutation();
  return (
    <RoleModal
      submit={async ({ roleId, ...input }: RoleFormValues) => {
        // make key of the role name.
        let roleKey = input.name.toLowerCase();
        const arrRoleKeyVal = roleKey.match(/\S+/g);

        if (arrRoleKeyVal && arrRoleKeyVal.length > 1) {
          roleKey = arrRoleKeyVal.join("_");
        }

        return await createRole({
          variables: { input: { ...input, key: roleKey } },
        });
      }}
      method="createRole"
      refetch={refetch}
      showModal={showCreateRoleModal}
      handleRoleModal={handleCreateRoleModal}
      role={null}
      validationSchema={validRoleSchema}
    />
  );
};
