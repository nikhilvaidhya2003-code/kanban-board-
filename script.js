let draggedTask = null;

// Add task
function addTask(button) {
  const input = button.previousElementSibling;
  const text = input.value.trim();
  if (!text) return;

  const task = createTask(text);
  button.closest(".column").querySelector(".task-list").appendChild(task);

  input.value = "";
}

// Create task element
function createTask(text) {
  const task = document.createElement("div");
  task.className = "task";
  task.innerText = text;
  task.draggable = true;

  task.addEventListener("dragstart", () => {
    draggedTask = task;
    task.classList.add("dragging");
  });

  task.addEventListener("dragend", () => {
    draggedTask.classList.remove("dragging");
    draggedTask = null;
    removeHighlights();
  });

  return task;
}

// Allow drop
document.querySelectorAll(".task-list").forEach(list => {
  list.addEventListener("dragover", e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(list, e.clientY);
    const dragging = document.querySelector(".dragging");

    if (afterElement == null) {
      list.appendChild(dragging);
    } else {
      list.insertBefore(dragging, afterElement);
    }

    highlight(list);
  });

  list.addEventListener("dragleave", () => {
    list.classList.remove("highlight");
  });

  list.addEventListener("drop", () => {
    list.classList.remove("highlight");
  });
});

// Highlight column
function highlight(element) {
  removeHighlights();
  element.classList.add("highlight");
}

function removeHighlights() {
  document.querySelectorAll(".task-list").forEach(el => {
    el.classList.remove("highlight");
  });
}

// Find position for smooth placement
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".task:not(.dragging)")];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;

    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}
