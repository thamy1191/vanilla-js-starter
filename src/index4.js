const deletetarea = async (id) => {
    try {
        
        const response = await fetch('http://localhost:3000/api/task/'+id, {
         method: 'DELETE',
         headers: {
           'Content-Type': 'application/json'
           },
           
        
         });
         const data = await response.json();
      
         console.log(data);
       } catch(error) {
     

          console.log(error)
         } 
  }
  export{deletetarea}