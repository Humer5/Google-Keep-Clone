import { test, expect } from '@playwright/test';

test.describe('Note Addition & Management', () => {
  const noteTitle = 'Test Note';
  const noteContent = 'This is a test note.';
  const checklistItems = ['Item 1', 'Item 2'];
  const imageUrl = 'https://via.placeholder.com/150';

  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test to avoid persistence issues
    await page.evaluate(() => localStorage.clear());
    await page.goto('http://localhost:3000/layout'); // Change to your app URL
  });

  test('Add a new text note', async ({ page }) => {
    // Click the button or interact to add a new note
    await page.fill('textarea', noteContent); // Replace with correct input selector
    await page.click('button:has-text("Close")'); // Adjust button text accordingly

    // Verify the note is visible on the page
    const noteText = await page.locator('.note-content').textContent(); // Adjust selector
    expect(noteText).toContain(noteContent);

    // Check if note is saved in localStorage
    const notes = await page.evaluate(() => JSON.parse(localStorage.getItem('notes')));
    expect(notes).toBeTruthy();
    expect(notes[0].content).toBe(noteContent);
  });

  test('Add a checklist note', async ({ page }) => {
    // Add a checklist note
    await page.fill('textarea', 'Checklist Test'); // Fill note content
    await page.fill('input[name="checklist"]', checklistItems.join(',')); // Simulating checklist input
    await page.click('button:has-text("Add Note")'); // Add note button

    // Verify checklist items are displayed
    const checklistItemsDisplayed = await page.locator('.note-checklist li').allTextContents();
    expect(checklistItemsDisplayed).toEqual(checklistItems);

    // Ensure checklist items are clickable (if you have event handlers for interaction)
    const firstItem = page.locator('.note-checklist li').first();
    await firstItem.click(); // Click the first item
    expect(await firstItem.isChecked()).toBeTruthy(); // Verify it’s checked
  });

  test('Add an image note', async ({ page }) => {
    // Click to add an image
    const imageInput = await page.locator('input[type="file"]'); // Adjust if needed
    await imageInput.setInputFiles('path/to/keep_logo.png'); // Provide a valid image path

    // Verify the image is displayed on the note
    const imageElement = page.locator('.note-image');
    expect(await imageElement.isVisible()).toBeTruthy();
  });

  test('Delete a note', async ({ page }) => {
    // Add a note first
    await page.fill('textarea', 'Note to delete');
    await page.click('button:has-text("Add Note")');

    // Locate and click the delete button on the newly added note
    const deleteButton = page.locator('.note-action-button.delete-button');
    await deleteButton.click();

    // Ensure the note is removed from the UI
    const noteContent = page.locator('.note-content');
    await expect(noteContent).toHaveCount(0);

    // Verify it's removed from localStorage as well
    const notes = await page.evaluate(() => JSON.parse(localStorage.getItem('notes')));
    expect(notes.length).toBe(0); // Assuming there’s no other note
  });

  test('Edit an existing note', async ({ page }) => {
    // Add a note first
    await page.fill('textarea', 'Editable note');
    await page.click('button:has-text("Add Note")');

    // Locate and click the edit button for the note
    const editButton = page.locator('.note-action-button.edit-button');
    await editButton.click();

    // Modify the content and save
    const editTextarea = page.locator('.note-edit-textarea');
    await editTextarea.fill('Updated content');
    await page.click('button:has-text("Save changes")');

    // Ensure the updated content is visible on the page
    const noteText = await page.locator('.note-content').textContent();
    expect(noteText).toBe('Updated content');

    // Ensure the updated note is saved in localStorage
    const notes = await page.evaluate(() => JSON.parse(localStorage.getItem('notes')));
    expect(notes[0].content).toBe('Updated content');
  });
});
