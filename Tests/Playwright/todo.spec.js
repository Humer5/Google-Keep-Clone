const { test, expect } = require('@playwright/test');

test.describe('ToDo Application', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the ToDo application page
    await page.goto('http://127.0.0.1:5500/Google-Keep-Clone/todo.html'); // Replace with your actual file path
    console.log('Navigated to ToDo application');
  });

  test('should add a new note', async ({ page }) => {
    // Wait for the form to be ready
    await page.waitForSelector('#noteForm', { timeout: 20000 }); // Increased timeout
    console.log('Form is ready');

    // Fill in the note form and submit
    await page.fill('#noteTitle', 'New Note Title');
    await page.fill('#noteContent', 'This is the content of the new note.');
    await page.click('#noteForm button[type="submit"]');
    console.log('Note added');

    // Verify the new note appears in the notes list
    await page.waitForSelector('.note', { timeout: 20000 }); // Increased timeout
    const noteTitle = await page.textContent('.note h3'); // Adjust selector as needed
    const noteContent = await page.textContent('.note p'); // Adjust selector as needed
    expect(noteTitle).toBe('New Note Title');
    expect(noteContent).toBe('This is the content of the new note.');
  });

  test('should filter notes by active', async ({ page }) => {
    // Add two notes
    await page.fill('#noteTitle', 'Active Note');
    await page.fill('#noteContent', 'Content for active note.');
    await page.click('#noteForm button[type="submit"]');
    await page.waitForTimeout(1000); // Short wait for visibility

    await page.fill('#noteTitle', 'Completed Note');
    await page.fill('#noteContent', 'Content for completed note.');
    await page.click('#noteForm button[type="submit"]');
    await page.waitForTimeout(1000); // Short wait for visibility

    console.log('Notes added');

    // Verify both notes are added
    let notesContent = await page.innerHTML('#notesContainer');
    console.log('All Notes HTML:', notesContent);

    // Mark one note as completed
    await page.click('.note:nth-child(2) button:has-text("Mark Completed")');
    await page.waitForTimeout(1000); // Short wait for visibility
    console.log('Note marked as completed');

    // Verify the note is marked as completed
    notesContent = await page.innerHTML('#notesContainer');
    console.log('After Mark Completed - All Notes HTML:', notesContent);

    // Filter by active notes
    await page.click('button[data-filter="active"]');
    console.log('Filtered by active notes');
    await page.waitForTimeout(2000); // Short wait for filter to apply
    const activeNotes = await page.$$('.note:not(.completed)'); // Adjust selector as needed
    const activeNotesContent = await page.innerHTML('#notesContainer');
    console.log('Active Notes HTML:', activeNotesContent);
    expect(activeNotes.length).toBe(1);
  });

  test('should filter notes by completed', async ({ page }) => {
    // Ensure the note to be marked as completed is present
    await page.click('button[data-filter="all"]');
    await page.waitForTimeout(1000); // Ensure we are viewing all notes

    // Mark the note as completed if not already
    const completedButton = await page.$('.note:last-child button:has-text("Mark Completed")');
    if (completedButton) {
      await completedButton.click();
      await page.waitForTimeout(1000); // Short wait for completion toggle
      console.log('Last note marked as completed');
    }

    // Verify the note is marked as completed
    let notesContent = await page.innerHTML('#notesContainer');
    console.log('All Notes Before Filtering - HTML:', notesContent);

    // Filter by completed notes
    await page.click('button[data-filter="completed"]');
    console.log('Filtered by completed notes');
    await page.waitForTimeout(2000); // Short wait for filter to apply
    const completedNotes = await page.$$('.note.completed'); // Adjust selector as needed
    notesContent = await page.innerHTML('#notesContainer');
    console.log('Completed Notes HTML:', notesContent);
    expect(completedNotes.length).toBe(1);
  });

  test('should delete a note', async ({ page }) => {
    // Add a note to delete
    await page.fill('#noteTitle', 'Note to Delete');
    await page.fill('#noteContent', 'Content for the note to delete.');
    await page.click('#noteForm button[type="submit"]');
    await page.waitForTimeout(1000); // Short wait for visibility
    console.log('Note added for deletion');

    // Verify the note is added
    let notesContent = await page.innerHTML('#notesContainer');
    console.log('Before Deletion - Notes HTML:', notesContent);

    // Delete the note
    await page.click('.note:last-child button:has-text("Delete")'); // Adjust selector as needed
    console.log('Delete button clicked');

    // Verify the note is deleted
    const notesRemaining = await page.$$('.note');
    notesContent = await page.innerHTML('#notesContainer');
    console.log('After Deletion - Remaining Notes HTML:', notesContent);
    expect(notesRemaining.length).toBe(1); // Adjust number based on previous notes added in other tests
  });

  test('should mark a note as completed and back to active', async ({ page }) => {
    // Add a note to toggle completion
    await page.fill('#noteTitle', 'Note to Toggle');
    await page.fill('#noteContent', 'Content for the note to toggle.');
    await page.click('#noteForm button[type="submit"]');
    await page.waitForTimeout(1000); // Short wait for visibility
    console.log('Note added for toggling');

    // Verify the note is added
    let notesContent = await page.innerHTML('#notesContainer');
    console.log('Before Toggle - Notes HTML:', notesContent);

    // Mark the note as completed
    await page.click('.note:last-child button:has-text("Mark Completed")');
    await page.waitForTimeout(1000); // Short wait for visibility
    const completedNote = await page.$('.note:last-child.completed');
    notesContent = await page.innerHTML('#notesContainer');
    console.log('After Mark Completed - Notes HTML:', notesContent);
    expect(completedNote).toBeTruthy();
    console.log('Note marked as completed');

    // Mark the note back to active
    await page.click('.note:last-child button:has-text("Mark Active")');
    await page.waitForTimeout(1000); // Short wait for visibility
    const activeNote = await page.$('.note:last-child:not(.completed)');
    notesContent = await page.innerHTML('#notesContainer');
    console.log('After Mark Active - Notes HTML:', notesContent);
    expect(activeNote).toBeTruthy();
    console.log('Note marked back to active');
  });
});
