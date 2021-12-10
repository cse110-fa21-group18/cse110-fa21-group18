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
  let uploadButton = document.getElementById("recipeImage");
  uploadButton.addEventListener("change", storeImage);
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
  ingredientCard.setContent();
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
  instructionCard.setContent();
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

/*
Note that this function is repeated in editRecipe
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

function discardRecipe() {
  // TODO: redirect back to home page, no saves
  document.location.href = 'home.html';
}

function getInstructions() {
  let analyzedInstructionList = [];
  let currentInstructionList = document.getElementById("instruction-cards").children;

  for(let i = 0; i < currentInstructionList.length; i ++){
    let x = currentInstructionList[i].shadowRoot.children[3].children[0].value;
    let y = currentInstructionList[i].shadowRoot.children[3].children[1].children[0].value
    let currInstructionItem = {number: i, step: x, length: {number: y, unit: 'minutes'}};
    analyzedInstructionList.push(currInstructionItem);
  }
  console.log(analyzedInstructionList);
  return analyzedInstructionList;
  // console.log(currentInstructionList[0].shadowRoot.children[3].children[1].children[0].value); //instruction time

  // console.log(currentInstructionList[0].shadowRoot.children[3].children[0].value); //instruction text
}

function getIngredients(){
  var extendedIngredientsList = [];
  let ing = document.getElementById("ingredient-cards").children;
  for (let i = 0; i < ing.length; i++) {
      console.log(ing[i].shadowRoot.children[3]);
    var x = ing[i].shadowRoot.children[3].children[0].value;
    var y = ing[i].shadowRoot.children[3].children[1].value;
    var z = ing[i].shadowRoot.children[3].children[2].value;
    currIngredientItem = { name: x, amount: y, unit: z };
    extendedIngredientsList.push(currIngredientItem);
  }
  return extendedIngredientsList;

}

//takes in a recipe object and adds to localstorage
function createRecipe() {
  var recipes = JSON.parse(localStorage.getItem("recipes"));
  if (recipes === null) {
    recipes = [];
  }
  var analyzedInstructionList = getInstructions();
  // var currInstructionList = document
  //   .getElementById("instructionsEntry")
  //   .value.split("\n");

  // for (let i = 0; i < currInstructionList.length; i++) {
  //   currInstructionItem = { number: i, step: currInstructionList[i] };
  //   analyzedInstructionList.push(currInstructionItem);
  // }

  let extendedIngredientsList = getIngredients();



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
      "",
    image: sessionStorage.getItem('pic'),
    imageType: "jpg",
    // summary: document.getElementById("recipeDescription").value,
    summary: "",
    cuisines: 
    document.getElementById("cuisineTypeEntry").value.split(","),
    dishTypes: [],
    diets: [],
    occasions: [],
    winePairing: {},
    instructions: [],
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