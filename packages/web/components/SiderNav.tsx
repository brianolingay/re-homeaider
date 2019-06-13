import React from "react";

import AdminSider from "./AdminSider";
import { useMeQuery } from "./apollo-components";

export default function SiderNav() {
  const { data } = useMeQuery();

  if (!data!.me) {
    return null;
  }

  if (data!.me!.role!.name === "admin") {
    return <AdminSider />;
  }

  return null;
}
