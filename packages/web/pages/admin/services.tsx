import { Button, Divider, message, Modal, Table } from "antd";
import React, { useState } from "react";
import {
  ServiceInfoFragment,
  useDeleteServiceMutation,
  useServicesQuery,
} from "../../components/apollo-components";
import MyLayout from "../../components/MyLayout";
import { withAuth } from "../../components/withAuth";
import { CreateModal } from "../../modules/services/CreateModal";
import { EditModal } from "../../modules/services/EditModal";

const { confirm } = Modal;

const initialState = {
  showCreateModal: false,
  showEditModal: false,
  service: null,
};

interface ServiceRecord extends ServiceInfoFragment {
  key: string;
}

function Services(props: any) {
  const { data, loading, refetch } = useServicesQuery();

  const deleteService = useDeleteServiceMutation();

  const [state, setstate] = useState(initialState);

  const handleCreateModal = () => {
    const newState = { ...state, showCreateModal: !state.showCreateModal };
    setstate(newState);
  };

  const handleEditModal = (service: any) => {
    const newState = { ...state, showEditModal: !state.showEditModal, service };
    setstate(newState);
  };

  const handleDeleteComfirmation = (callback: any) => {
    confirm({
      title: "Delete Confirmation",
      content: "Are you sure delete this Service?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        const response = await callback();

        if (response && response.data && !response.data.deleteService) {
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
      align: "right",
      render: (
        _text: string,
        { __typename, _id, key, ...record }: ServiceRecord
      ) => (
        <span>
          <Button
            type="primary"
            onClick={() =>
              handleEditModal({
                ...record,
                serviceId: _id,
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
                return await deleteService({
                  variables: { serviceId: _id },
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

  if (data && data.services) {
    newData = data.services.map(item => ({
      ...item,
      key: item._id,
    }));
  }

  return (
    <MyLayout
      title="Services"
      containerStyle={{
        padding: "24px",
        flex: 1,
      }}
      pathname={props.pathname}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="primary" onClick={handleCreateModal}>
          Add Service
        </Button>
      </div>
      <Table columns={columns} dataSource={newData} loading={loading} />
      <CreateModal
        showCreateModal={state.showCreateModal}
        handleCreateModal={handleCreateModal}
        refetch={refetch}
      />
      {state.service && (
        <EditModal
          showEditModal={state.showEditModal}
          handleEditModal={handleEditModal}
          refetch={refetch}
          service={state.service}
        />
      )}
    </MyLayout>
  );
}

export default withAuth(Services);
