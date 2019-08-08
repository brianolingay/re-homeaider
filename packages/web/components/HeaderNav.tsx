import { Icon, Layout, Menu } from "antd";
import React from "react";
import { useApolloClient } from "react-apollo-hooks";
import { useLogoutMutation, MeQuery } from "./apollo-components";

const { SubMenu } = Menu;
const { Header } = Layout;

export type NavProps = {
  check: MeQuery | undefined;
  pathname: string;
  handleNav: (e: any) => void;
};

export default function HeaderNav({ pathname, handleNav, check }: NavProps) {
  const client = useApolloClient();
  const logout = useLogoutMutation();

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
        {check && !check.me && (
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: "64px" }}
            selectedKeys={[pathname]}
          >
            <Menu.Item key="/signin" onClick={handleNav}>
              <span>Sign In</span>
            </Menu.Item>
            <Menu.Item key="/signup" onClick={handleNav}>
              <span>Sign up</span>
            </Menu.Item>
          </Menu>
        )}
        {check && check.me && (
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: "64px" }}
            selectedKeys={[pathname]}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>{check.me.email}</span>
                </span>
              }
            >
              <Menu.Item key="/profile" onClick={handleNav}>
                <span>Profile</span>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                key="4"
                onClick={async () => {
                  await logout();
                  await client.resetStore();
                }}
              >
                Logout
              </Menu.Item>
            </SubMenu>
          </Menu>
        )}
      </div>
    </Header>
  );
}
