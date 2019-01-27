import * as React from "react";
import Head from "next/head";
import { Container, Menu, Segment } from "semantic-ui-react";
import { Query, Mutation } from "react-apollo";

import { meQuery } from "../graphql/user/queries/me";
import { MeQuery, LogoutMutation } from "./apollo-components";
import Router from "next/router";
import { logoutMutation } from "../graphql/user/mutations/logout";

type Props = {
  title: string;
  showMenu?: boolean;
};

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
        {mutate => (
          <Query<MeQuery> ssr={false} query={meQuery}>
            {({ data, loading }) => {
              const isLoggedIn = !!data.me;

              if (loading) {
                return <Menu />;
              }

              return (
                <Segment inverted>
                  <Menu inverted pointing secondary>
                    <Menu.Item onClick={() => Router.push("/")}>Home</Menu.Item>
                    {isLoggedIn && (
                      <Menu.Item onClick={() => Router.push("/categories")}>
                        Categories
                      </Menu.Item>
                    )}
                    {isLoggedIn && (
                      <Menu.Item onClick={() => Router.push("/services")}>
                        Services
                      </Menu.Item>
                    )}
                    {isLoggedIn && (
                      <Menu.Item onClick={() => Router.push("/subscriptions")}>
                        Subscriptions
                      </Menu.Item>
                    )}
                    {isLoggedIn && (
                      <Menu.Item onClick={() => Router.push("/roles")}>
                        Roles
                      </Menu.Item>
                    )}
                    <Menu.Menu position="right">
                      {isLoggedIn ? (
                        <>
                          <Menu.Item>{data.me.email}</Menu.Item>
                          <Menu.Item
                            onClick={async () => {
                              await mutate({});
                              (window as any).location = "/";
                              // Router.push("/home");
                              // await client.resetStore();
                            }}
                          >
                            logout
                          </Menu.Item>
                        </>
                      ) : (
                        <>
                          <Menu.Item onClick={() => Router.push("/register")}>
                            register
                          </Menu.Item>
                          <Menu.Item onClick={() => Router.push("/login")}>
                            login
                          </Menu.Item>
                        </>
                      )}
                    </Menu.Menu>
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
