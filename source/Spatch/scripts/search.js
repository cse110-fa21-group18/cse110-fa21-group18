
// This is the first function to be called, so when you are tracing your code start here.
var key = "apiKey=2117ab7aafbb4357a88eed39d2aa06ab";
//var key = "apiKey=ca7c4c9526e04c1e866556ba28d08808";

window.addEventListener("DOMContentLoaded", init);

async function init() {
  /*
  Event listener to submit request once 'Enter' key is hit for search
  */
  let searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('keypress', function (keyBoardEvent) {
    if (keyBoardEvent.key === "Enter") {
      getFilteredResults();
      console.log("Enter");
    }
  });

  /*
  Event listener to submit request once 'Apply Filters' button is pressed
  */
  let filterButton = document.getElementById('applyFilters');
  filterButton.addEventListener("click", submitFilter);



}

let searchResults = [];


function submitFilter() {
  getFilteredResults();
  console.log("Apply Filters");
  let filterPopUp = document.getElementById('showpop');
  filterPopUp.classList.toggle('show');
}


/*
Function that toggles between showing filter options
*/
function toggleFilter() {
  var filterPopUp = document.getElementById('showpop');
  filterPopUp.classList.toggle("show");
}

function getFilters() {
  let filterInput = '';
  let maxCookingTime = cookingTimeHr() * 60 + parseFloat(cookingTimeMin());
  if (searchTextInput()) {
    filterInput += searchTextInput();
  }
  if (cuisineTag()) {
    filterInput += '&cuisine=' + cuisineTag();
  }
  if (ingredientsTag()) {
    filterInput += '&includeIngredients=' + ingredientsTag();
  }
  if (dietTag()) {
    filterInput += '&diet=' + dietTag();
  }
  if (maxCookingTime > 0) {
    filterInput += '&maxReadyTime=' + maxCookingTime;
  }
  return filterInput;
}

/*
gets the value that the user searched for
*/
function searchTextInput() {
  let searchInput = document.getElementById('searchInput');
  return searchInput.value;
}

/*
function to collect all tags for cuisine filter
*/
function cuisineTag() {
  let cuisineFilter = document.getElementById("cuisine");
  return cuisineFilter.value; 
}

/*
function to collect all tags for ingredients filter
*/
function ingredientsTag() {
  let ingredientFilter = document.getElementById('ingredients');
  return ingredientFilter.value;
}

/*
function to collect all tags for diet filter
*/
function dietTag() {
  let dietFilter = document.getElementById("diet");
  return dietFilter.value;
}

/*
function to collect data for cooking time
*/
function cookingTimeHr() {
  let timeHour = document.getElementById("timeHr");
  return timeHour.value;
}

function cookingTimeMin() {
  let timeMinutes = document.getElementById("timeMin");
  return timeMinutes.value;
}

/*
function to collect all for whether something is cheap
*/
function isCheapFilters() {
  let cheapFilter = document.getElementById("cheap");
  return cheapFilter.checked;
}

async function getSearchResults() {
  let query = searchTextInput();
  //JSON placeholder is a simple placeholder REST API that returns JSON
  await fetch(`https://api.spoonacular.com/recipes/complexSearch?${key}&query=${query}`)
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
      searchResults = data;
      console.log('Results ' + searchResults);
      sessionStorage.setItem('search', searchResults);
      console.log(searchResults);

      // console.log(recipes[0].title);
      // console.log(JSON.parse(recipes));
      // localStorage.setItem("recipes", JSON.stringify(recipeArray));
      //   await getRecipeInstructions(id, key, instructions);
    });
}
 
async function getFilteredResults() {
  let query = getFilters(); 
  // JSON placeholder is a simple placeholder REST API that returns JSON
  await fetch(`https://api.spoonacular.com/recipes/complexSearch?${key}&query=${query}`)
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
      searchResults = data;
      console.log('Results ' + searchResults);
      sessionStorage.setItem('search', searchResults);
      // console.log(searchResults);
      // console.log(recipes[0].title);
      // console.log(JSON.parse(recipes));
      // localStorage.setItem("recipes", JSON.stringify(recipeArray));
      //   await getRecipeInstructions(id, key, instructions);
    });
}
