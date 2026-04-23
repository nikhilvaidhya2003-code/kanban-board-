let taskId = 0;

// Add new task
function addTask(columnId) {
  const taskText = prompt("Enter task:");
  if (!taskText) return;

  const task = document.createElement("div");
  task.className = "task";
  task.id = "task-" + taskId++;
  task.draggable = true;
  task.innerText = taskText;

  task.ondragstart = drag;

  document.querySelector(`#${columnId} .task-list`).appendChild(task);
}

// Drag start
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

// Allow drop
function allowDrop(event) {
  event.preventDefault();
}

// Drop task
function drop(event) {
  event.preventDefault();
  const taskId = event.dataTransfer.getData("text");
  const task = document.getElementById(taskId);

  if (event.target.classList.contains("task-list")) {
    event.target.appendChild(task);
  } else if (event.target.classList.contains("column")) {
    event.target.querySelector(".task-list").appendChild(task);
  }
}
