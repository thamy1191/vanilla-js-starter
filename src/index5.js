async function postActualizarEstado(taskId, isChecked) {
  try {
    const status = isChecked ? "completada" : "incompleto";
      // Realiza una solicitud PATCH a la API para actualizar el estado de la tarea
      const response = await fetch(`http://localhost:3000/api/task/${taskId}`, {
          method: 'PUT', // Utiliza el método PATCH para actualizar una parte de la tarea
          headers: {
              'Content-Type': 'application/json' // Especifica el tipo de contenido como JSON
          },
          body: JSON.stringify({ // Convierte los datos a formato JSON
            status : isChecked ?"completada" : "incompleto"// Envía el estado del checkbox como completada: true/false
          })
      });

      // Verifica si la solicitud fue exitosa
      if (!response.ok) {
          throw new Error('No se pudo actualizar el estado de la tarea');
      }

      // Devuelve la respuesta en caso de que necesites manejarla en otro lugar
      return await response.json();
  } catch (error) {
      console.error('Error al actualizar el estado de la tarea:', error);
      throw error; // Propaga el error para manejarlo en el código que llama a esta función
  }
}
export{postActualizarEstado}