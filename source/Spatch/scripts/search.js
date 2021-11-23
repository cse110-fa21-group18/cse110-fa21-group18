/*
Arrays that will store filters
*/
let allCuisineTags = [];
let allIngredientTags = [];
let allDietTags = [];


/*
Function that toggles between showing filter options
*/
function toggleFilter(){
  let filterPopUp = document.getElementById('showpop');
  filterPopUp.classList.toggle('show');
}
 
/*
Event listener to submit request once 'Enter' key is hit for search
*/
let searchInput = document.getElementById('searchInput');
let filterPopUp = document.getElementById('showpop');
searchInput.addEventListener('keypress', function (keyBoardEvent) {
  if (keyBoardEvent.key === 'Enter') {
    alert("recipes will pop up: " + searchInput.value + "\n" 
      + cookingTimeFilter() + "\n" + isCheapFilters());
    alert(allCuisineTags + "\n" + allIngredientTags + "\n" + allDietTags);

  }
});


/*
Event listener to collect all tags for cuisine filter
*/
function cuisineTag(){
  let cuisineFilter = document.getElementById('cuisine');
  allCuisineTags.push(cuisineFilter.value);
  cuisineFilter.value = "";
}

/*
Event listener to collect all tags for ingredients filter
*/
function ingredientsTag(){
  let ingredientFilter = document.getElementById('ingredients');
  allIngredientTags.push(ingredientFilter.value);
  ingredientFilter.value = "";
}

/*
Event listener to collect all tags for diet filter
*/
function dietTag(){
  let dietFilter = document.getElementById('diet');
  allDietTags.push(dietFilter.value);
  dietFilter.value = "";
}


/*
Event listener to collect data for cooking time
*/
function cookingTimeFilter(){
  let timeFilter = document.getElementById('cookTime');
  return timeFilter.value;
}


/*
Event listener to collect all for whether something is cheap
*/
function isCheapFilters(){
  let cheapFilter = document.getElementById('cheap');
  return cheapFilter.value;
}
