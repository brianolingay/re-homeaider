import React from "react";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { NavProps } from "./HeaderNav";

const { Sider } = Layout;

const AdminSider = ({ pathname }: NavProps) => {
  return (
    <Sider width={200} style={{ background: "#fff" }}>
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="/admin">
          <Link href="/admin">
            <span>Categories</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/services">
          <Link href="/admin/services">
            <span>Services</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/roles">
          <Link href="/admin/roles">
            <span>Roles</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/users">
          <Link href="/admin/users">
            <span>Users</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminSider;
