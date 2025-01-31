import { createSignal, createEffect } from "solid-js";
import "../../styles/sidebar.css";

const Sidebar = ({ isExpanded, onItemClick }) => {
  // Track the active item, persisting it in localStorage
  const [activeItem, setActiveItem] = createSignal(localStorage.getItem("activeItem") || "Notes");

  // Handle sidebar item clicks
  const handleItemClick = (item) => {
    setActiveItem(item); // Update the active item
    localStorage.setItem("activeItem", item); // Persist the active item
    onItemClick(item); // Notify parent component of the active item
  };

  // Update the parent with the active item on initial render
  createEffect(() => {
    onItemClick(activeItem());
  });

  return (
    <div class={`sidebar-container ${isExpanded ? "expanded" : ""}`}>
      <div class="sidebar">
        {/* Sidebar Items */}
        <div
          class={`sidebar-item ${activeItem() === "Notes" ? "active" : ""}`}
          onClick={() => handleItemClick("Notes")}
        >
          <span class="material-symbols-outlined">lightbulb</span>
          <span class="item-label">Notes</span>
        </div>
        <div
          class={`sidebar-item ${activeItem() === "Reminders" ? "active" : ""}`}
          onClick={() => handleItemClick("Reminders")}
        >
          <span class="material-symbols-outlined">notifications</span>
          <span class="item-label">Reminders</span>
        </div>
        <div
          class={`sidebar-item ${activeItem() === "Edit Labels" ? "active" : ""}`}
          onClick={() => handleItemClick("Edit Labels")}
        >
          <span class="material-symbols-outlined">edit</span>
          <span class="item-label">Edit Labels</span>
        </div>
        <div
          class={`sidebar-item ${activeItem() === "Archive" ? "active" : ""}`}
          onClick={() => handleItemClick("Archive")}
        >
          <span class="material-symbols-outlined">archive</span>
          <span class="item-label">Archive</span>
        </div>
        <div
          class={`sidebar-item ${activeItem() === "Bin" ? "active" : ""}`}
          onClick={() => handleItemClick("Bin")}
        >
          <span class="material-symbols-outlined">delete</span>
          <span class="item-label">Bin</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
