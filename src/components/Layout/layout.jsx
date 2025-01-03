import { createSignal } from "solid-js";
import Navbar from "../Navbar/navbar";
import Sidebar from "../Sidebar/sidebar";
import NoteTextbox from "../NoteTextbox/NoteTextbox";
import "../../styles/layout.css";

const Layout = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = createSignal(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded());
  };

  return (
    <div class="layout-container">
      {/* Navbar */}
      <Navbar onMenuClick={toggleSidebar} />
      
      <div class="content-wrapper">
        {/* Sidebar */}
        <Sidebar isExpanded={isSidebarExpanded()} />
        
        {/* Main Content */}
        <main class="main-content">
          {/* NoteTextbox Component */}
          <NoteTextbox />
          
          {/* Additional children content */}
          {/* {children} */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
