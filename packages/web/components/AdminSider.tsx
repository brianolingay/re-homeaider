import React from "react";
import { Layout, Menu } from "antd";
import Link from "next/link";

const { Sider } = Layout;

const AdminSider = () => {
  return (
    <Sider width={200} style={{ background: "#fff" }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="1">
          <Link href="/admin">
            <span>Categories</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/admin/services">
            <span>Services</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link href="/admin/roles">
            <span>Roles</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link href="/admin/users">
            <span>Users</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminSider;
