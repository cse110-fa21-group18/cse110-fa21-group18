window.addEventListener('DOMContentLoaded', init);

async function init() {
    let discardButton = document.getElementById("discard-button");
    let createButton = document.getElementById("create-recipe-button");
    discardButton.addEventListener('click', discardRecipe);
    createButton.addEventListener('click', createRecipe);
}

function discardRecipe()
{
    // TODO: redirect back to home page
}

function createRecipe()
{
    // TODO: validate data and either give error or
    // successfully save recipe to local storage
    // and redirect back to home page
}