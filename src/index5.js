const checkbox= async (id) => {
    try {
        
        const response = await fetch('http://localhost:3000/api/task/'+id, {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json'
           },
           body: JSON.stringify({
     
            task: tarea,
            status: "Completo"
        
           })
           
        
         });
         const data = await response.json();
      
         console.log(data);
       } catch(error) {
     

          console.log(error)
         } 
  }
  export{checkbox}