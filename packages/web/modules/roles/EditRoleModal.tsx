import { validRoleSchema } from "@homeaider/common";
import { ApolloQueryResult } from "apollo-boost";
import React from "react";
import {
  AllRolesQuery,
  useUpdateRoleMutation,
  RoleInfoFragment,
} from "../../components/apollo-components";
import { RoleModal, RoleFormValues } from "./RoleModal";

interface Props {
  showEditRoleModal: boolean;
  handleEditRoleModal: () => void;
  refetch: () => Promise<ApolloQueryResult<AllRolesQuery>>;
  role: RoleInfoFragment;
}

export const CreateRoleModal = ({
  showEditRoleModal,
  handleEditRoleModal,
  refetch,
  role,
}: Props) => {
  const udpateRole = useUpdateRoleMutation;
  return (
    <RoleModal
      submit={async ({ roleId, ...input }: RoleFormValues) => {
        // make key of the role name.
        let roleKey = input.name.toLowerCase();
        const arrRoleKeyVal = roleKey.match(/\S+/g);

        if (arrRoleKeyVal && arrRoleKeyVal.length > 1) {
          roleKey = arrRoleKeyVal.join("_");
        }

        return await udpateRole({
          variables: { roleId, input: { ...input, key: roleKey } },
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
