import App from "./App";
import { KeepAwake, registerRootComponent } from "expo";
import React from "react";
const AwakeInDevApp = props => [
  <App key="app" {...props} />,
  process.env.NODE_ENV === "development" ? (
    <KeepAwake key="keep-awake" />
  ) : null,
];
registerRootComponent(AwakeInDevApp);
