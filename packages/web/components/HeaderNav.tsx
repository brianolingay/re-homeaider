import React from "react";
import Link from "next/link";
import { Layout, Menu, Icon } from "antd";
import { useMeQuery, useLogoutMutation } from "./apollo-components";
import { useApolloClient } from "react-apollo-hooks";
import { useRouter } from "next/router";

const { SubMenu } = Menu;
const { Header } = Layout;

export type NavProps = {
  pathname: string;
};

export default function HeaderNav({ pathname }: NavProps) {
  const client = useApolloClient();
  const { data } = useMeQuery();
  const logout = useLogoutMutation();

  const router = useRouter();

  const handleNav = (e: any) => {
    router.push(e.key);
  };

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
            <Menu.Item key="/signin" onClick={handleNav}>
              <span>Sign In</span>
            </Menu.Item>
            <Menu.Item key="/signup" onClick={handleNav}>
              <span>Sign up</span>
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
