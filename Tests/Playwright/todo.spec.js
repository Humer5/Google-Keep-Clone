const { test, expect } = require('@playwright/test');

test.describe('ToDo Application', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the ToDo application page
    await page.goto('http://127.0.0.1:5500/Google-Keep-Clone/todo.html');
    console.log('Navigated to ToDo application');
  });

  test('should add a new note', async ({ page }) => {
    await page.waitForSelector('#noteForm', { timeout: 10000 });
    console.log('Form is ready');

    await page.fill('#noteTitle', 'New Note');
    await page.fill('#noteContent', 'This is a new note');
    await page.click('#noteForm button[type="submit"]');
    console.log('Note added');

    // Log current DOM for debugging
    const notesContainerHTML = await page.innerHTML('#notesContainer');
    console.log('Notes Container HTML:', notesContainerHTML);

    // Wait for the new note to render
    try {
      await page.waitForSelector('.note-card', { timeout: 15000 });
    } catch (e) {
      console.error('Note card did not appear within the timeout');
      const debugHTML = await page.content();
      console.log('Full Page HTML for Debugging:', debugHTML);
      throw e;
    }

    const noteTitle = await page.textContent('.note-card h2');
    const noteContent = await page.textContent('.note-card p');
    expect(noteTitle).toBe('New Note');
    expect(noteContent).toBe('This is a new note');
  });

  test('should filter notes', async ({ page }) => {
    await page.fill('#noteTitle', 'Active Note');
    await page.fill('#noteContent', 'This is an active note');
    await page.click('#noteForm button[type="submit"]');
    await page.fill('#noteTitle', 'Completed Note');
    await page.fill('#noteContent', 'This is a completed note');
    await page.click('#noteForm button[type="submit"]');
    console.log('Notes added');

    // Filter by active notes
    await page.click('button[data-filter="active"]');
    console.log('Filtered by active notes');
    await page.waitForSelector('.note-card', { timeout: 10000 });
    const activeNotes = await page.$$('.note-card');
    expect(activeNotes.length).toBeGreaterThan(0);

    // Filter by completed notes
    await page.click('button[data-filter="completed"]');
    console.log('Filtered by completed notes');
    await page.waitForSelector('.note-card', { timeout: 10000 });
    const completedNotes = await page.$$('.note-card');
    expect(completedNotes.length).toBeGreaterThan(0);
  });

  test('should verify note content', async ({ page }) => {
    await page.fill('#noteTitle', 'Verification Note');
    await page.fill('#noteContent', 'This note is for verification');
    await page.click('#noteForm button[type="submit"]');
    console.log('Verification note added');

    // Verify content
    try {
      await page.waitForSelector('.note-card', { timeout: 15000 });
    } catch (e) {
      console.error('Note card did not appear within the timeout');
      const debugHTML = await page.content();
      console.log('Full Page HTML for Debugging:', debugHTML);
      throw e;
    }

    const noteTitle = await page.textContent('.note-card h2');
    const noteContent = await page.textContent('.note-card p');
    expect(noteTitle).toBe('Verification Note');
    expect(noteContent).toBe('This note is for verification');
  });
});
