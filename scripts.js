if (!localStorage.getItem("isLoggedIn")) {
  window.location.href = "login.html";
}

document
  .getElementById("todo-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const todoInput = document.getElementById("todo-input");
    if (todoInput.value.trim() !== "") {
      addTask(todoInput.value.trim());
      todoInput.value = "";
    }
  });

let currentEditingTaskId;

function addTask(task) {
  fetch("http://127.0.0.1:5005/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: task }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      getTasks();
    })
    .catch((error) => console.error("Error:", error));
}

function getTasks() {
  fetch("http://127.0.0.1:5005/tasks")
    .then((response) => response.json())
    .then((tasks) => {
      const list = document.getElementById("todo-list");
      list.innerHTML = "";
      tasks.forEach((task) => {
        const listItem = document.createElement("li");
        listItem.textContent = task.title;
        if (task.completed) {
          listItem.style.textDecoration = "line-through";
        }

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Completed" : "Complete";
        completeButton.onclick = () => toggleCompleteTask(task.id);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteTask(task.id);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = () => openEditForm(task.id);

        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);
        list.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error:", error));
}

window.onload = getTasks;

function openEditForm(taskId) {
  currentEditingTaskId = taskId;
  document.getElementById("edit-task-input").value = "";
  document.getElementById("edit-task-container").style.display = "block";
}

function updateTask() {
  const taskTitle = document.getElementById("edit-task-input").value.trim();
  if (taskTitle !== "") {
    fetch(`http://127.0.0.1:5005/tasks/${currentEditingTaskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: taskTitle }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        closeEditForm();
        getTasks();
      })
      .catch((error) => console.error("Error:", error));
  }
}

function closeEditForm() {
  document.getElementById("edit-task-container").style.display = "none";
}

function toggleCompleteTask(taskId) {
  fetch(`http://127.0.0.1:5005/tasks/${taskId}/complete`, {
    method: "PUT",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      getTasks();
    })
    .catch((error) => console.error("Error:", error));
}

function deleteTask(taskId) {
  fetch(`http://127.0.0.1:5005/tasks/${taskId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      getTasks();
    })
    .catch((error) => console.error("Error:", error));
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html"; // Redirect to login page
}

document.getElementById("logout-btn").addEventListener("click", logout);

function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const logoutBtn = document.getElementById("logout-btn");

  if (isLoggedIn) {
    logoutBtn.style.display = "block";
  } else {
    logoutBtn.style.display = "none";
  }
}

checkLoginStatus();
