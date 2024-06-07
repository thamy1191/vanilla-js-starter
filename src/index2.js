async function fetchtodo() {
    try { 
      const response = await fetch('http://localhost:3000/api/task');
      const data = await response.json(); 

      return data
    } catch (error) { 
     console.log(error);
    }
};

export {fetchtodo}