const key = "apiKey=2117ab7aafbb4357a88eed39d2aa06ab";
//const key = "apiKey=ca7c4c9526e04c1e866556ba28d08808";
window.addEventListener("DOMContentLoaded", init);

// This is the first function to be called, so when you are tracing your code start here.
async function init() {
    var reccomended = [];
    // console.log(reccomendedArray);
    var recipes = JSON.parse(localStorage.getItem("recipes"));
    if (recipes === null) {
        recipes = [];
    }

    let cookbooks = JSON.parse(localStorage.getItem("cookbooks"));
    if (cookbooks === null) {
        cookbooks = [];
    }

    var favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites === null) {
        favorites = [];
    }
    //   var recipeInstructions = JSON.parse(localStorage.getItem("instructions"));
    var testingIds = [209128, 31868, 9751, 206706, 209251];
    //   await getRecipe(324694, key, recipes);

    // tester code that loads localstorage
    // console.log(testingIds.length);
    // for (let j = 0; j < testingIds.length; j++) {
    //   await getRecipe(testingIds[j], key, recipes);
    // }

    // ==== My Recipes ====

    for (let i = 0; i < recipes.length; i++) {
        const test = {
            image: recipes[i].image,
            title: recipes[i].title,
            cook_time: recipes[i].readyInMinutes + " minutes",
            tags: ["Norway food", "easy"],
            index: i
        };
        fakeCardData.push(test);
        // console.log(recipes[i].analyzedInstructions[0].steps[0].step);
    }

    // fetch the recipes and wait for them to load
    const main = document.querySelector("#all-recipes-cards");

    fakeCardData.forEach((sfData) => {
        const nextCard = document.createElement("recipe-card");
        nextCard.setData(sfData, false);
        main.appendChild(nextCard);
    });

    // ==== Cookbooks ====
    const cookbook = document.querySelector("#all-cookbooks");

    cookbooks.forEach((data, i) => {
        const fakeCard = document.createElement("cookbook-card");
        fakeCard.setInfo(data, i);
        cookbook.appendChild(fakeCard);
    });

    // We have to let the cookbook page know when a new one is selected
    const newCookbook = document.querySelector("#newCookbook");
    newCookbook.addEventListener('click', e => {
        sessionStorage.setItem("newCookbook", true);
    });

    // ==== Favorites ====
    const fav = [];
    let currInd = 0;

    for (let i = 0; i < favorites.length; i++) {
        currInd = parseInt(favorites[i]);
        // console.log(currInd);
        const eachFav = {
            image: recipes[currInd].image,
            title: recipes[currInd].title,
            cook_time: recipes[currInd].readyInMinutes + " minutes",
            tags: ["Norway food", "easy"],
            index: currInd
        };
        fav.push(eachFav);
        // console.log(recipes[i].analyzedInstructions[0].steps[0].step);
    }

    // fetch the recipes and wait for them to load
    const favSection = document.querySelector("#favorites-cards");
    // console.log(favorites);
    fav.forEach((favData) => {
        const favCard = document.createElement("recipe-card");
        favCard.setData(favData, false);
        favSection.appendChild(favCard);
    });

    // ==== Discover Recipes =====

    reccomended = await discoverRecipes(key, recipes, reccomended);
    // console.log(reccomended);
    // fetch the recipes and wait for them to load
    const discoverSection = document.querySelector("#discover-recipes-cards");
    // console.log(favorites);
    reccomended.forEach((discData) => {
        console.log(discData);
        const discCard = document.createElement("recipe-card");
        discCard.setData(discData, false);
        discoverSection.appendChild(discCard);
    });
}

const fakeCardData = [

];

//SERVICE FUNCTIONS

//retrieves recipe information from id, make sure to have apikey input
async function getRecipe(id, apikey, recipeArray) {
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
            //   await getRecipeInstructions(id, key, instructions);
        });
}



async function discoverRecipes(apikey, recipeArray, reccomendedArray) {
    if (recipeArray.length === 0) {
        console.log('hello');
    } else {
        let index = Math.floor(Math.random() * recipeArray.length);
        // console.log(recipeArray[index].id);
        return fetch(`https://api.spoonacular.com/recipes/${recipeArray[index].id}/similar?${apikey}`)
            .then(response => {
                //response.json() turns the response objects body into JSON
                //response.json() returns a JS promise
                //Use response.text() to turn your response object to text
                return response.json();
            })
            .then(data => {
                //We have successfully made a GET request!
                //Log the data to the console:
                // console.log(JSON.stringify(data));
                // data = JSON.stringify(data);
                // console.log(data)
                // reccomendedArray.push(JSON.stringify(data));
                reccomendedArray = data;
                return reccomendedArray;
                // console.log(JSON.parse(reccomendedArray));
        })
    }
}