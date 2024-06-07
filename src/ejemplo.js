import { fetchtodo } from "./index2";
import { postLlamado } from "./index3";
import { deletetarea } from "./index4";

// Elementos del DOM
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const tasksContainer = document.getElementById("tasksContainer");
const completedTasksCounter = document.getElementById("completedTasksCounter");

// Variable para contar tareas realizadas
let completedTasksCount = 0;

// Función para agregar una tarea
function addTask() {
  const taskValue = taskInput.value.trim();

  if (taskValue !== "") {
    postLlamado(taskValue); // Enviar la tarea al servidor

    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const taskText = document.createElement("span");
    taskText.textContent = taskValue;
    taskElement.appendChild(taskText);

    const completeCheckbox = document.createElement("input");
    completeCheckbox.type = "checkbox";
    completeCheckbox.addEventListener("change", () => {
      if (completeCheckbox.checked) {
        completeTask(taskElement);
      } else {
        uncompleteTask(taskElement);
      }
    });
    taskElement.appendChild(completeCheckbox);

    tasksContainer.appendChild(taskElement);

    taskInput.value = ""; // Limpiar el campo de entrada
  } else {
    alert("Por favor, introduce una tarea válida.");
  }
}

// Función para completar una tarea
function completeTask(taskElement) {
  taskElement.classList.add("completed");
  completedTasksCount++;
  updateCompletedTasksCounter();
}

// Función para desmarcar una tarea completada
function uncompleteTask(taskElement) {
  taskElement.classList.remove("completed");
  completedTasksCount--;
  updateCompletedTasksCounter();
}

// Función para actualizar el contador de tareas completadas
function updateCompletedTasksCounter() {
  completedTasksCounter.textContent = `Tareas completadas: ${completedTasksCount}`;
}

// Función para eliminar una tarea
function deleteTask(taskElement) {
  const taskId = taskElement.dataset.id;

  if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
    deletetarea(taskId); // Eliminar la tarea del servidor
    if (taskElement.classList.contains("completed")) {
      completedTasksCount--;
    }
    taskElement.remove();
    updateCompletedTasksCounter();
  }
}

// Eventos
addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Cargar tareas existentes al cargar la página
window.addEventListener("load", async () => {
  try {
    const tasks = await fetchtodo();

    tasks.forEach((task) => {
      const taskElement = document.createElement("div");
      taskElement.classList.add("task");
      taskElement.dataset.id = task.id;

      const taskText = document.createElement("span");
      taskText.textContent = task.task;
      taskElement.appendChild(taskText);

      const completeCheckbox = document.createElement("input");
      completeCheckbox.type = "checkbox";
      completeCheckbox.addEventListener("change", () => {
        if (completeCheckbox.checked) {
          completeTask(taskElement);
        } else {
          uncompleteTask(taskElement);
        }
      });
      taskElement.appendChild(completeCheckbox);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.addEventListener("click", () => {
        deleteTask(taskElement);
      });
      taskElement.appendChild(deleteButton);

      tasksContainer.appendChild(taskElement);

      if (task.completed) {
        completeCheckbox.checked = true;
        completeTask(taskElement);
      }
    });
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
  }
});