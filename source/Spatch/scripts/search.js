/*
Function that toggles between showing filter options
*/
function toggleFilter(){
  var filterPopUp = document.getElementById('showpop');
  filterPopUp.classList.toggle("show");
}


var key = "apiKey=2117ab7aafbb4357a88eed39d2aa06ab";
//var key = "apiKey=ca7c4c9526e04c1e866556ba28d08808";
searchResults = [];

function toggleFilter(){
  var filterPopUp = document.getElementById('showpop');
  filterPopUp.classList.toggle("show");
}


async function getSearchResults() {
  let query = document.getElementById("searchInput").value;
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
      console.log(searchResults);
      sessionStorage.setItem('search', searchResults);
      // console.log(recipes[0].title);
      // console.log(JSON.parse(recipes));
      // localStorage.setItem("recipes", JSON.stringify(recipeArray));
      //   await getRecipeInstructions(id, key, instructions);
    });
}