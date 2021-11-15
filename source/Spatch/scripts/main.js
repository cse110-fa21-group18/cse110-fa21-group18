const recipes = [
    './source/Spatch/data/test_recipie1.json',
    './source/Spatch/data/test_recipie2.json',
    './source/Spatch//data/test_recipie3.json'
];

const recipeData = {}

window.addEventListener('DOMContentLoaded', init);

document.addEventListener('mousedown', e=> {
    const detailDiv = document.querySelector('#details');
    detailDiv.innerHTML = 'The card should expand to the size of the screen. Working on handling that animation and replacing the module with a recipie.'
});

// This is the first function to be called, so when you are tracing your code start here.
async function init() {
  // fetch the recipes and wait for them to load
  let fetchSuccessful = await fetchRecipes();
  // if they didn't successfully load, quit the function
  if (!fetchSuccessful) {
    console.log('Recipe fetch unsuccessful');
    return;
  };
  // Add the first three recipe cards to the page
  createRecipeCards();
}

async function fetchRecipes() {
  return new Promise((resolve, reject) => {

    let i_fetch = 0;

    recipes.forEach((v, i) => {
      fetch(v)
        .then(response => {
          return response.json()})
        .then(data => {
          ++i_fetch;
          recipeData[i] = (data)

          if (i_fetch == recipes.length) {
            resolve(true);
          }
        })
        .catch(err => reject(false));
    });
  });
}

function createRecipeCards() {
  const main = document.querySelector('main');
  console.log('main:');
  console.log(main);

  Object.values(recipeData).forEach(data => {
    const card = document.createElement('mini-card');
    card.data = data;
    main.appendChild(card);
  });
}