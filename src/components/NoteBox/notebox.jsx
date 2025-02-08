import { createSignal, onCleanup } from "solid-js";
import "../../styles/notebox.css";

function NoteBox() {
  const [isExpanded, setIsExpanded] = createSignal(false);
  const [title, setTitle] = createSignal("");
  const [noteContent, setNoteContent] = createSignal("");
  const [hoveredIcon, setHoveredIcon] = createSignal("");
  const [uploadedImage, setUploadedImage] = createSignal(null);
  const [isChecklist, setIsChecklist] = createSignal(false);
  const [checklistItems, setChecklistItems] = createSignal([]);
  const [newChecklistItem, setNewChecklistItem] = createSignal("");

  const [tooltips, setTooltips] = createSignal({
    check_box: "New list",
    image: "Add image",
  });

  const handleExpand = () => setIsExpanded(true);

  const handleAddContent = () => {
    if (
      title().trim() ||
      noteContent().trim() ||
      uploadedImage() ||
      checklistItems().length
    ) {
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      const newNote = {
        title: title().trim(),
        content: noteContent().trim(),
        image: uploadedImage(),
        checklist: isChecklist() ? checklistItems() : null,
      };

      const updatedNotes = [...notes, newNote];
      localStorage.setItem("notes", JSON.stringify(updatedNotes));

      // ✅ Dispatch custom event to notify NoteAdder.jsx
      window.dispatchEvent(new CustomEvent("notesUpdated", { detail: updatedNotes }));
    }

    // Reset the fields after adding content
    setTitle("");
    setNoteContent("");
    setUploadedImage(null);
    setIsExpanded(false);
    setIsChecklist(false);
    setChecklistItems([]);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest(".notebox-container")) {
      setIsExpanded(false);
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = () => {
    document.getElementById("image-upload-input").click();
  };

  const addChecklistItem = () => {
    if (newChecklistItem().trim()) {
      setChecklistItems([...checklistItems(), { text: newChecklistItem().trim(), checked: false }]);
      setNewChecklistItem("");
    }
  };

  const removeChecklistItem = (index) => {
    setChecklistItems(checklistItems().filter((_, i) => i !== index));
  };

  const toggleChecklistItem = (index) => {
    setChecklistItems(
      checklistItems().map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div
      class={`notebox-container ${isExpanded() ? "expanded" : ""}`}
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
        </div>
      )}
      <textarea
        placeholder="Take a note..."
        class="notebox"
        value={noteContent()}
        onInput={(e) => setNoteContent(e.target.value)}
        onClick={!isExpanded() ? handleExpand : undefined}
      />

      {uploadedImage() && (
        <div class="uploaded-image-preview">
          <img src={uploadedImage()} alt="Uploaded content" class="uploaded-image" />
          <button onClick={() => setUploadedImage(null)}>Remove Image</button>
        </div>
      )}

      {isChecklist() && (
        <div class="checklist-container">
          <div class="checklist-input">
            <input
              type="text"
              placeholder="Add item"
              value={newChecklistItem()}
              onInput={(e) => setNewChecklistItem(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addChecklistItem()}
            />
            <button onClick={addChecklistItem}>Add</button>
          </div>
          <ul>
            {checklistItems().map((item, index) => (
              <li
                key={index}
                class={`checklist-item ${item.checked ? "checked" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleChecklistItem(index)}
                />
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div class="note-icons">
        {!isExpanded() ? (
          <>
            {["check_box", "image"].map((icon) => (
              <div
                class="icon-wrapper"
                onMouseEnter={() => setHoveredIcon(icon)}
                onMouseLeave={() => setHoveredIcon("")}
              >
                <button
                  class="note-icon-button"
                  onClick={
                    icon === "check_box"
                      ? () => setIsChecklist(!isChecklist())
                      : icon === "image"
                      ? handleAddImage
                      : undefined
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
          <button class="add-btn" onClick={handleAddContent}>
            Add
          </button>
        )}
      </div>

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
