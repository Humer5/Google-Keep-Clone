import { createSignal } from "solid-js";
import "../../styles/sidebar.css";

const Sidebar = ({isExpanded}) => {
  const [activeItem, setActiveItem] = createSignal(localStorage.getItem("activeItem") || "Notes");

  const handleItemClick = (item) => {
    setActiveItem(item);
    localStorage.setItem("activeItem", item);
  };

  return (
    // <div class="sidebar-container">
       <div class={`sidebar-container ${isExpanded ? "expanded" : ""}`}>
      <div class="sidebar">
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
