window.addEventListener('DOMContentLoaded', init);

async function init() {
    // TODO: extract the recipe id from url and access localstorage
    // to bring data into the form
    var recipes = JSON.parse(localStorage.getItem("recipes"));
    // At the moment localStorage does not appear to contain anything
    if (recipes === null) {
      recipes = [];
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

    let addIngredientButton = document.getElementById('add-ingredient-cards');
    addIngredientButton.addEventListener('click', createIngredientCard);
    createIngredientCard();

    let addInstructionButton = document.getElementById('add-instruction-cards');
    addInstructionButton.addEventListener('click', createInstructionCard);
    createInstructionCard();
};

function createIngredientCard()
{
  let ingredientCards = document.getElementById('ingredient-cards');
  let ingredientCard = document.createElement('ingredient-card');
  ingredientCards.appendChild(ingredientCard);
}

function createInstructionCard()
{
  let instructionCards = document.getElementById('instruction-cards');
  let instructionCard = document.createElement('instruction-card');

  instructionCard.discardButton.addEventListener('click', delCard);
  instructionCards.appendChild(instructionCard);

  numberCards();
}

/*
Note that this function is repeated in addRecipe
This is not elegant
I couldn't get function import/export to work for
some reason, so this is what happened
*/

function delCard(event)
{
  let index = Number(event.target.parentElement.lastElementChild.innerHTML.substring(1));
  let instructionCard = document.getElementById('instruction-cards');
  instructionCards = instructionCard.children;
  instructionCard.removeChild(instructionCards[index-1]);
  instructionCards = instructionCard.children;
  for(let i=index-1; i<instructionCards.length; i++)
  {
    let curIndex = Number(instructionCards[i].shadowRoot.lastElementChild.lastElementChild.innerHTML.substring(1));
    instructionCards[i].indexNo = curIndex - 1;
  }
}

//deletes a recipe from the recipes array in localStorage
function deleteRecipe() {
    var recipes = JSON.parse(localStorage.getItem("recipes"));
    if (recipes === null) {
      recipes = [];
    }
    var favorites = JSON.parse(localStorage.getItem('favorites'));
    if(favorites === null){
      favorites = [];
    } else {
      let ind = favorites.indexOf(sessionStorage.getItem("clickIndex"));
      favorites.splice(ind, 1);
      if(favorites === null){
        favorites = [];
      }
      localStorage.setItem('favorites', JSON.stringify(favorites));

    }
    recipes.splice(sessionStorage.getItem('clickIndex'), 1);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    // Route back to home
    document.location.href = 'home.html';
}

function getInstructions() {
  let analyzedInstructionList = [];
  let currentInstructionList =
    document.getElementById("instruction-cards").children;

  for (let i = 0; i < currentInstructionList.length; i++) {
    let x = currentInstructionList[i].shadowRoot.children[3].children[0].value;
    let y =
      currentInstructionList[i].shadowRoot.children[3].children[1].children[0]
        .value;
    let currInstructionItem = {
      number: i,
      step: x,
      length: { number: y, unit: "minutes" },
    };
    analyzedInstructionList.push(currInstructionItem);
  }
  console.log(analyzedInstructionList);
  return analyzedInstructionList;
  // console.log(currentInstructionList[0].shadowRoot.children[3].children[1].children[0].value); //instruction time

  // console.log(currentInstructionList[0].shadowRoot.children[3].children[0].value); //instruction text
}

function getIngredients() {
  var extendedIngredientsList = [];
  let ing = document.getElementById("ingredient-cards").children;
  for (let i = 0; i < ing.length; i++) {
    var x = ing[i].shadowRoot.children[3].children[0].value;
    var y = ing[i].shadowRoot.children[3].children[1].value;
    var z = ing[i].shadowRoot.children[3].children[2].value;
    currIngredientItem = { name: x, amount: y, unit: z };
    extendedIngredientsList.push(currIngredientItem);
  }
  return extendedIngredientsList;
}

// updates a recipe and stores new version in local storage
function saveChanges() {
    var recipes = JSON.parse(localStorage.getItem("recipes"));
    if (recipes === null) {
      recipes = [];
    }

      var analyzedInstructionList = getInstructions();

      var extendedIngredientsList = getIngredients();

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