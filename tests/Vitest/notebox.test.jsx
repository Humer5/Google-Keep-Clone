import { render, screen, fireEvent } from "solid-testing-library";
import { createSignal } from "solid-js";
import NoteBox from "../../src/components/NoteBox/notebox";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("NoteBox Component", () => {
  let notes, setNotes;

  beforeEach(() => {
    // Mock localStorage
    vi.spyOn(Storage.prototype, "setItem");
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue(JSON.stringify([
      { id: 1, content: "First note" },
      { id: 2, content: "Second note" }
    ]));

    // Create a reactive signal for notes
    [notes, setNotes] = createSignal([
      { id: 1, content: "First note" },
      { id: 2, content: "Second note" },
    ]);

    render(() => <NoteBox />);
  });

  it("Should correctly render a list of notes", () => {
    expect(screen.getByText("First note")).toBeInTheDocument();
    expect(screen.getByText("Second note")).toBeInTheDocument();
  });

  it("Should update when a new note is added", async () => {
    setNotes([...notes(), { id: 3, content: "New note" }]);

    expect(await screen.findByText("New note")).toBeInTheDocument();
  });

  it("Should trigger localStorage updates on changes", () => {
    setNotes([...notes(), { id: 3, content: "Another note" }]);

    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
