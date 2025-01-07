import { createSignal } from "solid-js";
import Navbar from "../Navbar/navbar";
import Sidebar from "../Sidebar/sidebar";
import NoteBox from "../NoteBox/notebox";
import NoteAdder from "../NoteBox/NB-features/note-adder";
// import ListAdder from "../NoteBox/NB-features/list-adder";

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
        
          <NoteBox />
          <NoteAdder/>
          {/* <ListAdder/> */}
        </main>
      </div>
    </div>
  );
};

export default Layout;