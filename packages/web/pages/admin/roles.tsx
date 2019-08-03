import { Button, Divider, Table, Modal, message } from "antd";
import React, { useState } from "react";
import {
  useAllRolesQuery,
  useDeleteRoleMutation,
} from "../../components/apollo-components";
import MyLayout from "../../components/MyLayout";
import { CreateModal } from "../../modules/roles/CreateModal";
import { EditModal } from "../../modules/roles/EditModal";
import { withAuth } from "../../components/withAuth";

const { confirm } = Modal;

const initialState = {
  showCreateModal: false,
  showEditModal: false,
  role: null,
};

function Roles(props: any) {
  const { data, loading, refetch } = useAllRolesQuery();

  const deleteRole = useDeleteRoleMutation();

  const [state, setstate] = useState(initialState);

  const handleCreateRoleModal = () => {
    const newState = { ...state, showCreateModal: !state.showCreateModal };
    setstate(newState);
  };

  const handleEditRoleModal = (role: any) => {
    const newState = { ...state, showEditModal: !state.showEditModal, role };
    setstate(newState);
  };

  const handleDeleteComfirmation = (callback: any) => {
    confirm({
      title: "Are you sure delete this role?",
      content:
        "Some user might using this, please be sure no one is assign for this role.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        const response = await callback();

        if (response && response.data && !response.data.deleteRole) {
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => handleEditRoleModal(record)}>
            Edit
          </Button>
          <Divider type="vertical" />
          <Button
            type="primary"
            onClick={() =>
              handleDeleteComfirmation(async () => {
                return await deleteRole({
                  variables: { roleId: record._id },
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

  if (data && data.roles) {
    newData = data.roles.map(item => ({ ...item, key: item._id }));
  }

  return (
    <MyLayout
      title="Roles"
      containerStyle={{
        padding: "24px",
        flex: 1,
      }}
      pathname={props.pathname}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="primary" onClick={handleCreateRoleModal}>
          Add Role
        </Button>
      </div>
      <Table columns={columns} dataSource={newData} loading={loading} />
      <CreateModal
        showCreateRoleModal={state.showCreateModal}
        handleCreateRoleModal={handleCreateRoleModal}
        refetch={refetch}
      />
      {state.role && (
        <EditModal
          showEditRoleModal={state.showEditModal}
          handleEditRoleModal={handleEditRoleModal}
          refetch={refetch}
          role={state.role}
        />
      )}
    </MyLayout>
  );
}

export default withAuth(Roles);
