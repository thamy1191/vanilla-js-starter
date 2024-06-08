import { fetchtodo } from "./index2";
import { postLlamado } from "./index3";
import {deletetarea} from "./index4";
import {postActualizarEstado } from "./index5";

let taskInput =document.getElementById("taskInput")
let container = document.getElementById("container")
let addTaskButton= document.getElementById("addTaskButton")
let tasksContainer= document.getElementById("tasksContainer")




 // addTaskButton.addEventListener("click",alert);
  taskInput.addEventListener("keypress",(e) =>{
    if (e.key === "Enter" && taskInput.value !="") {
       console.log("aqui vamos")
        postLlamado(taskInput.value)
        yaEsTiempo();
    }
        if(e.key === "Enter" && taskInput.value ==""){
         alert("no hay datos")
    }
     })
    
addTaskButton.addEventListener("click",function (){

       if( taskInput.value !="" &&  addTaskButton.value !="" && tasksContainer.value !="" ){
        alert( taskInput.value )

       }
     })


  
  
     async function yaEsTiempo() {
      try {
          let datos = await fetchtodo();
  
          console.log(datos)
          datos.forEach(async (dato) => {
              let p = document.createElement("p");
              p.innerHTML = dato.task;
              p.id = dato.id;
              console.log(p);
              tasksContainer.appendChild(p);
  
              const selectcheckbox = document.createElement("input");
              selectcheckbox.type = "checkbox";
              selectcheckbox.id = "completada_" + dato.id;
  
              // Función para actualizar el estado de la tarea en la API
              function actualizar(taskId, isChecked) {
                  console.log("Checkbox seleccionado", taskId);
                  postActualizarEstado(taskId, isChecked); // Suponiendo que hay una función postActualizarEstado en index5 que actualiza el estado de la tarea
              }
  
              // Evento de cambio para el checkbox
              selectcheckbox.addEventListener('change', function() {
                  actualizar(dato.id, this.checked);
              });
  
              tasksContainer.appendChild(selectcheckbox);
  
              const agregarBoton = document.createElement("button");
              agregarBoton.innerText = "eliminar";
              agregarBoton.id = "eliminar_" + dato.id;
              tasksContainer.appendChild(agregarBoton);
  
              agregarBoton.addEventListener("click", function() {
                  console.log(p.id);
                  deletetarea(p.id);
                  p.parentNode.removeChild(p);
                  agregarBoton.parentNode.removeChild(agregarBoton);
                  selectcheckbox.parentNode.removeChild(selectcheckbox);
              });
          });
      } catch (error) {
          console.error("Error al obtener los datos:", error);
      }
  }
  
  // Llama a la función yaEsTiempo para cargar las tareas al inicio
  yaEsTiempo();
  
  // Evento para agregar una nueva tarea
  addTaskButton.addEventListener("click", function() {
      postLlamado(taskInput.value);
      // Vuelve a cargar las tareas después de agregar una nueva tarea
      yaEsTiempo();
  });

















