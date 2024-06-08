import { fetchtodo } from "./index2";
import { postLlamado } from "./index3";
import { deletetarea } from "./index4";
import { checkbox } from "index5";

let taskInput = document.getElementById("taskInput");
let container = document.getElementById("container");
let addTaskButton = document.getElementById("addTaskButton");
let tasksContainer = document.getElementById("tasksContainer");

// Event listener para enviar la tarea al presionar Enter
taskInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter" && taskInput.value !== "") {
    postLlamado(taskInput.value);
    await yaEsTiempo();
  }
  if (e.key === "Enter" && taskInput.value === "") {
    alert("No hay datos");
  }
});

// Event listener para agregar tarea al hacer clic en el botón
addTaskButton.addEventListener("click", async () => {
  if (taskInput.value !== "") {
    postLlamado(taskInput.value);
    await yaEsTiempo();
  } else {
    alert("No hay datos");
  }
});

async function yaEsTiempo() {
  try {
    let datos = await fetchtodo();
    console.log(datos);
    tasksContainer.innerHTML = ''; // Limpiar contenedor antes de agregar tareas

    datos.forEach((dato) => {
      let taskElement = document.createElement("div");
      taskElement.id = dato.id;
      
      let p = document.createElement("p");
      p.innerHTML = dato.task;

      let selectCheckbox = document.createElement("input");
      selectCheckbox.type = "checkbox";
      selectCheckbox.checked = dato.completed; // Marcar checkbox si la tarea está completada
      selectCheckbox.addEventListener("change", async () => {
        await actualizarEstado(dato.id, !dato.completed);

      });

      const agregarBoton = document.createElement("button")//botnon eliminar
      agregarBoton.innerText="eliminar"
      agregarBoton.id ="eliminar"
      tasksContainer.appendChild(agregarBoton)
      p.id=dato.id
      agregarBoton.addEventListener("click", function() {
      console.log(p.id)
      deletetarea( p.id )
      p.parentNode.removeChild(p);
     agregarBoton.parentNode.removeChild(agregarBoton);
     selectcheckbox.parentNode.removeChild( selectCheckbox)
  });
      let deleteButton = document.createElement("button");
      deleteButton.innerText = "Eliminar";
      deleteButton.addEventListener("click", async () => {
        await eliminarTarea(dato.id);
      });

      taskElement.appendChild(p);
      taskElement.appendChild(selectCheckbox);
      taskElement.appendChild(deleteButton);
      tasksContainer.appendChild(taskElement);
    });
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}



async function eliminarTarea(id) {
  try {
    // Realizar el DELETE request para eliminar la tarea
    await deletetarea(id);
    console.log("Tarea eliminada correctamente de la base de datos");
    await yaEsTiempo(); // Actualizar la lista de tareas después de eliminar
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
  }
}

// Llamar a yaEsTiempo al cargar la página para mostrar las tareas existentes
yaEsTiempo();
 

addTaskButton.addEventListener("click", function () {

  postLlamado(taskInput.value)
  yaEsTiempo();

  
  
})
checkbox()





















