let recipeForm = document.getElementById('recipe-form');

let recipeName = document.getElementById('recipe-name');
let ingredients = document.getElementById('ingredients');
let steps = document.getElementById('steps');

let displayArea = document.getElementById('display-area');
let imageUrl = document.getElementById("imageUrl")




recipeForm.addEventListener('submit', function(event) {
    event.preventDefault();

    let enteredRecipeName = recipeName.value;
    let enteredIngredients = ingredients.value;
    let enteredSteps = steps.value;
    let enteredImageURL = imageUrl.value;

    let ingredientArr = enteredIngredients.split(",");

    let newRecipe = {
        name: enteredRecipeName,
        ingredients: ingredientArr,
        steps: enteredSteps,
        imageUrl:enteredImageURL
    };

    //recipes.push(newRecipe);   
    

    addRecipe(newRecipe)
    alert(`The ${newRecipe.name} has been added successfully `)
     

    enteredRecipeName = "";
    enteredIngredients = "";
    enteredSteps = "";
    enteredImageURL = ""


});


async function fetchRecipes(){
        
    let response = await fetch("http://127.0.0.1:8000/recipes")
    recipes = await response.json()
    console.log(recipes)
    recipes.forEach((recipe,index) => displayRecipe(recipe, index));
    

}


window.addEventListener('load', function() {
    
    try{

        fetchRecipes()
        
    }
      
    catch(error){

        console.error("Error", error.message)

    }
     

});



function displayRecipe(recipe, index) {
    // create a div for the new recipe
    let recipeDiv = document.createElement('div');
     
     
    

    // add more code here to include the recipe info
    recipeDiv.innerHTML = `<h2>${recipe.name} </h2>` ;
    if (recipe.imageUrl !== ""){
        recipeDiv.innerHTML += `<img src= ${recipe.imageUrl} height=200px,width=300px/> <br>`

    }else{
      recipeDiv.innerHTML += ` <h3>No Image </h3><br>`

    }
    
    recipeDiv.innerHTML += `<h3>${recipe.ingredients} </h3>`;
    if (recipe.steps !== undefined  )
            {
    recipeDiv.innerHTML += `<h4>${recipe.steps} </h4>` ;

            }    
    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    
    let editButton = document.createElement('button')
    editButton.textContent = "Edit"
    
     

    deleteButton.onclick = function() {

        const id = recipe.id;
        deleteRecipe(id);

    };

    const id = recipe.id;

    editButton.onclick= function(){

        localStorage.setItem("id", id);
        window.location.href = 'edit-form.html?data=' + encodeURIComponent(id);

    }

    recipeDiv.appendChild(editButton);

    recipeDiv.appendChild(deleteButton);
    // add the new recipe div to the display area
    displayArea.appendChild(recipeDiv);
     
}


async function addRecipe(recipe){
try{

    let response = await fetch("http://127.0.0.1:8000/recipes",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recipe),

    })

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

    let newRecipe = recipe.json()

    displayRecipe(newRecipe)
    alert(`The recipe ${newRecipe} has been added !`)

    console.log(`The recipe ${newRecipe} has been added !`)

}


catch(error){

    console.error("Error",error.message)

}

finally{

    console.log("The data has been successfully posted !")
    
}
}


//Function to delete operation
 const  deleteRecipeFetch = async(recipeId)=>{
    try {
        const response = await fetch(`http://127.0.0.1:8000/recipes/${recipeId}`, {
          method: 'DELETE',
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    alert(`The recipe  has been successfully deleted !`)

}
catch(error){
    console.error("Error",error.message)
}
 }
 


function deleteRecipe(id) {
    // Remove recipe from the array recipes
    
     
    //recipes.splice(index, 1);
    deleteRecipeFetch(id)

    // Refresh the Display
    displayArea.innerHTML = ""; 
    
    recipes.forEach((item, i)=>{
   
        displayRecipe(item,i)

    });

    //localStorage.setItem('recipes', JSON.stringify(recipes));

}



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
    


       
      // Example usage
      // notifyError("This is an error message!");
      