window.addEventListener('DOMContentLoaded', init);

async function init() {
  // fetch the recipes and wait for them to load
  var recipes = JSON.parse(localStorage.getItem("recipes"));
  if (recipes === null) {
    recipes = [];
  }
  var favorites = JSON.parse(localStorage.getItem("favorites"));
  if (favorites === null) {
    favorites = [];
  }
  const fakeCardData = [
    {
      createdBy: recipes[sessionStorage.getItem("clickIndex")].sourceName,
      image_link: recipes[sessionStorage.getItem("clickIndex")].image,
      image_alt: "alt",
      recipe_title: recipes[sessionStorage.getItem("clickIndex")].title,
      cook_time: recipes[sessionStorage.getItem("clickIndex")].readyInMinutes,
      tags: ["Tag A", "Tag B", "Tag C"],
      cuisine: recipes[sessionStorage.getItem("clickIndex")].cuisines,
      servings: recipes[sessionStorage.getItem("clickIndex")].servings,
      ingredients:
        recipes[sessionStorage.getItem("clickIndex")].extendedIngredients,
      instructions:
        recipes[sessionStorage.getItem("clickIndex")].analyzedInstructions,
    },
  ];

  // Set each recipe info into display
  const main = document.querySelector(".main-content");

  fakeCardData.forEach((sfData) => {
    const display = document.createElement("recipe-display");
    display.data = sfData;
    main.appendChild(display);
  });

  const bookmarkImage = document.getElementById("bookmark");
//   console.log(JSON.parse(localStorage.getItem("favorites")).indexOf(sessionStorage.getItem('clickIndex')) > -1);
  if (
    localStorage.getItem("favorites").indexOf(sessionStorage.getItem("clickIndex")) > -1
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