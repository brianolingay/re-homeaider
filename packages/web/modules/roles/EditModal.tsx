import { validRoleSchema } from "@homeaider/common";
import { ApolloQueryResult } from "apollo-boost";
import React from "react";
import {
  AllRolesQuery,
  useUpdateRoleMutation,
} from "../../components/apollo-components";
import { RoleModal, RoleFormValues } from "./RoleModal";
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
  const udpateRole = useUpdateRoleMutation();
  return (
    <RoleModal
      modalName="Edit Role"
      submit={async ({ roleId, ...input }: RoleFormValues) => {
        return await udpateRole({
          variables: {
            roleId,
            input: { ...input, key: getRoleKey(input.name) },
          },
        });
      }}
      method="udpateRole"
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
