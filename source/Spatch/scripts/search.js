/*
Function that toggles between showing filter options
*/
function toggleFilter(){
  let filterPopUp = document.getElementById('showpop');
  filterPopUp.classList.toggle("show");
}
 
/*
Function that toggles between showing filter options
*/
function submitFilter(){
  let filterPopUp = document.getElementById('showpop');
  filterPopUp.classList.toggle('show');
  console.log("search input: " + searchTextInput() + "\ncuisine: " + cuisineTag() + "\ningredients: " + ingredientsTag() + 
    "\ndiet: " + dietTag() + "\ntime: " + cookingTimeHr() + " hour " + 
    cookingTimeMin() + " minutes " + "\nischeap: " + isCheapFilters());
}

/*
Event listener to submit request once 'Enter' key is hit for search
*/
let searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keypress', function (keyBoardEvent) {
  if (keyBoardEvent.key === "Enter") {
    console.log("search input: " + searchTextInput() );

  }
});

/*
gets the value that the user searched for
*/
function searchTextInput(){
  let searchInput = document.getElementById('searchInput');
  return searchInput.value;
}

/*
Event listener to collect all tags for cuisine filter
*/
function cuisineTag(){
  let cuisineFilter = document.getElementById("cuisine");
  return cuisineFilter.value; 
}

/*
Event listener to collect all tags for ingredients filter
*/
function ingredientsTag(){
  let ingredientFilter = document.getElementById('ingredients');
  return ingredientFilter.value;
}

/*
Event listener to collect all tags for diet filter
*/
function dietTag(){
  let dietFilter = document.getElementById("diet");
  return dietFilter.value;
}


/*
Event listener to collect data for cooking time
*/
function cookingTimeHr(){
  let timeHour = document.getElementById("timeHr");
  return timeHour.value;
}

function cookingTimeMin(){
  let timeMinutes = document.getElementById("timeMin");
  return timeMinutes.value;
}


/*
Event listener to collect all for whether something is cheap
*/
function isCheapFilters(){
  let cheapFilter = document.getElementById("cheap");
  return cheapFilter.checked;
}