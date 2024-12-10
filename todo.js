document.getElementById('todoForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const taskText = document.getElementById('todoInput').value;
    const taskList = document.getElementById('todoList');

    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        taskItem.remove();
    });

    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    document.getElementById('todoForm').reset();
});
