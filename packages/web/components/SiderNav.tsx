import React from "react";
import AdminSider from "./AdminSider";
import { NavProps } from "./HeaderNav";

export default function SiderNav(props: NavProps) {
  if (!props.check!.me) {
    return null;
  }

  if (props.check!.me!.role!.key === "admin") {
    return <AdminSider {...props} />;
  }

  return null;
}
