import { createSignal } from "solid-js";
import Navbar from "../Navbar/navbar";
import Sidebar from "../Sidebar/sidebar";
import NoteBox from "../NoteBox/notebox";
import NoteAdder from "../NoteBox/NB-features/note-adder";

import "../../styles/layout.css";

const Layout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = createSignal(false);
  const [activeSection, setActiveSection] = createSignal("Notes"); 

  const renderContent = () => {
    const section = activeSection();
    return section === "Notes" ? <NoteAdder /> :
           section === "Reminders" ? <p>Notes with Upcoming Reminders come here.</p> :
           section === "Archive" ? <p>Your Archived notes appear here.</p> :
           section === "Bin" ? <p>No notes in Recycle Bin.</p> :
           <p>Select a section from the sidebar.</p>;
  };

  return (
    <div class="layout-container">
      {/* Navbar */}
      <Navbar onMenuClick={() => setIsSidebarExpanded(!isSidebarExpanded())} />

      <div class="content-wrapper">
        {/* Sidebar */}
        <Sidebar isExpanded={isSidebarExpanded()} onItemClick={setActiveSection} />

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
