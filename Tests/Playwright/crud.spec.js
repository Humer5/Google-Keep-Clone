// Import Playwright test utilities
const { test, expect } = require('@playwright/test');

test.describe('Task Management App', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app's page
    await page.goto('http://127.0.0.1:5500/Google-Keep-Clone/Crud.html'); // Replace with your app's URL
  });

  test('should add a new task', async ({ page }) => {
    // Fill in the task title and content
    await page.fill('#taskTitle', 'Test Task');
    await page.fill('#taskContent', 'This is a test task content.');

    // Submit the form
    await page.click('#task-form button[type="submit"]');

    // Check if the task is added
    const taskTitle = await page.locator('.note-card input').nth(0).inputValue();
    const taskContent = await page.locator('.note-card textarea').nth(0).inputValue();

    expect(taskTitle).toBe('Test Task');
    expect(taskContent).toBe('This is a test task content.');
  });

  test('should edit an existing task', async ({ page }) => {
    // Add a task first
    await page.fill('#taskTitle', 'Initial Task');
    await page.fill('#taskContent', 'Initial content.');
    await page.click('#task-form button[type="submit"]');

    // Edit the task
    await page.click('.note-card .actions button:nth-child(1)'); // Click "Edit" button
    const inputField = page.locator('.note-card input');
    const textareaField = page.locator('.note-card textarea');

    // Update fields
    await inputField.fill('Updated Task Title');
    await textareaField.fill('Updated content.');

    // Dispatch events to trigger updates
    await inputField.dispatchEvent('input');
    await textareaField.dispatchEvent('input');
    await textareaField.dispatchEvent('blur'); // Simulate losing focus

    // Add a short wait to allow the DOM to update
    await page.waitForTimeout(100);

    // Verify updated content
    await expect.poll(() => inputField.inputValue()).toBe('Updated Task Title');
    await expect.poll(() => textareaField.inputValue()).toBe('Updated content.');
  });

  test('should delete a task', async ({ page }) => {
    // Add a task first
    await page.fill('#taskTitle', 'Task to Delete');
    await page.fill('#taskContent', 'Content of task to delete.');
    await page.click('#task-form button[type="submit"]');

    // Delete the task
    await page.click('.note-card .actions button:nth-child(2)'); // Click "Delete" button

    // Verify the task is removed
    const tasks = await page.locator('.note-card').count();
    expect(tasks).toBe(0);
  });

  test('should not add a task if fields are empty', async ({ page }) => {
    // Handle dialog
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Please fill in both fields!');
      await dialog.dismiss();
    });

    // Submit the form without filling fields
    await page.click('#task-form button[type="submit"]');
  });
});
