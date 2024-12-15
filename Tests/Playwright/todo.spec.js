const { test, expect } = require('@playwright/test');

test.describe('ToDo Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/Google-Keep-Clone/todo.html');
    console.log('Navigated to ToDo application');
  });

  test('should add a new note', async ({ page }) => {
    await page.waitForSelector('#noteForm', { timeout: 20000 });
    console.log('Form is ready');

    await page.fill('#noteTitle', 'New Note Title');
    await page.fill('#noteContent', 'This is the content of the new note.');
    await page.click('#noteForm button[type="submit"]');
    console.log('Note added');

    await page.waitForSelector('.note', { timeout: 20000 });
    const noteTitle = await page.textContent('.note h3');
    const noteContent = await page.textContent('.note p');
    expect(noteTitle).toBe('New Note Title');
    expect(noteContent).toBe('This is the content of the new note.');
  });

  test('should filter notes by active', async ({ page }) => {
    await page.fill('#noteTitle', 'Active Note');
    await page.fill('#noteContent', 'Content for active note.');
    await page.click('#noteForm button[type="submit"]');
    await page.waitForTimeout(1000);

    await page.fill('#noteTitle', 'Completed Note');
    await page.fill('#noteContent', 'Content for completed note.');
    await page.click('#noteForm button[type="submit"]');
    await page.waitForTimeout(1000);

    console.log('Notes added');

    let notesContent = await page.innerHTML('#notesContainer');
    console.log('All Notes HTML:', notesContent);

    await page.click('.note:nth-child(2) button:has-text("Mark Completed")');
    await page.waitForTimeout(1000);
    console.log('Note marked as completed');

    notesContent = await page.innerHTML('#notesContainer');
    console.log('After Mark Completed - All Notes HTML:', notesContent);

    await page.click('button[data-filter="active"]');
    console.log('Filtered by active notes');
    await page.waitForTimeout(2000);
    const activeNotes = await page.$$('.note:not(.completed)');
    const activeNotesContent = await page.innerHTML('#notesContainer');
    console.log('Active Notes HTML:', activeNotesContent);
    expect(activeNotes.length).toBe(1);
  });

  test('should filter notes by completed', async ({ page }) => {
    // Ensure at least one note is added and marked as completed
    await page.fill('#noteTitle', 'Note to Complete');
    await page.fill('#noteContent', 'Content for the note to complete.');
    await page.click('#noteForm button[type="submit"]');
    await page.waitForTimeout(1000);

    const completedButton = await page.$('.note:last-child button:has-text("Mark Completed")');
    if (completedButton) {
      await completedButton.click();
      await page.waitForTimeout(1000);
      console.log('Last note marked as completed');
    } else {
      console.error('No button to mark a note as completed was found.');

      const notesContent = await page.innerHTML('#notesContainer');
      console.error('Current Notes HTML:', notesContent);
      throw new Error('No note available to mark as completed.');
    }

    let notesContent = await page.innerHTML('#notesContainer');
    console.log('All Notes Before Filtering - HTML:', notesContent);

    await page.click('button[data-filter="completed"]');
    console.log('Filtered by completed notes');
    await page.waitForTimeout(2000);
    const completedNotes = await page.$$('.note.completed');
    notesContent = await page.innerHTML('#notesContainer');
    console.log('Completed Notes HTML:', notesContent);
    expect(completedNotes.length).toBe(1);
  });

  test('should delete a note', async ({ page }) => {
    await page.fill('#noteTitle', 'Note to Delete');
    await page.fill('#noteContent', 'Content for the note to delete.');
    await page.click('#noteForm button[type="submit"]');
    await page.waitForTimeout(1000);
    console.log('Note added for deletion');

    let notesContent = await page.innerHTML('#notesContainer');
    const existingNotes = await page.$$('.note');
    console.log('Before Deletion - Notes HTML:', notesContent);

    await page.click('.note:last-child button:has-text("Delete")');
    console.log('Delete button clicked');

    const notesRemaining = await page.$$('.note');
    notesContent = await page.innerHTML('#notesContainer');
    console.log('After Deletion - Remaining Notes HTML:', notesContent);
    expect(notesRemaining.length).toBe(existingNotes.length - 1);
  });

  test('should mark a note as completed and back to active', async ({ page }) => {
    await page.fill('#noteTitle', 'Note to Toggle');
    await page.fill('#noteContent', 'Content for the note to toggle.');
    await page.click('#noteForm button[type="submit"]');
    await page.waitForTimeout(1000);
    console.log('Note added for toggling');

    let notesContent = await page.innerHTML('#notesContainer');
    console.log('Before Toggle - Notes HTML:', notesContent);

    await page.click('.note:last-child button:has-text("Mark Completed")');
    await page.waitForTimeout(1000);
    const completedNote = await page.$('.note:last-child.completed');
    notesContent = await page.innerHTML('#notesContainer');
    console.log('After Mark Completed - Notes HTML:', notesContent);
    expect(completedNote).toBeTruthy();
    console.log('Note marked as completed');

    await page.click('.note:last-child button:has-text("Mark Active")');
    await page.waitForTimeout(1000);
    const activeNote = await page.$('.note:last-child:not(.completed)');
    notesContent = await page.innerHTML('#notesContainer');
    console.log('After Mark Active - Notes HTML:', notesContent);
    expect(activeNote).toBeTruthy();
    console.log('Note marked back to active');
  });
});
