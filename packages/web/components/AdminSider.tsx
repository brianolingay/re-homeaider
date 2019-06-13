import React from "react";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const AdminSider = () => {
  return (
    <Sider width={200} style={{ background: "#fff" }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="1">Categories</Menu.Item>
        <Menu.Item key="2">Services</Menu.Item>
        <Menu.Item key="3">Roles</Menu.Item>
        <Menu.Item key="4">Users</Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminSider;
