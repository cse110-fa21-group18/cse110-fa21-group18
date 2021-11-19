//necessary variables
var key = "apiKey=2117ab7aafbb4357a88eed39d2aa06ab";
//var key = "apiKey=ca7c4c9526e04c1e866556ba28d08808";
var recipes = [];
var recipeInstructions = [];
var reccomended = [];

//sample id for current use
const recipeId = 324694;

//sets recipes in localStorage
function updateRecipesLocalStorage(){
  localStorage.setItem("recipes", recipes);
}

//sets recipe instructions in localstorage
function updateInstructionsLocalStorage(){
  localStorage.setItem("instructions", recipeInstructions);
}

//retrieves recipe instructions from localStorage, call on page load
function getInstructionsFromStorage(){
  var store = localStorage.getItem("instructions");
  return JSON.parse(store);
}

//retrieves recipes from localStorage, call on page load
function getRecipesFromStorage(){
  var store = localStorage.getItem("recipes");
  return JSON.parse(store);
}

//retrieves recipe information from id, make sure to have apikey input
function getRecipe(id, apikey){
//JSON placeholder is a simple placeholder REST API that returns JSON
fetch(`https://api.spoonacular.com/recipes/${id}/information?${apikey}`)
    .then(response=> {
        //response.json() turns the response objects body into JSON
        //response.json() returns a JS promise
        //Use response.text() to turn your response object to text
        return response.json();
    })
    .then(data=> {
        //We have successfully made a GET request!
        //Log the data to the console:
        // console.log(data);
        recipes.push(JSON.stringify(data));
        // console.log(JSON.parse(recipes));
        updateRecipesLocalStorage();
        getRecipeInstructions(id, key);
    })
}

//retrieves recipe instructions from id, make sure to have apikey input
function getRecipeInstructions(id, apikey){
//JSON placeholder is a simple placeholder REST API that returns JSON
fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?${apikey}`)
    .then(response=> {
        //response.json() turns the response objects body into JSON
        //response.json() returns a JS promise
        //Use response.text() to turn your response object to text
        return response.json();
    })
    .then(data=> {
        //We have successfully made a GET request!
        //Log the data to the console:
        // console.log(JSON.stringify(data));
        // data = JSON.stringify(data);
        recipeInstructions.push(JSON.stringify(data));
        // console.log(JSON.parse(recipeInstructions)[0]);
        updateInstructionsLocalStorage();
    })
}

//deletes a recipe from the recipes and recipe instructions array and in localStorage
function deleteRecipe(queryTitle){
  for(let i = 0; i < recipes.length; i ++){
    if(recipes[i].title == queryTitle){
      recipes.splice(i, 1);
      recipeInstructions.splice(i,1);
      updateInstructionsLocalStorage();
      updateRecipesLocalStorage();
      break;
    }
  }
}

//UNTESTED UNTIL SCHEMA IN ACTION
//updates a recipe and instructions locally and in localstorage
function updateRecipe(updatedRecipe, updatedInstructions){
    for(let i = 0; i < recipes.length; i ++){
    if(recipes[i].title == updatedRecipe.title){
      recipes[i] = updatedRecipe;
      recipeInstructions[i] = updatedInstructions;
      updateInstructionsLocalStorage();
      updateRecipesLocalStorage();
      break;
    }
  }
}
//searches for and returns an array of num size of recipe objects similar to user's recipes or random
function discoverRecipes(id, apikey){
  if(recipes.length == 0){
    return ["hola"];
  }
  let index = Math.floor(Math.random() * recipes.length);
  fetch(`https://api.spoonacular.com/recipes/${id}/similar?${apikey}`)
    .then(response=> {
      //response.json() turns the response objects body into JSON
      //response.json() returns a JS promise
      //Use response.text() to turn your response object to text
      return response.json();
    })
    .then(data=> {
      //We have successfully made a GET request!
      //Log the data to the console:
      // console.log(JSON.stringify(data));
      // data = JSON.stringify(data);
      // console.log("awioejf")
      reccomended.push(JSON.stringify(data));
      console.log(reccomended.length);
      // console.log(JSON.parse(reccomended)[0]);
  })
}

//takes in a recipe object and adds to localstorage
function createRecipe(recipe, recipeInstructions){
  this.recipes.push(recipe);
  this.recipeInstructions.push(recipeInstructions);
  updateRecipesLocalStorage();
  updateInstructionsLocalStorage();
}

//call on page load to set current variables to those in localstorage
function setLocalData(){
  this.recipes.push(getRecipesFromStorage());
  this.recipeInstructions.push(getInstructionsFromStorage());
}
function test(){
  console.log(reccomended);
  // console.log(recipes.length);
  // console.log(recipeInstructions.length);
  // getRecipe(recipeId, key);
  // getRecipeInstructions(recipeId);
  // console.log(getInstructionsFromStorage()[0].steps[1].step);
  // console.log(getRecipesFromStorage().title);

  // deleteRecipe("Silver Dollar Buttermilk-Pecan Pancakes with Bourbon Molasses Butter and Maple Syrup");
  // console.log(recipes[0].title);
}

setLocalData();
getRecipe(recipeId, key);
// discoverRecipes(recipeId, key);
// console.log(reccomended);
console.log(recipes);
console.log(recipeInstructions);

//test();

