const { test, expect } = require('@playwright/test');

test.describe('Image Branch', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the image branch application page
    await page.goto('http://127.0.0.1:5500/Google-Keep-Clone/ImageOp.html'); // Replace with your actual file path
    console.log('Navigated to Image branch application');
  });

  test('should add a new image note', async ({ page }) => {
    // Wait for the form to be ready
    await page.waitForSelector('#imageForm', { timeout: 10000 });
    console.log('Form is ready');

    // Fill in the image form and submit
    await page.fill('#noteTitle', 'New Image Note');
    await page.fill('#noteDescription', 'This is a description for the new image note');
    const filePath = 'C:\\Users\\humer\\OneDrive\\Desktop\\Clone App\\Google-Keep-Clone\\Screenshot1.png'; // Replace with your actual file path
    await page.setInputFiles('#imageInput', filePath);
    await page.click('#addNoteButton');
    console.log('Image note added');

    // Verify the new image note appears in the notes list
    await page.waitForSelector('.note-card', { timeout: 10000 });
    const noteTitle = await page.textContent('.note-card h3'); // Adjust selector as needed
    const noteDescription = await page.textContent('.note-card p'); // Adjust selector as needed
    expect(noteTitle).toBe('New Image Note');
    expect(noteDescription).toBe('This is a description for the new image note');
  });

  test('should view an image in the modal', async ({ page }) => {
    // Add an image note
    await page.fill('#noteTitle', 'View Image Note');
    await page.fill('#noteDescription', 'This note is for viewing the image');
    const filePath = 'C:\\Users\\humer\\OneDrive\\Desktop\\Clone App\\Google-Keep-Clone\\Screenshot1.png'; // Replace with your actual file path
    await page.setInputFiles('#imageInput', filePath);
    await page.click('#addNoteButton');
    await page.waitForSelector('.note-card', { timeout: 10000 });
    console.log('Image note added for viewing');

    // Click on the image to view it in the modal
    await page.click('.note-card img'); // Adjust selector as needed
    console.log('Image clicked to view');

    // Verify the image is displayed in the modal
    const modal = await page.waitForSelector('.modal', { timeout: 10000 });
    expect(modal).toBeTruthy();
    const displayedImage = await page.isVisible('#modalImage');
    expect(displayedImage).toBe(true);
  });

  test('should delete an image note', async ({ page }) => {
    // Add an image note
    await page.fill('#noteTitle', 'Delete Image Note');
    await page.fill('#noteDescription', 'This note is for deletion');
    const filePath = 'C:\\Users\\humer\\OneDrive\\Desktop\\Clone App\\Google-Keep-Clone\\Screenshot1.png'; // Replace with your actual file path
    await page.setInputFiles('#imageInput', filePath);
    await page.click('#addNoteButton');
    await page.waitForSelector('.note-card', { timeout: 10000 });
    console.log('Image note added for deletion');

    // Click on the delete button
    await page.click('.note-card .actions button:has-text("Delete")'); // Adjust selector as needed
    console.log('Delete button clicked');

    // Verify the image note is deleted
    const notesRemaining = await page.$$('.note-card');
    expect(notesRemaining.length).toBe(0);
  });
});
