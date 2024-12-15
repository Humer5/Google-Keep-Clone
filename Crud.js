let tasks = [];

// Render tasks dynamically
function renderTasks() {
  const taskList = document.getElementById("notesContainer");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "note-card";

    taskDiv.innerHTML = `
      <input type="text" value="${task.title}" onchange="updateTaskTitle(${index}, this.value)" />
      <textarea onchange="updateTaskContent(${index}, this.value)">${task.content}</textarea>
      <div class="actions">
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    taskList.appendChild(taskDiv);
  });
}

// Handle Add Task
document.getElementById("task-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("taskTitle").value.trim();
  const content = document.getElementById("taskContent").value.trim();

  if (title && content) {
    const task = { title, content };
    tasks.push(task);
    renderTasks();
    e.target.reset();
    console.log('Task added:', task);
  } else {
    alert("Please fill in both fields!");
  }
});

// // Handle Edit Task
// function editTask(index) {
//   const taskDiv = document.querySelectorAll('.note-card')[index];
//   const inputTitle = taskDiv.querySelector('input');
//   const textareaContent = taskDiv.querySelector('textarea');
//   inputTitle.removeAttribute('readonly');
//   textareaContent.removeAttribute('readonly');
//   inputTitle.focus();
// }

// Update Task Title Inline
function updateTaskTitle(index, newTitle) {
  console.log('Updating task title:', index, newTitle);
  tasks[index].title = newTitle;
  renderTasks();
}

// Update Task Content Inline
function updateTaskContent(index, newContent) {
  console.log('Updating task content:', index, newContent);
  tasks[index].content = newContent;
  renderTasks();
}

// Handle Delete Task
function deleteTask(index) {
  tasks.splice(index, 1);
  console.log('Task deleted:', index);
  renderTasks();
}

// Initial render
renderTasks();
