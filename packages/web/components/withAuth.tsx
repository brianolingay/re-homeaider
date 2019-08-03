import * as React from "react";
import { meQuery } from "../graphql/user/queries/me";
import redirect from "../lib/redirect";
import { NextContextWithApollo } from "../types/NextContextWithApollo";
import { MeQuery } from "./apollo-components";

export const withAuth = <T extends object>(C: React.ComponentClass<T>) => {
  return class AuthComponent extends React.Component<T> {
    static async getInitialProps({
      asPath,
      apolloClient,
      ...ctx
    }: NextContextWithApollo) {
      const response = await apolloClient.query<MeQuery>({ query: meQuery });
      if (!response || !response.data || !response.data.me) {
        redirect(ctx, "/signin");
        return {
          me: null,
        };
      }

      return {
        me: response.data.me,
        pathname: ctx.pathname,
      };
    }

    render() {
      return <C {...this.props} />;
    }
  };
};
