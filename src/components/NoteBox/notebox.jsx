import { createSignal, onCleanup } from "solid-js";
import "../../styles/notetextbox.css";

function NoteBox() {
  const [isExpanded, setIsExpanded] = createSignal(false); // Tracks expansion
  const [title, setTitle] = createSignal(""); // Title of the note
  const [noteContent, setNoteContent] = createSignal(""); // Content of the note
  const [isPinned, setIsPinned] = createSignal(false); // Tracks if the note is pinned
  const [hoveredIcon, setHoveredIcon] = createSignal(""); // Tracks hovered icon
  const [uploadedImage, setUploadedImage] = createSignal(null); // Tracks the uploaded image

  const [tooltips, setTooltips] = createSignal({
    check_box: "New list",
    brush: "New note with drawing",
    image: "Add image",
    notifications: "Remind me",
    person_add: "Collaborator",
    palette: "Background options",
    archive: "Archive",
    more_vert: "More options",
    push_pin: "Pin note",
  });

  const handleExpand = () => setIsExpanded(true);

  const handleCollapse = () => {
    if (title().trim() || noteContent().trim() || uploadedImage()) {
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      const newNote = {
        title: title(),
        content: noteContent(),
        image: uploadedImage(),
        pinned: isPinned(),
      };
      localStorage.setItem("notes", JSON.stringify([...notes, newNote]));
    }
    setTitle("");
    setNoteContent("");
    setUploadedImage(null);
    setIsPinned(false);
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

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result); // Save the base64 string of the image
      };
      reader.readAsDataURL(file); // Convert file to base64 string
    }
  };

  // Trigger file input on Image icon click
  const handleAddImage = () => {
    document.getElementById("image-upload-input").click();
  };

  return (
    <div
      class={`note-textbox-container ${isExpanded() ? "expanded" : ""}`}
      onClick={!isExpanded() ? handleExpand : undefined}
    >
      {isExpanded() && (
        <div class="title-container">
          <input
            type="text"
            placeholder="Title"
            value={title()}
            onInput={(e) => setTitle(e.target.value)}
            class="note-title"
          />
          <button
            class={`pin-note-button ${isPinned() ? "pinned" : ""}`}
            onClick={() => setIsPinned(!isPinned())}
            title={tooltips()["push_pin"]}
          >
            <span class="material-symbols-outlined">
              {isPinned() ? "push_pin" : "push_pin"}
            </span>
          </button>
        </div>
      )}
      <textarea
        placeholder="Take a note..."
        class="note-textbox"
        value={noteContent()}
        onInput={(e) => setNoteContent(e.target.value)}
        onClick={!isExpanded() ? handleExpand : undefined}
      />

      {/* Display uploaded image */}
      {uploadedImage() && (
        <div class="uploaded-image-preview">
          <img
            src={uploadedImage()}
            alt="Uploaded content"
            class="uploaded-image"
          />
        </div>
      )}

      <div class="note-icons">
        {!isExpanded() ? (
          <>
            {["check_box", "brush", "image"].map((icon) => (
              <div
                class="icon-wrapper"
                onMouseEnter={() => setHoveredIcon(icon)}
                onMouseLeave={() => setHoveredIcon("")}
              >
                <button
                  class="note-icon-button"
                  onClick={
                    icon === "image" ? handleAddImage : undefined /* Add other actions */
                  }
                >
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
                <button
                  class="note-icon-button expanded-icons"
                  onClick={
                    icon === "image"
                      ? handleAddImage
                      : undefined /* Add other actions */
                  }
                >
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

      {/* Hidden file input for image upload */}
      <input
        type="file"
        id="image-upload-input"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </div>
  );
}

export default NoteBox;
