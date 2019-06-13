import React from "react";
import { Layout } from "antd";
import MyLayout from "../components/MyLayout";

const { Content } = Layout;

export default () => {
  return (
    <MyLayout title="Homeaider">
      <Content
        style={{
          background: "#fff",
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        Content
      </Content>
    </MyLayout>
  );
};
