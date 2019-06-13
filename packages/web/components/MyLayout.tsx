import React from "react";
import { Layout } from "antd";
import HeaderNav from "../components/HeaderNav";
import SiderNav from "../components/SiderNav";
import Head from "next/head";

type Props = {
  title: string;
};

const MyLayout: React.SFC<Props> = ({ children, title }) => {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HeaderNav />
      <Layout>
        <SiderNav />
        <Layout style={{ padding: "24px" }}>{children}</Layout>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
