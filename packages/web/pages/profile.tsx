import React from "react";
import MyLayout from "../components/MyLayout";

export default function profile() {
  return (
    <MyLayout
      title="Profile"
      containerStyle={{ display: "flex", flex: 1, justifyContent: "center" }}
      pathname="/profile"
    >
      Welcome
    </MyLayout>
  );
}
