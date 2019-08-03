import React from "react";
import Link from "next/link";
import { Layout, Menu, Icon } from "antd";
import { useMeQuery, useLogoutMutation } from "./apollo-components";
import { useApolloClient } from "react-apollo-hooks";

const { SubMenu } = Menu;
const { Header } = Layout;

export type NavProps = {
  pathname: string;
};

export default function HeaderNav({ pathname }: NavProps) {
  const client = useApolloClient();
  const { data } = useMeQuery();
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
        {data && !data!.me && (
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: "64px" }}
            selectedKeys={[pathname]}
          >
            <Menu.Item key="/signin">
              <Link href="/signin">
                <span>Sign In</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/signup">
              <Link href="/signup">
                <span>Sign up</span>
              </Link>
            </Menu.Item>
          </Menu>
        )}
        {data && data!.me && (
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
                  <span>{data.me.email}</span>
                </span>
              }
            >
              <Menu.Item key="/profile">
                <Link href="/profile">
                  <span>Profile</span>
                </Link>
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
