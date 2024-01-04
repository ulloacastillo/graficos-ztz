import React from "react";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="h-screen flex flex-row justify-start bg-F6F8FA">
      <Sidebar />
      <div className="bg-white flex-1 p-4 text-black">
      </div>
    </div>
  );
};

export default Layout;
