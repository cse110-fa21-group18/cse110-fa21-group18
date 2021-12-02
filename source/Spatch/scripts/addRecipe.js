window.addEventListener("DOMContentLoaded", init);

// Would be much more elegant to have
// registerDrag and dropped
// be in instructionInd
// but I kept getting an error
// saying "import and export can only
// appear at the top level
// of a module"

async function init() {
  var recipes = JSON.parse(localStorage.getItem("recipes"));
  if (recipes === null) {
    recipes = [];
  }
  let discardButton = document.getElementById("discard-button");
  let createButton = document.getElementById("create-recipe-button");
  discardButton.addEventListener("click", discardRecipe);
  createButton.addEventListener("click", createRecipe);

  //   var recipeInstructions = JSON.parse(localStorage.getItem("instructions"));

  let addIngredientButton = document.getElementById('add-ingredient-cards');
  addIngredientButton.addEventListener('click', createIngredientCard);
  createIngredientCard();

  let addInstructionButton = document.getElementById('add-instruction-cards');
  addInstructionButton.addEventListener('click', createInstructionCard);
  createInstructionCard();

  numberCards();
}

function createIngredientCard()
{
  let ingredientCards = document.getElementById('ingredient-cards');
  let ingredientCard = document.createElement('ingredient-card');
  ingredientCards.appendChild(ingredientCard);
}

function registerDrag(ev)
{
    ev.dataTransfer.setData('dragged', ev.target);
}

function dropped(ev)
{
    let dragged = ev.dataTransfer.getData('dragged');
    let draggedIndex = dragged.indexNo;
    let targetIndex = ev.target.indexNo;
    alert(draggedIndex);
    alert(targetIndex);
}

function createInstructionCard()
{
  let instructionCards = document.getElementById('instruction-cards');
  let instructionCard = document.createElement('instruction-card');
  instructionCard.draggable = true;
  instructionCard.ondragstart = registerDrag;
  instructionCard.ondrop = dropped;
  instructionCards.appendChild(instructionCard);
}

function numberCards()
{
  let instructionCards = document.getElementById('instruction-cards');
  instructionCards = instructionCards.children;
  for(let i=0; i<instructionCards.length; i++)
  {
    let curCard = instructionCards[i].shadowRoot.lastElementChild;
    curCard = curCard.lastElementChild;
    curCard.innerHTML = '#' + (i+1);
  }
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
  var currIngredientsList = document
    .getElementById("ingredientsEntry")
    .value.split(",");

  for (let j = 0; j < currIngredientsList.length; j++) {
    currIngredientItem = { name: currIngredientsList[j], amount: 0, unit: 0 };
    extendedIngredientsList.push(currIngredientItem);
  }

  const currentRecipe = {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    veryHealthy: false,
    cheap: false,
    veryPopular: false,
    sustainable: false,
    weightWatcherSmartPoints: 20,
    gaps: "no",
    lowFodmap: false,
    aggregateLikes: 42,
    spoonacularScore: 82.0,
    healthScore: 22.0,
    creditsText: "Serious Eats",
    sourceName: "You",
    pricePerServing: 214.95,
    extendedIngredients: extendedIngredientsList,
    id: 199621,
    title: document.getElementById("recipeTitle").value,
    readyInMinutes: document.getElementById("totalTimeEntry").value,
    servings: document.getElementById("servingSizeChoice").value,
    sourceUrl:
      "http://www.seriouseats.com/recipes/2011/01/dinner-tonight-spanish-style-meatloaf-recipe.html",
    image: "https://spoonacular.com/recipeImages/199621-556x370.jpg",
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
  console.log(currentRecipe.title);
  console.log(currentRecipe.summary);
  console.log(currentRecipe.image);
  console.log(currentRecipe.cuisines);
  console.log(currentRecipe.readyInMinutes);
  console.log(currentRecipe.servings);
  console.log(currentRecipe.extendedIngredients);
  console.log(currentRecipe.analyzedInstructions[0]);

  recipes.push(currentRecipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));

  // console.log(recipes);
  document.location.href = 'home.html';
}