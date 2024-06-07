const postLlamado = async (tarea) => {
    try {
        
        const response = await fetch('http://localhost:3000/api/task', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
           },
           body: JSON.stringify({
     
             task: tarea,
             status: "Incompleto"
         
            })
         });
         const data = await response.json();
      
         console.log(data);
       } catch(error) {
     

          console.log(error)
         } 
  }
  export {postLlamado}