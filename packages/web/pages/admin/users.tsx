import { Button, Divider, Table, Modal, message } from "antd";
import React, { useState } from "react";
import {
  useAllRolesQuery,
  useAllAdminExceptCurrentUserQuery,
  useDeleteUserMutation,
  UserInfoFragment,
} from "../../components/apollo-components";
import MyLayout from "../../components/MyLayout";
import { CreateModal } from "../../modules/users/CreateModal";
import { EditModal } from "../../modules/users/EditModal";

const { confirm } = Modal;

const initialState = {
  showCreateModal: false,
  showEditModal: false,
  user: null,
};

function Users() {
  const { data, loading, refetch } = useAllAdminExceptCurrentUserQuery();

  const { data: rolesData } = useAllRolesQuery();

  const deleteUser = useDeleteUserMutation();

  const [state, setstate] = useState(initialState);

  const handleCreateUserModal = () => {
    const newState = { ...state, showCreateModal: !state.showCreateModal };
    setstate(newState);
  };

  const handleEditUserModal = (user: any) => {
    const newState = { ...state, showEditModal: !state.showEditModal, user };
    setstate(newState);
  };

  const handleDeleteComfirmation = (callback: any) => {
    confirm({
      title: "Delete Confirmation",
      content: "Are you sure delete this User?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        const response = await callback();

        if (
          response &&
          response.data &&
          response.data.deleteUser &&
          !response.data.deleteUser.length
        ) {
          message.success("Deleted Successfully");
          await refetch();
          Modal.destroyAll();
        } else {
          message.error(response.data.errors[0].message);
        }
      },
      onCancel() {
        console.log("NO!");
      },
    });
  };

  let roles: any = [];

  if (rolesData && rolesData.roles) {
    roles = rolesData.roles.map(item => ({
      key: item._id,
      value: item.name,
      text: item.name,
    }));
  }

  const columns = [
    {
      title: "Fullname",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_: any, record: UserInfoFragment) => `${record.role!.name}`,
    },
    {
      title: "Action",
      key: "action",
      render: (
        _text: string,
        { __typename, _id, role, fullName, key, ...record }: UserInfoFragment
      ) => (
        <span>
          <Button
            type="primary"
            onClick={() =>
              handleEditUserModal({
                ...record,
                userId: _id,
                role: role._id,
                password: "",
              })
            }
          >
            Edit
          </Button>
          <Divider type="vertical" />
          <Button
            type="primary"
            onClick={() =>
              handleDeleteComfirmation(async () => {
                return await deleteUser({
                  variables: { userId: _id },
                });
              })
            }
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  let newData: any = [];

  if (data && data.allAdminExceptCurrentUser) {
    newData = data.allAdminExceptCurrentUser.map(item => ({
      ...item,
      key: item._id,
      fullName: `${item.firstName} ${item.lastName}`,
    }));
  }

  return (
    <MyLayout
      title="Roles"
      containerStyle={{
        padding: "24px",
        flex: 1,
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="primary" onClick={handleCreateUserModal}>
          Add User
        </Button>
      </div>
      <Table columns={columns} dataSource={newData} loading={loading} />
      <CreateModal
        showCreateModal={state.showCreateModal}
        handleCreateModal={handleCreateUserModal}
        refetch={refetch}
        roles={roles}
      />
      {state.user && (
        <EditModal
          showEditModal={state.showEditModal}
          handleEditModal={handleEditUserModal}
          refetch={refetch}
          user={state.user}
          roles={roles}
        />
      )}
    </MyLayout>
  );
}

export default Users;
