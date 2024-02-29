// Retrieve recipe name from URL query parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const recipeId = urlParams.get('id');
const recipeName = urlParams.get('name');


// Set the recipe name as the value of the input field
document.getElementById('edit-recipe-name').value = recipeName;

// Display the recipe name within the label
document.getElementById('recipe-name-label').innerHTML = `<strong>${recipeName.toUpperCase()}</strong>`;



async function closeForm(){
    let id = localStorage.getItem("id");

    let editedRecipe = {

      name: document.getElementById('edit-recipe-name').value,
      ingredients: document.getElementById('edit-ingredients').value.split(','),
      steps: document.getElementById('edit-steps').value,
      

    };

    try {
        const apiURL = `http://127.0.0.1:8000/recipes/${id}`;
        const response = await fetch(apiURL, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedRecipe)
    });
    if (response.ok) {
      
     console.log("The data has been fetched-")
     window.location.href = "recipes.html";
     alert("The Recipe has been updated successfully !")

    }  
    else{
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } 

  catch (error) {
   //notifyError("Error updating recipe");
    

   //notifyError("Server is not working properly "+error.message)
    console.error("Error:", error.message);

  }
    };
  

