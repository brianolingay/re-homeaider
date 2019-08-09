import { Button, Divider, message, Modal, Table } from "antd";
import React, { useState } from "react";
import {
  CategoryInfoFragment,
  useDeleteServiceMutation,
  useServicesQuery,
  useCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../components/apollo-components";
import MyLayout from "../../components/MyLayout";
import { withAuth } from "../../components/withAuth";
import { CreateModal } from "../../modules/categories/CreateModal";
import { EditModal } from "../../modules/categories/EditModal";

const { confirm } = Modal;

const initialState = {
  showCreateModal: false,
  showEditModal: false,
  category: null,
};

interface CategoryRecord extends CategoryInfoFragment {
  key: string;
}

function Categories(props: any) {
  const { data, loading, refetch } = useCategoriesQuery();

  const { data: servicesData } = useServicesQuery();

  const deleteCategory = useDeleteCategoryMutation();

  const [state, setstate] = useState(initialState);

  const handleCreateModal = () => {
    const newState = { ...state, showCreateModal: !state.showCreateModal };
    setstate(newState);
  };

  const handleEditModal = (category: any) => {
    const newState = {
      ...state,
      showEditModal: !state.showEditModal,
      category,
    };
    setstate(newState);
  };

  const handleDeleteComfirmation = (callback: any) => {
    confirm({
      title: "Delete Confirmation",
      content: "Are you sure delete this Category?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        const response = await callback();

        if (response && response.data && !response.data.deleteCategory) {
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
      title: "Statement",
      dataIndex: "statement",
      key: "statement",
    },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (
        _text: string,
        { __typename, _id, key, ...record }: CategoryRecord
      ) => (
        <span>
          <Button
            icon="ordered-list"
            onClick={() =>
              handleEditModal({
                ...record,
                categoryId: _id,
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
                return await deleteCategory({
                  variables: { categoryId: _id },
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

  let services: any = [];

  if (servicesData && servicesData.services) {
    services = servicesData.services.map(item => ({
      key: item._id,
      value: item.name,
      text: item.name,
    }));
  }

  let newData: any = [];

  if (data && data.categories) {
    newData = data.categories.map(item => ({
      ...item,
      key: item._id,
    }));
  }

  return (
    <MyLayout
      title="Categories"
      containerStyle={{
        padding: "24px",
        flex: 1,
      }}
      pathname={props.pathname}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="primary" onClick={handleCreateModal}>
          Add Categories
        </Button>
      </div>
      <Table columns={columns} dataSource={newData} loading={loading} />
      <CreateModal
        showCreateModal={state.showCreateModal}
        handleCreateModal={handleCreateModal}
        refetch={refetch}
        services={services}
      />
      {state.category && (
        <EditModal
          showEditModal={state.showEditModal}
          handleEditModal={handleEditModal}
          refetch={refetch}
          category={state.category}
          services={services}
        />
      )}
    </MyLayout>
  );
}

export default withAuth(Categories);
