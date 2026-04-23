let taskId = 0;

// Add task from input
function addTask(button) {
  const input = button.previousElementSibling;
  const text = input.value.trim();

  if (!text) return;

  const task = document.createElement("div");
  task.className = "task";
  task.id = "task-" + taskId++;
  task.draggable = true;
  task.innerText = text;

  task.ondragstart = drag;

  const column = button.closest(".column");
  column.querySelector(".task-list").appendChild(task);

  input.value = "";
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
  const id = event.dataTransfer.getData("text");
  const task = document.getElementById(id);

  if (event.target.classList.contains("task-list")) {
    event.target.appendChild(task);
  } else if (event.target.closest(".column")) {
    event.target.closest(".column").querySelector(".task-list").appendChild(task);
  }
}
