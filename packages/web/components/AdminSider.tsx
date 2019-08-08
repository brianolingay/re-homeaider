import { Layout, Menu } from "antd";
import Link from "next/link";
import React from "react";
import { NavProps } from "./HeaderNav";

const { Sider } = Layout;

const AdminSider = ({ pathname, handleNav }: NavProps) => {
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
        <Menu.Item key="/admin/roles" onClick={handleNav}>
          <span>Roles</span>
        </Menu.Item>
        <Menu.Item key="/admin/users" onClick={handleNav}>
          <span>Users</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminSider;
