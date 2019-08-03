import React from "react";
import { Layout } from "antd";
import HeaderNav from "../components/HeaderNav";
import SiderNav from "../components/SiderNav";
import Head from "next/head";

const { Content } = Layout;

type Props = {
  title: string;
  containerStyle: any;
  pathname: string;
};

const MyLayout: React.SFC<Props> = ({
  children,
  title,
  containerStyle,
  pathname,
}) => {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HeaderNav pathname={pathname} />
      <Layout>
        <SiderNav pathname={pathname} />
        <Layout>
          <Content style={containerStyle}>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
