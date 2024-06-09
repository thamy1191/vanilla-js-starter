//aqui se importa las funciones necesarias para interactuar con la API de tarea:

import { fetchtodo } from "./index2";//para obtener la lista desde la API
import { postLlamado } from "./index3";//Agrega una nueva tarea de la API
import { deletetarea } from "./index4";//elimina una tarea de la API
import { postActualizarEstado } from "./index5";//Actualiza el estado de una tarea en la API


//obtiene refenrencia a elementos del DOM
let taskInput = document.getElementById("taskInput");//entrada de la tarea
let addTaskButton = document.getElementById("addTaskButton");// boton para agregar tarea
let tasksContainer = document.getElementById("tasksContainer");//contenedor de tareas
let tasksCompletedCounter = 0; // Contador global de tareas completadas


// Función para actualizar el contador de tareas completadas
  
function updateCompletedTasksCounter(increment) {
    tasksCompletedCounter += increment;
    document.getElementById("completedTasksCounter").innerText = tasksCompletedCounter;
}

// manejadores de eventos para la entrada de tarea

taskInput.addEventListener("keypress", async (e) => {
    if (e.key === "Enter" && taskInput.value !== "") {
        await postLlamado(taskInput.value);
        yaEsTiempo();
    }
    if (e.key === "Enter" && taskInput.value === "") {
        alert("No hay datos");
    }
});
 // Manejador de eventos para el botón de agregar tarea
addTaskButton.addEventListener("click", function (e) {
    if (e.type=== "click") {
        if(taskInput.value === "")
             
            alert("No hay datos");
           // Evitar que se ejecute la acción predeterminada si el campo está vacío
        
    } else {
        // Aquí puedes ejecutar la lógica que necesites cuando hay datos en el campo de entrada de tarea
        postLlamado(); // Por ejemplo, agregar la tarea
        yaEsTiempo(); // Llamar a la función para actualizar la lista de tareas
    }
});
/*Función asíncrona para actualizar la lista de tareas y mostrarlas en la interfaz de usuario.
 * Obtiene las tareas desde la API y las muestra en el contenedor de tareas.
* Además, maneja eventos de eliminación y marcado de tareas como completadas.
*/
async function yaEsTiempo() {
    try {
        //obtiene la lista de tarea desde la API
        let datos = await fetchtodo();
        console.log(datos);
        // Limpiar el contenedor de tareas antes de agregar las nuevas
        tasksContainer.innerHTML = ''; 
        // Reiniciar el contador de tareas completada
        tasksCompletedCounter = 0; 
        
       // Verificar si no hay tareas disponibles
        if (datos.length === 0) {
            tasksContainer.innerText = "No existen tareas";
            return;
        }
      // Itera sobre cada tarea y la muestra en la interfaz de usuario
        datos.forEach(async (dato) => {
            let p = document.createElement("p");
            p.innerHTML = dato.task;
            p.id = dato.id;
            console.log(p);
            tasksContainer.appendChild(p);

       // Crea un checkbox para marcar la tarea como completada
            const selectcheckbox = document.createElement("input");
            selectcheckbox.type = "checkbox";
            selectcheckbox.classList.add("completada-checkbox");
            selectcheckbox.id  = "completada_" + dato.id ;
            selectcheckbox.checked = dato.completed; // Marcar como completada si la tarea ya está completada

            // Función para actualizar el estado de la tarea en la API
            function actualizar(taskId, isChecked) {
                console.log("Checkbox seleccionado", taskId);
                postActualizarEstado(taskId, isChecked); // Suponiendo que hay una función postActualizarEstado en index5 que actualiza el estado de la tarea
                if (isChecked) {
                    updateCompletedTasksCounter(1); // Incrementar el contador si la tarea se marca como completada
                } else {
                    updateCompletedTasksCounter(-1); // Decrementar el contador si la tarea se desmarca como completada
                }
            }

            // Evento de cambio para el checkbox
            selectcheckbox.addEventListener('change', function () {
                actualizar(dato.id, this.checked);
            });

            tasksContainer.appendChild(selectcheckbox);


            // Crea un botón para eliminar la tarea
            const agregarBoton = document.createElement("button");
            agregarBoton.innerText = "eliminar";
           agregarBoton .classList.add("eliminar-btn");
            agregarBoton.id = "eliminar_" + dato.id;
            
            tasksContainer.appendChild(agregarBoton);
           
          // Manejador de eventos para el botón de eliminar
            agregarBoton.addEventListener("click", function () {
                console.log(p.id);
                deletetarea(p.id);
                p.parentNode.removeChild(p);
                agregarBoton.parentNode.removeChild(agregarBoton);
                selectcheckbox.parentNode.removeChild(selectcheckbox);
                updateCompletedTasksCounter(-1); // Decrementar el contador si se elimina una tarea
            });

            // Incrementar el contador si la tarea está completada
            if (dato.completed) {
                updateCompletedTasksCounter(1);
            }
        });
    } catch (error) {

        console.error("Error al obtener los datos:", error);
    }
}

// Llama a la función yaEsTiempo para cargar las tareas al inicio
yaEsTiempo();

// Evento para agregar una nueva tarea
addTaskButton.addEventListener("click", function () {
    postLlamado(taskInput.value);
    // Vuelve a cargar las tareas después de agregar una nueva tarea
    yaEsTiempo();
});



