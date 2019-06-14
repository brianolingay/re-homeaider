import React from "react";
import MyLayout from "../components/MyLayout";

export default () => {
  return (
    <MyLayout
      title="Homeaider"
      containerStyle={{
        background: "#fff",
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >
      Content
    </MyLayout>
  );
};
