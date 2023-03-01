import React from "react";
import OpenConversation from "./OpenConversation";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div className="main-content">
      <Sidebar />
      <OpenConversation />
    </div>
  );
}
