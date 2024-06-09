async function postActualizarEstado(taskId, isChecked) {
  try {
    
      
      const response = await fetch(`http://localhost:3000/api/task/${taskId}`, {
          method: 'PUT', // Utiliza el método PATCH para actualizar una parte de la tarea
          headers: {
              'Content-Type': 'application/json' 
          },
          body: JSON.stringify({ 
            status : isChecked ?"completada" : "incompleto"// Envía el estado del checkbox como completada: true/false
          })
      });

      
      if (!response.ok) {
          throw new Error('No se pudo actualizar el estado de la tarea');
      }

      
  } catch (error) {
      console.error('Error al actualizar el estado de la tarea:', error);
      throw error; 
  }
}
export{postActualizarEstado}