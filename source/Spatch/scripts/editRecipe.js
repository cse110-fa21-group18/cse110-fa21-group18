window.addEventListener('DOMContentLoaded', init);

async function init() {
    // TODO: extract the recipe id from url and access localstorage
    // to bring data into the form
    let deleteButton = document.getElementById("delete-button");
    let saveButton = document.getElementById("save-recipe-button");
    deleteButton.addEventListener("click", deleteRecipe);
    saveButton.addEventListener("click", saveChanges);
};

function deleteRecipe() {
    // TODO: delete recipe from local storage and redirect to home page
    // Might be helpful to have a helper function
    // that extracts recipe id from URL
}

function saveChanges() {
    // TODO: validate and update recipe data to local storage
    // and redirect to home page
}