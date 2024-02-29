// Retrieve recipe name from URL query parameter
 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const recipeId = urlParams.get('id');
const recipeName = urlParams.get('name');
const recipeImage = urlParams.get("image");
const ingredients = urlParams.get("ingredients")
const steps = urlParams.get("steps")

// Set the recipe name as the value of the input field
document.getElementById('edit-recipe-name').value = recipeName;

// Display the recipe name within the label
document.getElementById('recipe-name-label').innerHTML = `<strong>${recipeName}</strong>`;

//set the recipe image as the value of the input field
 
document.getElementById("edit-imageUrl").value = recipeImage;

document.getElementById("edit-ingredients").value = ingredients;

document.getElementById("edit-steps").value = steps;

 

async function closeForm(){
    let editedRecipe = {
      name: document.getElementById('edit-recipe-name').value,
      ingredients: document.getElementById('edit-ingredients').value.split(','),
      steps: document.getElementById('edit-steps').value,
      imageUrl: document.getElementById("edit-imageUrl").value
    };

    try {
        const apiURL = `http://127.0.0.1:8000/recipes/${recipeId}`;
        const response = await fetch(apiURL, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedRecipe)
        
    });
    console.log(response.json)
    if (response.ok) {
      console.log("The data has been updated successfully!");
      alert("The Recipe has been updated successfully !");
      window.location.href = "../recipes.html"; // Redirect after successful update
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error:", error.message);
    // Redirect to edit-form.html with query parameters on error
    //window.location.href = `edit-form.html?id=${encodeURIComponent(recipeId)}&name=${encodeURIComponent(recipeName)}&image=${encodeURIComponent(recipeImage)}&ingredients=${encodeURIComponent(ingredients)}&steps=${encodeURIComponent(steps)}`;
  }
}
