import React from "react";

import AdminSider from "./AdminSider";
import { useMeQuery } from "./apollo-components";
import { NavProps } from "./HeaderNav";

export default function SiderNav(props: NavProps) {
  const { data, loading } = useMeQuery();

  if (loading || !data!.me) {
    return null;
  }

  if (data!.me!.role!.key === "admin") {
    return <AdminSider {...props} />;
  }

  return null;
}
