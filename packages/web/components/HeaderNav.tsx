import React from "react";
import { Layout, Menu, Icon } from "antd";
import { useMeQuery } from "./apollo-components";

const { SubMenu } = Menu;
const { Header } = Layout;

export default function HeaderNav() {
  const { data, loading } = useMeQuery();

  if (loading && !data && !data!.me) {
    return <p>Loading...</p>;
  }

  return (
    <Header
      className="header"
      style={{ display: "flex", alignItems: "center" }}
    >
      <div style={{ display: "flex", alignItems: "baseline" }} />
      <div
        style={{
          display: "flex",
          flex: 1,
          flexFlow: "row wrap",
          justifyContent: "flex-end",
        }}
      >
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
          <Menu.Item key="1">Sign In</Menu.Item>
          <Menu.Item key="2">Sign Up</Menu.Item>
          {data!.me && (
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User Name</span>
                </span>
              }
            >
              <Menu.Item key="3">Profile</Menu.Item>
              <Menu.Divider />
              <Menu.Item key="4">Logout</Menu.Item>
            </SubMenu>
          )}
        </Menu>
      </div>
    </Header>
  );
}
