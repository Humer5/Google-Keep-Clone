import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, './todo.html'), 'utf8');

let document, window;

beforeEach(() => {
  const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
  window = dom.window;
  document = window.document;
  global.document = document;
  global.window = window;

  // Import the functions from todo.js
  require('./todo.js');
});

describe('ToDo Application', () => {
  it('should add a new note', () => {
    const noteTitle = document.getElementById('noteTitle');
    const noteContent = document.getElementById('noteContent');
    const noteForm = document.getElementById('noteForm');

    noteTitle.value = 'New Note Title';
    noteContent.value = 'This is the content of the new note.';

    // Simulate form submission
    noteForm.dispatchEvent(new window.Event('submit'));

    const notes = document.querySelectorAll('.note');
    expect(notes.length).toBe(1);

    const addedNoteTitle = notes[0].querySelector('h3').textContent;
    const addedNoteContent = notes[0].querySelector('p').textContent;

    expect(addedNoteTitle).toBe('New Note Title');
    expect(addedNoteContent).toBe('This is the content of the new note.');
  });

  // Additional tests for filtering and deletion
  // ...
});

