import { createSignal, onCleanup } from "solid-js";
import "../../styles/notetextbox.css";

function NoteTextbox() {
  const [isExpanded, setIsExpanded] = createSignal(false); // Tracks expansion
  const [title, setTitle] = createSignal(""); // Title of the note
  const [noteContent, setNoteContent] = createSignal(""); // Content of the note
  const [hoveredIcon, setHoveredIcon] = createSignal(""); // Tracks the currently hovered icon
  const [tooltips, setTooltips] = createSignal({
    check_box: "New list",
    brush: "New note with drawing",
    image: "New note with image",
    notifications: "Remind me",
    person_add: "Collaborator",
    palette: "Background options",
    archive: "Archive",
    more_vert: "More options",
  });

  const handleExpand = () => setIsExpanded(true);

  const handleCollapse = () => {
    if (title().trim() || noteContent().trim()) {
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      const newNote = { title: title(), content: noteContent() };
      localStorage.setItem("notes", JSON.stringify([...notes, newNote]));
    }
    setTitle("");
    setNoteContent("");
    setIsExpanded(false);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest(".note-textbox-container")) {
      handleCollapse();
    }
  };

  if (isExpanded()) {
    document.addEventListener("click", handleOutsideClick);
  } else {
    document.removeEventListener("click", handleOutsideClick);
  }

  onCleanup(() => {
    document.removeEventListener("click", handleOutsideClick);
  });

  return (
    <div
      class={`note-textbox-container ${isExpanded() ? "expanded" : ""}`}
      onClick={!isExpanded() ? handleExpand : undefined}
    >
      {isExpanded() && (
        <input
          type="text"
          placeholder="Title"
          value={title()}
          onInput={(e) => setTitle(e.target.value)}
          class="note-title"
        />
      )}
      <textarea
        placeholder="Take a note..."
        class="note-textbox"
        value={noteContent()}
        onInput={(e) => setNoteContent(e.target.value)}
        onClick={!isExpanded() ? handleExpand : undefined}
      />
      <div class="note-icons">
        {!isExpanded() ? (
          <>
            {["check_box", "brush", "image"].map((icon) => (
              <div
                class="icon-wrapper"
                onMouseEnter={() => setHoveredIcon(icon)}
                onMouseLeave={() => setHoveredIcon("")}
              >
                <button class="note-icon-button">
                  <span class="material-symbols-outlined">{icon}</span>
                </button>
                {hoveredIcon() === icon && (
                  <div class="tooltip">{tooltips()[icon]}</div>
                )}
              </div>
            ))}
          </>
        ) : (
          <>
            {[
              "notifications",
              "person_add",
              "palette",
              "image",
              "archive",
              "more_vert",
            ].map((icon) => (
              <div
                class="icon-wrapper"
                onMouseEnter={() => setHoveredIcon(icon)}
                onMouseLeave={() => setHoveredIcon("")}
              >
                <button class="note-icon-button expanded-icons">
                  <span class="material-symbols-outlined">{icon}</span>
                </button>
                {hoveredIcon() === icon && (
                  <div class="tooltip">{tooltips()[icon]}</div>
                )}
              </div>
            ))}
            <button class="close-btn" onClick={handleCollapse}>
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default NoteTextbox;
