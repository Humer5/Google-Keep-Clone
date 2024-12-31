import { createSignal, onMount } from "solid-js";
import "../../styles/sidebar.css";

const Sidebar = () => {
  const [activeItem, setActiveItem] = createSignal(localStorage.getItem("activeItem") || "Notes");

  const handleItemClick = (item) => {
    setActiveItem(item);
    localStorage.setItem("activeItem", item);
  };

  return (
    <div class="sidebar-container">
      <div class="sidebar">
        <div
          class={`sidebar-item ${activeItem() === "Notes" ? "active" : ""}`}
          onClick={() => handleItemClick("Notes")}
        >
          <span class="material-icons">lightbulb</span>
          <span class="item-label">Notes</span>
        </div>
        <div
          class={`sidebar-item ${activeItem() === "Reminders" ? "active" : ""}`}
          onClick={() => handleItemClick("Reminders")}
        >
          <span class="material-icons">notifications</span>
          <span class="item-label">Reminders</span>
        </div>
        <div
          class={`sidebar-item ${activeItem() === "Notifications" ? "active" : ""}`}
          onClick={() => handleItemClick("Notifications")}
        >
          <span class="material-icons">notifications_active</span>
          <span class="item-label">Notifications</span>
        </div>
        <div
          class={`sidebar-item ${activeItem() === "Archive" ? "active" : ""}`}
          onClick={() => handleItemClick("Archive")}
        >
          <span class="material-icons">archive</span>
          <span class="item-label">Archive</span>
        </div>
        <div
          class={`sidebar-item ${activeItem() === "Bin" ? "active" : ""}`}
          onClick={() => handleItemClick("Bin")}
        >
          <span class="material-icons">delete</span>
          <span class="item-label">Bin</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
