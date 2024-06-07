import { fetchtodo } from "./index2";
import { postLlamado } from "./index3";
import {deletetarea } from "./index4";

// Inserte el código aquí
let taskInput =document.getElementById("taskInput")
let container = document.getElementById("container")
let addTaskButton= document.getElementById("addTaskButton")
let tasksContainer= document.getElementById("tasksContainer")




  addTaskButton.addEventListener("click",alert);
  taskInput.addEventListener("keypress",(e) =>{
    if (e.key === "Enter" && addTaskButton !="") {
       console.log("aqui vamos")
      postLlamado(taskInput.value)
      yaEsTiempo();
    }
    else{
      alert("no hay datos")
    }
    })
    



addTaskButton.addEventListener("click",function (){

  if( taskInput.value !="" &&  addTaskButton.value !="" && tasksContainer.value !="" ){
    alert( taskInput.value )
    const data={
      taskInput     :  taskInput.value ,
      addTaskButton :  addTaskButton.value ,
      tasksContainer: tasksContainer.value,

       }
    }
  })
async function yaEsTiempo() {//promesa realiza
  try {
    let datos = await fetchtodo();

    console.log(datos)
     datos.forEach(async (dato) => {
      let p = document.createElement("p");
      p.innerHTML = dato.task;
      p.id=dato.id



    console.log(p);
      tasksContainer.appendChild(p);
      const  selectcheckbox = document.createElement("input");

      
 selectcheckbox.type = "checkbox"//boton checkox
 selectcheckbox.id = "seleccionar "
 selectcheckbox.onclick = () => actualizar( selectcheckbox)
 tasksContainer.appendChild(selectcheckbox)


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
  selectcheckbox.parentNode.removeChild( selectcheckbox)


  });
 


 })


  } catch (error) {
    console.error("Error al obtener los datos:", error);

  }
}
yaEsTiempo();



addTaskButton.addEventListener("click", function () {
  //botn agregar

  let p= document.createElement("p")
  p.innerHTML=taskInput.value  
  console.log(p)
  tasksContainer .appendChild(p)
  postLlamado(taskInput.value)


  
})




















