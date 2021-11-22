window.addEventListener('DOMContentLoaded', init);

async function init() {
    
    // fetch the recipes and wait for them to load
    var recipes = JSON.parse(localStorage.getItem("recipes"));
    if (recipes === null) {
      recipes = [];
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
        ingredients: recipes[sessionStorage.getItem("clickIndex")].extendedIngredients,
        instructions: recipes[sessionStorage.getItem("clickIndex")].analyzedInstructions,
      },
    ];

    // Set each recipe info into display
    const main = document.querySelector('.main-content');

    fakeCardData.forEach(sfData => {
        const display = document.createElement('recipe-display');
        display.data = sfData;
        main.appendChild(display);
    });
}

const bookmarkButton = document.querySelector("#bookmark");
bookmarkButton.addEventListener("click", e => {
    if(e.target.getAttribute("src") == "./Assets-images/bookmark_empty.svg") {
        e.target.src = "./Assets-images/bookmark_filled.svg";
    }
    else {
        e.target.src = "./Assets-images/bookmark_empty.svg";
    }
}); 

const editRecipeButton = document.querySelector("#edit-recipe-button");
editRecipeButton.addEventListener("click", function(){
    document.location.href = 'editRecipe.html';
});