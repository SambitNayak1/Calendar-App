import React, { useContext } from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
import GlobalContext from "../context/GlobalContext";

export default function Sidebar() {
  const { sidebarOpen } = useContext(GlobalContext);

  return (
    <aside className={`border p-5 w-64 ${sidebarOpen ? "hidden" : ""}`}>
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
}
