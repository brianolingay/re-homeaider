import * as React from "react";
import Head from "next/head";
import { Container, Menu, Segment, Dropdown } from "semantic-ui-react";
import { Query, Mutation } from "react-apollo";

import { meQuery } from "../graphql/user/queries/me";
import { MeQuery, LogoutMutation } from "./apollo-components";
import Router from "next/router";
import { logoutMutation } from "../graphql/user/mutations/logout";
import { authTokenStore } from "../lib/authTokenStore";

type Props = {
  title: string;
  showMenu?: boolean;
};

const adminPages = [
  { push: "/", title: "Categories" },
  { push: "/services", title: "Services" },
  { push: "/subscriptions", title: "Subscriptions" },
  { push: "/roles", title: "Roles" },
  { push: "/users", title: "Users" },
];

const Layout: React.SFC<Props> = ({
  children,
  title = "This is the default title",
  showMenu,
}) => (
  <Container>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {showMenu && (
      <Mutation<LogoutMutation> mutation={logoutMutation}>
        {() => (
          <Query<MeQuery> ssr={false} query={meQuery}>
            {({ data, loading }) => {
              const isLoggedIn = !!data.me;

              if (loading) {
                return <Menu />;
              }

              return (
                <Segment inverted>
                  <Menu inverted pointing secondary>
                    {isLoggedIn &&
                      data.me.role.name === "admin" &&
                      adminPages.map(page => (
                        <Menu.Item
                          key={`admin-${page.title}`}
                          onClick={() => Router.push(page.push)}
                        >
                          {page.title}
                        </Menu.Item>
                      ))}

                    {isLoggedIn ? (
                      <Menu.Menu position="right">
                        <Dropdown
                          text={data.me.email}
                          pointing
                          className="link item"
                        >
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => Router.push("/profile")}
                            >
                              Profile
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                              onClick={async () => {
                                await authTokenStore.removeTokens();
                                (window as any).location = "/login";
                                // Router.push("/home");
                                // await client.resetStore();
                              }}
                            >
                              Logout
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Menu.Menu>
                    ) : (
                      <Menu.Menu position="right">
                        <Menu.Item onClick={() => Router.push("/login")}>
                          Login
                        </Menu.Item>
                      </Menu.Menu>
                    )}
                  </Menu>
                </Segment>
              );
            }}
          </Query>
        )}
      </Mutation>
    )}
    {children}
  </Container>
);

export default Layout;
