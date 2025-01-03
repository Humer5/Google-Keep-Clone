import { createSignal, onMount } from "solid-js";
import logo from "../../assets/keep_logo.png"; // Replace with your logo path
import "../../styles/navbar.css";

const Navbar = ({onMenuClick}) => {
  // Theme state with localStorage sync
  const [theme, setTheme] = createSignal("light");

  // Load theme from localStorage on mount
  onMount(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  });

  // Toggle theme and update localStorage
  const toggleTheme = () => {
    const newTheme = theme() === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div class="navbar">
      {/* Hamburger Menu */}
      <div class="menu-icon" onClick={onMenuClick}>
        <span class="material-symbols-outlined">menu</span>
      </div>

      {/* Logo */}
      <div class="app-logo">
        <img src={logo} alt="Google Keep Logo" />
        <span>Keep</span>
      </div>

      {/* Search Bar */}
      <div class="search-bar">
        <span class="material-symbols-outlined">search</span>
        <input type="text" placeholder="Search" />
      </div>

      {/* Action Buttons */}
      <div class="action-buttons">
        <button>
          <span class="material-symbols-outlined">refresh</span>
        </button>
        <button>
          <span class="material-symbols-outlined">view_agenda</span>
        </button>
        <button>
          <span class="material-symbols-outlined">settings</span>
        </button>
        <button class="theme-toggle-btn" onClick={toggleTheme}>
          <span class="material-symbols-outlined">
            {theme() === "light" ? "dark_mode" : "light_mode"}
          </span>
        </button>
        <button class="profile-btn">
          <img
            src="https://via.placeholder.com/32"
            alt="Profile"
            class="profile-img"
          />
        </button>
      </div>
      
    </div>
    
  );
};

export default Navbar;
