import Navbar from "../Navbar/navbar";
import Sidebar from "../Sidebar/sidebar";
import "../../styles/layout.css"; // Add styles for the layout if needed

const Layout = ({ children }) => {
  return (
    <div class="layout-container">
      {/* Navbar at the top */}
      <Navbar />
        {/* <main class="main-content">
          {children}
        </main> */}
        <div class="layout-container">
      {/* Navbar at the top */}
      <Sidebar />
      </div>
    // </div>
  );
};

export default Layout;
