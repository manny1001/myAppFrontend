import React, { lazy, Suspense } from "react";
import App from "./App";
import { Context } from "./Context";
const Index = () => {
  return (
    <Context>
      <App />
    </Context>
  );
};

export default Index;
