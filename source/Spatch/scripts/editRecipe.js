window.addEventListener('DOMContentLoaded', init);

async function init() {
    // TODO: extract the recipe id from url and access localstorage
    // to bring data into the form
    var recipes = JSON.parse(localStorage.getItem("recipes"));
    // At the moment localStorage does not appear to contain anything
    if (recipes === null) {
      recipes = [];
    }
    var favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites === null) {
      favorites = [];
    }
    
    // Get recipe data schema
    const fakeCardData = [
      {
        createdBy: recipes[sessionStorage.getItem("clickIndex")].sourceName,
        image_link: recipes[sessionStorage.getItem("clickIndex")].image,
        image_alt: "alt",
        recipe_title: recipes[sessionStorage.getItem("clickIndex")].title,
        cook_time: recipes[sessionStorage.getItem("clickIndex")].readyInMinutes,
        tags: ["Tag A", "Tag B", "Tag C"],
        cuisine: recipes[sessionStorage.getItem("clickIndex")].cuisines,
        servings: recipes[sessionStorage.getItem("clickIndex")].servings,
        ingredients:
          recipes[sessionStorage.getItem("clickIndex")].extendedIngredients,
        instructions:
          recipes[sessionStorage.getItem("clickIndex")].analyzedInstructions,
      },
    ];

    sessionStorage.setItem(
      "pic",
      recipes[sessionStorage.getItem("clickIndex")].image
    );

    // Set each recipe data
    const main = document.querySelector('.main-content');

    fakeCardData.forEach(sfData => {
        const editRecipe = document.createElement('edit-recipe');
        editRecipe.data = sfData;
        main.appendChild(editRecipe);
    });

    // Set functionality of delete and save changes buttons
    let deleteButton = document.getElementById("delete-button");
    let saveButton = document.getElementById("save-recipe-button");
    let uploadButton = document.getElementById("recipeImage");
    uploadButton.addEventListener("change", storeImage);
    deleteButton.addEventListener("click", deleteRecipe);
    saveButton.addEventListener("click", saveChanges);
};

//deletes a recipe from the recipes array in localStorage
function deleteRecipe() {
    var recipes = JSON.parse(localStorage.getItem("recipes"));
    if (recipes === null) {
      recipes = [];
    }
    recipes.splice(sessionStorage.getItem('clickIndex'), 1);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    // Route back to home
    document.location.href = 'home.html';
}

// updates a recipe and stores new version in local storage
function saveChanges() {
    var recipes = JSON.parse(localStorage.getItem("recipes"));
    if (recipes === null) {
      recipes = [];
    }
      var analyzedInstructionList = [];
      var currInstructionList = document
        .getElementById("instructionsEntry")
        .value.split("\n");

      for (let i = 0; i < currInstructionList.length; i++) {
        currInstructionItem = { number: i, step: currInstructionList[i] };
        analyzedInstructionList.push(currInstructionItem);
      }

      var extendedIngredientsList = [];
      var currIngredientsList = document
        .getElementById("ingredientsEntry")
        .value.split(",");

      for (let j = 0; j < currIngredientsList.length; j++) {
        currIngredientItem = {
          name: currIngredientsList[j],
          amount: 0,
          unit: 0,
        };
        extendedIngredientsList.push(currIngredientItem);
      }

    recipes[sessionStorage.getItem("clickIndex")].image = sessionStorage.getItem('pic');
    // console.log(document.querySelector("#currImage").value);
    recipes[sessionStorage.getItem("clickIndex")].title = document.getElementById("recipeTitle").value;
    recipes[sessionStorage.getItem("clickIndex")].readyInMinutes = document.querySelector("#totalTimeEntry").value;
    recipes[sessionStorage.getItem("clickIndex")].cuisines = document.getElementById("cuisineTypeEntry").value.split(",");
    recipes[sessionStorage.getItem("clickIndex")].servings = document.querySelector("#servingSizeChoice").value;
    recipes[sessionStorage.getItem("clickIndex")].extendedIngredients =
      extendedIngredientsList;
    recipes[sessionStorage.getItem("clickIndex")].analyzedInstructions = [
      {
        name: "",
        steps: analyzedInstructionList,
      },
    ];

    localStorage.setItem("recipes", JSON.stringify(recipes));
    document.location.href = 'recipeDisplay.html';
}

function getBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    // console.log(reader.result);
    sessionStorage.setItem("pic", reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}

function storeImage() {
  var files = document.getElementById("recipeImage").files;
  if (files.length > 0) {
    getBase64(files[0]);
  }
}