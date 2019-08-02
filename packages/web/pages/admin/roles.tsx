import React, { useState } from "react";
import MyLayout from "../../components/MyLayout";
import { useAllRolesQuery } from "../../components/apollo-components";
import { Table, Button } from "antd";
import { CreateRoleModal } from "../../modules/roles/CreateRoleModal";

const initialState = {
  showCreateModal: false,
  showEditModal: false,
  showDeleteConfirm: false,
};

function Roles() {
  const { data, loading, refetch } = useAllRolesQuery();

  const [state, setstate] = useState(initialState);

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
  ];

  let newData: any = [];

  if (data && data.roles) {
    newData = data.roles.map(item => {
      return { ...item, key: item._id };
    });
  }

  const handleCreateRoleModal = () => {
    const newState = { ...state, showCreateModal: !state.showCreateModal };
    setstate(newState);
  };

  const handleEditRoleModal = () => {
    const newState = { ...state, showEditModal: !state.showEditModal };
    setstate(newState);
  };

  const handleDeleteComfirmation = () => {
    const newState = { ...state, showDeleteConfirm: !state.showDeleteConfirm };
    setstate(newState);
  };

  return (
    <MyLayout
      title="Roles"
      containerStyle={{
        padding: "24px",
        flex: 1,
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="primary" onClick={handleCreateRoleModal}>
          Create Role
        </Button>
      </div>
      <Table columns={columns} dataSource={newData} loading={loading} />
      <CreateRoleModal
        showCreateRoleModal={state.showCreateModal}
        handleCreateRoleModal={handleCreateRoleModal}
        refetch={refetch}
      />
    </MyLayout>
  );
}

export default Roles;
