import React from "react";
import Link from "next/link";
import { Layout, Menu, Icon } from "antd";
import { useMeQuery, useLogoutMutation } from "./apollo-components";
import { useApolloClient } from "react-apollo-hooks";

const { SubMenu } = Menu;
const { Header } = Layout;

export default function HeaderNav() {
  const client = useApolloClient();
  const { data, loading } = useMeQuery({ fetchPolicy: "network-only" });
  const logout = useLogoutMutation();

  console.log(loading);
  if (loading) {
    return <p>Loading...</p>;
  }

  console.log(data);
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
          <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
            <Menu.Item key="1">
              <Link href="signin">
                <span>Sign In</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link href="signup">
                <span>Sign up</span>
              </Link>
            </Menu.Item>
          </Menu>
        )}
        {!loading && data!.me && (
          <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>{data.me.email}</span>
                </span>
              }
            >
              <Menu.Item key="3">
                <Link href="profile">
                  <span>Profile</span>
                </Link>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                key="4"
                onClick={async () => {
                  //await logout();
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
