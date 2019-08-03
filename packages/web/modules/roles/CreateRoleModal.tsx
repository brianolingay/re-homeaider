import { validRoleSchema } from "@homeaider/common";
import { ApolloQueryResult } from "apollo-boost";
import React from "react";
import {
  AllRolesQuery,
  useCreateRoleMutation,
} from "../../components/apollo-components";
import { RoleModal, RoleFormValues } from "./RoleModal";
import { getRoleKey } from "./helper";

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
      modalName="New Role"
      submit={async ({ roleId, ...input }: RoleFormValues) => {
        return await createRole({
          variables: { input: { ...input, key: getRoleKey(input.name) } },
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
