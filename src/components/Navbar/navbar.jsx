import { createSignal, onMount } from "solid-js";
import logo from "../../assets/keep_logo.png"; // Replace with your logo path
import "../../styles/navbar.css";

const Navbar = ({ onMenuClick, onRefresh, onViewChange, onSearch }) => {
  const [theme, setTheme] = createSignal("light"); // Track theme state
  const [searchQuery, setSearchQuery] = createSignal(""); // Track search input
  const [isListView, setIsListView] = createSignal(true); // Track list/grid view state

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

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    if (onSearch) {
      onSearch(event.target.value); // Trigger the parent search logic
    }
  };

  // Handle list view toggle
  const toggleView = () => {
    const newView = !isListView();
    setIsListView(newView);
    if (onViewChange) {
      onViewChange(newView); // Notify parent about the view change
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh(); // Notify parent to refresh the page or content
    }
  };

  return (
    <div class="navbar">
      {/* Menu Icon */}
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
        <input
          type="text"
          placeholder="Search"
          value={searchQuery()}
          onInput={handleSearchChange}
        />
      </div>

      {/* Action Buttons */}
      <div class="action-buttons">
        {/* Refresh Button */}
        <button onClick={handleRefresh}>
          <span class="material-symbols-outlined">refresh</span>
        </button>

        {/* Toggle List/Grid View */}
        <button onClick={toggleView}>
          <span class="material-symbols-outlined">
            {isListView() ? "view_agenda" : "grid_view"}
          </span>
        </button>

        {/* Settings Button */}
        <button>
          <span class="material-symbols-outlined">settings</span>
        </button>

        {/* Theme Toggle */}
        <button class="theme-toggle-btn" onClick={toggleTheme}>
          <span class="material-symbols-outlined">
            {theme() === "light" ? "dark_mode" : "light_mode"}
          </span>
        </button>

        {/* Profile Button */}
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