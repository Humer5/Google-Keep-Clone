import { createSignal, onMount } from "solid-js";
import "../../styles/notetextbox.css";

function NoteTextbox() {
  const [hoveredIcon, setHoveredIcon] = createSignal(""); // Tracks the currently hovered icon
  const [tooltips, setTooltips] = createSignal({
    check_box: "New list",
    brush: "New note with drawing",
    image: "New note with image",
  });

  // Load tooltips from localStorage on mount
  onMount(() => {
    const savedTooltips = localStorage.getItem("tooltips");
    if (savedTooltips) {
      setTooltips(JSON.parse(savedTooltips));
    }
  });

  return (
    <div class="note-textbox-container">
      <input
        type="text"
        placeholder="Take a note..."
        class="note-textbox"
      />
      <div class="note-icons">
        <div class="icon-wrapper">
          <button
            class="note-icon-button"
            onMouseEnter={() => setHoveredIcon("check_box")}
            onMouseLeave={() => setHoveredIcon("")}
          >
            <span class="material-symbols-outlined">check_box</span>
          </button>
          {hoveredIcon() === "check_box" && (
            <div class="tooltip">{tooltips().check_box}</div>
          )}
        </div>
        <div class="icon-wrapper">
          <button
            class="note-icon-button"
            onMouseEnter={() => setHoveredIcon("brush")}
            onMouseLeave={() => setHoveredIcon("")}
          >
            <span class="material-symbols-outlined">brush</span>
          </button>
          {hoveredIcon() === "brush" && (
            <div class="tooltip">{tooltips().brush}</div>
          )}
        </div>
        <div class="icon-wrapper">
          <button
            class="note-icon-button"
            onMouseEnter={() => setHoveredIcon("image")}
            onMouseLeave={() => setHoveredIcon("")}
          >
            <span class="material-symbols-outlined">image</span>
          </button>
          {hoveredIcon() === "image" && (
            <div class="tooltip">{tooltips().image}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NoteTextbox;
