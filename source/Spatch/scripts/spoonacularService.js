// module.exports = { localStorage.setItem("recipes", JSON.stringify(recipes));, localStorage.setItem("instructions", JSON.stringify(recipeInstructions));, getInstructionsFromStorage, getRecipesFromStorage, getRecipe, getRecipeInstructions, deleteRecipe, updateRecipe, discoverRecipes};
//necessary variables
// module.exports = { testerr };
var key = "apiKey=2117ab7aafbb4357a88eed39d2aa06ab";
//var key = "apiKey=ca7c4c9526e04c1e866556ba28d08808";
var recipes = [];
var recipeInstructions = [];
var reccomended = [];


//sample id for current use
const recipeId = 324694;

function testerr() {
  console.log("was good");
}

//retrieves recipe instructions from localStorage, call on page load
function getInstructionsFromStorage() {
  return JSON.parse(localStorage.getItem("instructions"));
}

//retrieves recipes from localStorage, call on page load
function getRecipesFromStorage() {
  console.log("hello");
  return JSON.parse(localStorage.getItem("recipes"));
}

//retrieves recipe information from id, make sure to have apikey input
async function getRecipe(id, apikey, recipeArray, instructions) {
  //JSON placeholder is a simple placeholder REST API that returns JSON
  await fetch(`https://api.spoonacular.com/recipes/${id}/information?${apikey}`)
    .then((response) => {
      //response.json() turns the response objects body into JSON
      //response.json() returns a JS promise
      //Use response.text() to turn your response object to text
      return response.json();
    })
    .then(async (data) => {
      //We have successfully made a GET request!
      //Log the data to the console:
      // console.log(data);
      recipeArray.push(data);
      // console.log(recipes[0].title);
      // console.log(JSON.parse(recipes));
      localStorage.setItem("recipes", JSON.stringify(recipeArray));
      await getRecipeInstructions(id, key, instructions);
    });
}

//retrieves recipe instructions from id, make sure to have apikey input
async function getRecipeInstructions(id, apikey, instructionsArray) {
  //JSON placeholder is a simple placeholder REST API that returns JSON
  await fetch(
    `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?${apikey}`
  )
    .then((response) => {
      //response.json() turns the response objects body into JSON
      //response.json() returns a JS promise
      //Use response.text() to turn your response object to text
      return response.json();
    })
    .then((data) => {
      //We have successfully made a GET request!
      //Log the data to the console:
      // console.log(JSON.stringify(data));
      // data = JSON.stringify(data);
      instructionsArray.push(data);
      // console.log(JSON.parse(recipeInstructions)[0]);
      localStorage.setItem("instructions", JSON.stringify(instructionsArray));
    });
}

//deletes a recipe from the recipes and recipe instructions array and in localStorage
function deleteRecipe(queryTitle) {
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].title == queryTitle) {
      recipes.splice(i, 1);
      recipeInstructions.splice(i, 1);
      localStorage.setItem("instructions", JSON.stringify(recipeInstructions));
      localStorage.setItem("recipes", JSON.stringify(recipes));
      break;
    }
  }
}

//UNTESTED UNTIL SCHEMA IN ACTION
//updates a recipe and instructions locally and in localstorage
function updateRecipe(updatedRecipe, updatedInstructions) {
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].title == updatedRecipe.title) {
      recipes[i] = updatedRecipe;
      recipeInstructions[i] = updatedInstructions;
      localStorage.setItem("instructions", JSON.stringify(recipeInstructions));
      localStorage.setItem("recipes", JSON.stringify(recipes));
      break;
    }
  }
}
//searches for and returns an array of num size of recipe objects similar to user's recipes or random
async function discoverRecipes(id, apikey) {
  if (recipes.length == 0) {
    return ["hola"];
  }
  let index = Math.floor(Math.random() * recipes.length);
  await fetch(`https://api.spoonacular.com/recipes/${id}/similar?${apikey}`)
    .then((response) => {
      //response.json() turns the response objects body into JSON
      //response.json() returns a JS promise
      //Use response.text() to turn your response object to text
      return response.json();
    })
    .then((data) => {
      //We have successfully made a GET request!
      //Log the data to the console:
      // console.log(JSON.stringify(data));
      // data = JSON.stringify(data);
      // console.log("awioejf")
      reccomended.push(JSON.stringify(data));
      // console.log(JSON.parse(reccomended)[0]);
    });
}

//takes in a recipe object and adds to localstorage
function createRecipe(recipe, recipeInstructions) {
  this.recipes.push(recipe);
  this.recipeInstructions.push(recipeInstructions);
  localStorage.setItem("recipes", JSON.stringify(recipes));
  localStorage.setItem("instructions", JSON.stringify(recipeInstructions));
}

//call on page load to set current variables to those in localstorage
// function setLocalData() {
//   recipes = localStorage.getItem("recipes");
//   recipeInstructions = localStorage.getItem("instructions");
//   console.log(JSON.parse(recipes)[0].title);
//   console.log(JSON.parse(recipeInstructions)[0][0].steps[0].step);
// }

async function test() {
  // localStorage.clear();
  // setLocalData();

  // recipes = getRecipesFromStorage();
  // recipeInstructions = getInstructionsFromStorage();
  // console.log(recipes[0].title);
  // console.log(recipeInstructions[0][0].steps[0].step);

  await getRecipe(recipeId, key, recipes, recipeInstructions);
  console.log(recipes[0].analyzedInstructions[0].steps[0]);
  // console.log(recipeInstructions[0][0].steps[0].step);

  // setLocalData();
  // console.log(JSON.parse(recipes)[0].title);
  // console.log(JSON.parse(recipeInstructions));
  // await getRecipe(recipeId, key);
  // await discoverRecipes(recipeId, key);
  // console.log(reccomended);
  // console.log(recipes);
  // console.log(recipeInstructions[0][0].steps[0].step);
  // console.log(recipes.length);
  // console.log(recipeInstructions.length);
  // getRecipe(recipeId, key);
  // getRecipeInstructions(recipeId);
  // console.log(getInstructionsFromStorage()[0].steps[1].step);
  // console.log(getRecipesFromStorage().title);

  // deleteRecipe("Silver Dollar Buttermilk-Pecan Pancakes with Bourbon Molasses Butter and Maple Syrup");
  // console.log(recipes[0].title);
}

// getRecipe(recipeId, key);
test();
// console.log(recipes);
// console.log(recipeInstructions);
