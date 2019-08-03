import { validRoleSchema } from "@homeaider/common";
import { ApolloQueryResult } from "apollo-boost";
import React from "react";
import {
  AllRolesQuery,
  useUpdateRoleMutation,
} from "../../components/apollo-components";
import { RoleFormModal, RoleFormValues } from "./RoleModal";
import { getRoleKey } from "./helper";

interface Props {
  showEditRoleModal: boolean;
  handleEditRoleModal: (role: any) => void;
  refetch: () => Promise<ApolloQueryResult<AllRolesQuery>>;
  role: any;
}

export const EditModal = ({
  showEditRoleModal,
  handleEditRoleModal,
  refetch,
  role,
}: Props) => {
  const updateRole = useUpdateRoleMutation();
  return (
    <RoleFormModal
      modalName="Edit Role"
      submit={async ({ roleId, ...input }: RoleFormValues) => {
        return await updateRole({
          variables: {
            roleId,
            input: { ...input, key: getRoleKey(input.name) },
          },
        });
      }}
      method="updateRole"
      refetch={refetch}
      showModal={showEditRoleModal}
      handleRoleModal={handleEditRoleModal}
      role={{
        roleId: role._id,
        name: role.name,
        description: role.description,
      }}
      validationSchema={validRoleSchema}
    />
  );
};
