window.addEventListener('DOMContentLoaded', init);

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
//   console.log(recipes.results);
//   console.log(recipes[sessionStorage.getItem("searchIndex")]);
//   console.log(sessionStorage.getItem("searchIndex"));
  const fakeCardData = [
    {
    //   createdBy: recipes[sessionStorage.getItem("searchIndex")].sourceName,
      image_link: recipes[sessionStorage.getItem("searchIndex")].image,
      image_alt: "alt",
      recipe_title: recipes[sessionStorage.getItem("searchIndex")].title,
      cook_time: recipes[sessionStorage.getItem("searchIndex")].readyInMinutes,
      tags: ["Tag A", "Tag B", "Tag C"],
      cuisine: recipes[sessionStorage.getItem("searchIndex")].cuisines,
      servings: recipes[sessionStorage.getItem("searchIndex")].servings,
      ingredients:
        recipes[sessionStorage.getItem("searchIndex")].extendedIngredients,
      instructions:
        recipes[sessionStorage.getItem("searchIndex")].analyzedInstructions,
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
  if (
    JSON.parse(localStorage.getItem("favorites")).indexOf(
      sessionStorage.getItem("clickIndex")
    ) > -1
  ) {
    bookmarkImage.src = "./Assets-images/bookmark_filled.svg";
  } else {
    bookmarkImage.src = "./Assets-images/bookmark_empty.svg";
  }
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
        favorites.push(sessionStorage.getItem("clickIndex"));
        localStorage.setItem("favorites", JSON.stringify(favorites));
      } else {
        e.target.src = "./Assets-images/bookmark_empty.svg";
        var favorites = JSON.parse(localStorage.getItem("favorites"));
        if (favorites === null) {
          favorites = [];
        }
        let index = favorites.indexOf(sessionStorage.getItem("clickIndex"));
        favorites.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
}); 

const editRecipeButton = document.querySelector("#edit-recipe-button");
editRecipeButton.addEventListener("click", function(){
    document.location.href = 'editRecipe.html';
});

const backButton = document.querySelector("#back-button");
backButton.href = 'searchPage.html';