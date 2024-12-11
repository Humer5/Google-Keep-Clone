let tasks = [];

// Render tasks dynamically
function renderTasks() {
  const taskList = document.getElementById("notesContainer");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "note-card";

    taskDiv.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.content}</p>
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
  } else {
    alert("Please fill in both fields!");
  }
});

// Handle Edit Task
function editTask(index) {
  const newTitle = prompt("Enter new title:", tasks[index].title);
  const newContent = prompt("Enter new content:", tasks[index].content);

  if (newTitle && newContent) {
    tasks[index].title = newTitle;
    tasks[index].content = newContent;
    renderTasks();
  }
}

// Handle Delete Task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Initial render
renderTasks();

