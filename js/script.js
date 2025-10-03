document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const taskInput = document.getElementById("task-input");
  const dateInput = document.getElementById("date-input");
  const todoList = document.getElementById("todo-list");
  const filterSelect = document.getElementById("filter-select");
  const errorMessage = document.getElementById("error-message");

  todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    const taskDate = dateInput.value;

    if (taskText === "" || taskDate === "") {
      errorMessage.textContent = "⚠️ Harap isi Tugas dan Tanggal.";
      errorMessage.classList.remove("hidden");
      return;
    }

    errorMessage.classList.add("hidden");
    addTask(taskText, taskDate);

    taskInput.value = "";
    dateInput.value = "";
  });

  function addTask(text, date) {
    const listItem = document.createElement("li");
    listItem.classList.add("todo-item");
    listItem.setAttribute("data-status", "pending");

    listItem.innerHTML = `
            <div class="task-details">
                <span class="task-text">${text}</span>
                <span class="task-date">(${date})</span>
            </div>
            <div class="actions">
                <button class="complete-btn">Selesai</button>
                <button class="delete-btn">Hapus</button>
            </div>
        `;

    todoList.appendChild(listItem);
  }

  todoList.addEventListener("click", function (e) {
    const item = e.target.closest("li");
    if (!item) return;

    if (e.target.classList.contains("delete-btn")) {
      if (confirm("Yakin ingin menghapus tugas ini?")) {
        item.remove();
      }
    }

    if (e.target.classList.contains("complete-btn")) {
      const currentStatus = item.getAttribute("data-status");
      if (currentStatus === "pending") {
        item.setAttribute("data-status", "completed");
        item.classList.add("completed");
        e.target.textContent = "Pending";
      } else {
        item.setAttribute("data-status", "pending");
        item.classList.remove("completed");
        e.target.textContent = "Selesai";
      }

      applyFilter();
    }
  });

  filterSelect.addEventListener("change", applyFilter);

  function applyFilter() {
    const filterValue = filterSelect.value;
    const tasks = todoList.querySelectorAll("li.todo-item");

    tasks.forEach((task) => {
      const status = task.getAttribute("data-status");

      if (filterValue === "all" || filterValue === status) {
        task.style.display = "flex";
      } else {
        task.style.display = "none";
      }
    });
  }
});
