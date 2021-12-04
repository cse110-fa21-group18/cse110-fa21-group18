window.addEventListener("DOMContentLoaded", init);

async function init() {
  var recipes = JSON.parse(localStorage.getItem("recipes"));
  if (recipes === null) {
    recipes = [];
  }
  var favorites = JSON.parse(localStorage.getItem('favorites'));
  if (favorites === null) {
    favorites = [];
  }
  let discardButton = document.getElementById("discard-button");
  let createButton = document.getElementById("create-recipe-button");
  let uploadButton = document.getElementById("recipeImage");
  uploadButton.addEventListener('change', storeImage)
  discardButton.addEventListener("click", discardRecipe);
  createButton.addEventListener("click", createRecipe);

  //   var recipeInstructions = JSON.parse(localStorage.getItem("instructions"));

  let addIngredientButton = document.getElementById('add-ingredient-cards');
  addIngredientButton.addEventListener('click', createIngredientCard);
  createIngredientCard();
}

function getIngredientList() {
  let inst = document.getElementById("ingredient-cards").children;
  for (let i = 0; i < inst.length; i++) {
    var x = inst[i].shadowRoot.children[3].children[0].value;
    var y = inst[i].shadowRoot.children[3].children[1].value;
    var z = inst[i].shadowRoot.children[3].children[2].value;
    // console.log(x, y, z);
  }
  // console.log(inst);
}

function createIngredientCard()
{
  let ingredientCards = document.getElementById('ingredient-cards');
  let ingredientCard = document.createElement('ingredient-card');
  ingredientCards.appendChild(ingredientCard);
}

function discardRecipe() {
  // TODO: redirect back to home page, no saves
  document.location.href = 'home.html';
}

function sendData() {
  //TODO
}

//takes in a recipe object and adds to localstorage
function createRecipe() {
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
    let inst = document.getElementById("ingredient-cards").children;
    for (let i = 0; i < inst.length; i++) {
      var x = inst[i].shadowRoot.children[3].children[0].value;
      var y = inst[i].shadowRoot.children[3].children[1].value;
      var z = inst[i].shadowRoot.children[3].children[2].value;
      currIngredientItem = { name: x, amount: y, unit: z };
      extendedIngredientsList.push(currIngredientItem);
    }
  // var currIngredientsList = document
  //   .getElementById("ingredientsEntry")
  //   .value.split(",");

  // for (let j = 0; j < currIngredientsList.length; j++) {
  //   currIngredientItem = { name: currIngredientsList[j], amount: 0, unit: 0 };
  //   extendedIngredientsList.push(currIngredientItem);
  // }

  const currentRecipe = {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    veryHealthy: false,
    cheap: false,
    veryPopular: false,
    sustainable: false,
    weightWatcherSmartPoints: 0,
    gaps: "no",
    lowFodmap: false,
    aggregateLikes: 0,
    spoonacularScore: 0,
    healthScore: 0,
    creditsText: "",
    sourceName: "",
    pricePerServing: 0,
    extendedIngredients: extendedIngredientsList,
    id: -1,
    title: document.getElementById("recipeTitle").value,
    readyInMinutes: document.getElementById("totalTimeEntry").value,
    servings: document.getElementById("servingSizeChoice").value,
    sourceUrl:
      "http://www.seriouseats.com/recipes/2011/01/dinner-tonight-spanish-style-meatloaf-recipe.html",
    image: sessionStorage.getItem("pic"),
    imageType: "jpg",
    // summary: document.getElementById("recipeDescription").value,
    summary: "",
    cuisines: document.getElementById("cuisineTypeEntry").value.split(","),
    dishTypes: ["lunch", "main course", "main dish", "dinner"],
    diets: [],
    occasions: [],
    winePairing: {},
    instructions: document.getElementById("instructionsEntry").value,
    analyzedInstructions: [
      {
        name: "",
        steps: analyzedInstructionList,
      },
    ],
    originalId: null,
  };
  // console.log(currentRecipe.title);
  // console.log(currentRecipe.summary);
  // console.log(currentRecipe.image);
  // console.log(currentRecipe.cuisines);
  // console.log(currentRecipe.readyInMinutes);
  // console.log(currentRecipe.servings);
  // console.log(currentRecipe.extendedIngredients);
  // console.log(currentRecipe.analyzedInstructions[0]);

  recipes.push(currentRecipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));

  // console.log(recipes);
  document.location.href = 'home.html';
}

function getBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    // console.log(reader.result);
    sessionStorage.setItem('pic', reader.result);
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