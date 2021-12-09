window.addEventListener('DOMContentLoaded', init);
const key = "apiKey=ca7c4c9526e04c1e866556ba28d08808";
let recipe;

async function init() {
  // fetch the recipes and wait for them to load
  var recipes = JSON.parse(sessionStorage.getItem("search")).results;
  if (recipes === null) {
    recipes = [];
  }
  var favorites = JSON.parse(localStorage.getItem("favorites"));
  if (favorites === null) {
    favorites = [];
  }

  let currID = JSON.parse(sessionStorage.getItem("search")).results[
    JSON.parse(sessionStorage.getItem("searchIndex"))
  ].id;

  let recs = [];

  await getRecipe(currID, key, recs);
  recipe = recs[0];

  // console.log(currID);

//   console.log(recipes.results);
//   console.log(recipes[sessionStorage.getItem("searchIndex")]);
//   console.log(sessionStorage.getItem("searchIndex"));
  const fakeCardData = [
    {
    //   createdBy: recipes[sessionStorage.getItem("searchIndex")].sourceName,
      image_link: recipe.image,
      image_alt: "alt",
      recipe_title: recipe.title,
      cook_time: recipe.readyInMinutes,
      tags: ["Tag A", "Tag B", "Tag C"],
      cuisine: recipe.cuisines,
      servings: recipe.servings,
      ingredients:
        recipe.extendedIngredients,
      instructions:
        recipe.analyzedInstructions,
    },
  ];

  // Set each recipe info into display
  const main = document.querySelector(".main-content");

  fakeCardData.forEach((sfData) => {
    const display = document.createElement("result-display");
    display.data = sfData;
    main.appendChild(display);
  });

  const bookmarkImage = document.getElementById("bookmark");
//   console.log(JSON.parse(localStorage.getItem("favorites")).indexOf(sessionStorage.getItem('clickIndex')) > -1);
  let tracker = false;
  let r = JSON.parse(localStorage.getItem('recipes'));
  for(let i = 0; i < r.length; i ++){
    if(r[i].id == recipe.id){
      tracker = true;
      break;
    }
  }
  if (tracker) {
    bookmarkImage.src = "./Assets-images/bookmark_filled.svg";
  } else {
    bookmarkImage.src = "./Assets-images/bookmark_empty.svg";
  }
}

//retrieves recipe information from id, make sure to have apikey input
async function getRecipe(id, apikey, curr) {
  //JSON placeholder is a simple placeholder REST API that returns JSON
  await fetch(`https://api.spoonacular.com/recipes/${id}/information?${apikey}`)
    .then((response) => {
      //response.json() turns the response objects body into JSON
      //response.json() returns a JS promise
      //Use response.text() to turn your response object to text
      return response.json();
    })
    .then(async (data) => {
      await curr.push(data);
    });
}

const bookmarkButton = document.querySelector("#bookmark");
bookmarkButton.addEventListener("click", e => {
  // console.log(
    // JSON.parse(localStorage.getItem("favorites")).indexOf());
    if(e.target.getAttribute("src") == "./Assets-images/bookmark_empty.svg") {
      // if (JSON.parse(localStorage.getItem('favorites')).indexOf(sessionStorage.getItem("clickIndex")) > 0) {
        e.target.src = "./Assets-images/bookmark_filled.svg";
        var favorites = JSON.parse(localStorage.getItem("favorites"));
        if (favorites === null) {
          favorites = [];
        }
        console.log('saved');
        let recs = JSON.parse(localStorage.getItem('recipes'));
        recs.push(recipe);
        console.log(recs);
        localStorage.setItem('recipes', JSON.stringify(recs));

        favorites.push(JSON.stringify(recs.length - 1));
        console.log(favorites);
        localStorage.setItem("favorites", JSON.stringify(favorites));

      } else {
        console.log("unsaved");

        e.target.src = "./Assets-images/bookmark_empty.svg";
        var favorites = JSON.parse(localStorage.getItem("favorites"));
        if (favorites === null) {
          favorites = [];
        }
        let recs = JSON.parse(localStorage.getItem("recipes"));
        for(let i = 0; i < recs.length; i++){
          if(recs[i].id === recipe.id){
            recs.splice(i, 1);
            favorites.splice(i, 1);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            localStorage.setItem("recipes", JSON.stringify(recs));
          }
        }

        // let index = favorites.indexOf(sessionStorage.getItem("clickIndex"));
        // favorites.splice(index, 1);
        // localStorage.setItem("favorites", JSON.stringify(favorites));
      }
}); 

const editRecipeButton = document.querySelector("#edit-recipe-button");
editRecipeButton.addEventListener("click", function(){
    document.location.href = 'editRecipe.html';
});

const backButton = document.querySelector("#back-button");
backButton.href = 'searchPage.html';