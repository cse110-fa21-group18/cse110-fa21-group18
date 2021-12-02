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
}

function createIngredientCard()
{
  let ingredientCards = document.getElementById('ingredient-cards');
  let ingredientCard = document.createElement('ingredient-card');
  ingredientCards.appendChild(ingredientCard);
}

// Non-functional drag event handlers
// The div won't move even if draggable is set to true
// If you solve the issue, we could have dragging
// for the instruction cards
//
// function registerDrag(ev)
// {
//     ev.dataTransfer.setData('dragged', ev.target);
// }
// 
// function dropped(ev)
// {
//     let dragged = ev.dataTransfer.getData('dragged');
//     let draggedIndex = dragged.indexNo;
//     let targetIndex = ev.target.indexNo;
//     alert(draggedIndex);
//     alert(targetIndex);
// }

function createInstructionCard()
{
  let instructionCards = document.getElementById('instruction-cards');
  let instructionCard = document.createElement('instruction-card');
  // More commands that would be useful for dragging
  //
  // instructionCard.draggable = true;
  // instructionCard.ondragstart = registerDrag;
  // instructionCard.ondrop = dropped;
  instructionCard.discardButton.addEventListener('click', delCard);
  instructionCards.appendChild(instructionCard);

  numberCards();
}

function numberCards()
{
  let instructionCards = document.getElementById('instruction-cards');
  instructionCards = instructionCards.children;
  for(let i=0; i<instructionCards.length; i++)
  {
    instructionCards[i].indexNo = i + 1;
  }
}

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