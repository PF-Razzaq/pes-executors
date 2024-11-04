// Layout.js

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Assuming you're using React Router

const Layout = ({ children }) => {
  const location = useLocation();

  const getPageTitle = (path) => {
    switch (path) {
      default:
        return " Executor's Aide ";
    }
  };

  return <div>{children}</div>;
};

export default Layout;
