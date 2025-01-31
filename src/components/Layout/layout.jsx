import { createSignal } from "solid-js";
import Navbar from "../Navbar/navbar";
import Sidebar from "../Sidebar/sidebar";
import NoteBox from "../NoteBox/notebox";
import NoteAdder from "../NoteBox/NB-features/note-adder";

import "../../styles/layout.css";

const Layout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = createSignal(false);
  const [activeSection, setActiveSection] = createSignal("Notes"); // Active sidebar section

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded());
  };

  const renderContent = () => {
    switch (activeSection()) {
      case "Notes":
        return (
          <>
          <NoteAdder />
          </>
        );
      case "Reminders":
        return  <p>Notes with Upcoming Reminders come here.</p>;
      case "Archive":
        return <p>Your Archived notes appear here.</p>;
      case "Bin":
        return <p>No notes in Recycle Bin.</p>;
      default:
        return <p>Select a section from the sidebar.</p>;
    }
  };

  return (
    <div class="layout-container">
      {/* Navbar */}
      <Navbar onMenuClick={toggleSidebar} />

      <div class="content-wrapper">
        {/* Sidebar */}
        <Sidebar
          isExpanded={isSidebarExpanded()}
          onItemClick={setActiveSection} // Update active section
        />

        {/* Main Content */}
        <main class="main-content">
        <NoteBox />
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Layout;
