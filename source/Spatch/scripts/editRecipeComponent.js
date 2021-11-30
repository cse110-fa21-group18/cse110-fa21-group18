class editRecipe extends HTMLElement {
    constructor() {
        super();
    }

    set data(spoonful) {
        // Title
        const recipeTitle = document.querySelector("#recipeTitle");
        recipeTitle.setAttribute('value', spoonful.recipe_title);

        // Description
        // const recipeDescription = document.querySelector("#recipeDescription");
        // recipeDescription.setAttribute('value', spoonful.description);

        // Image
        const currImage = document.querySelector("#currImage");
        currImage.textContent = "Current image: " + spoonful.image_link;
        // image.setAttribute('src', spoonful.description);


        // Author
        // const author = document.querySelector("#author");
        // author.textContent = spoonful.createdBy;

        // Cuisine
        const cuisine = document.querySelector("#cuisineTypeEntry");
        cuisine.setAttribute('value', spoonful.cuisine ? spoonful.cuisine : '');

        // Total Time
        const totalTime = document.querySelector("#totalTimeEntry");
        totalTime.setAttribute('value', spoonful.cook_time ? spoonful.cook_time : '');
        
        // Servings
        const servings = document.querySelector("#servingSizeChoice");
        servings.setAttribute('value', spoonful.servings ? spoonful.servings : '');
        
        // Ingredients
        // TODO: Edit this to work with the ingredient card format
        // Would be nice to reference the createIngredientCard function
        // Create the ingredient cards and fill in the items
        /*const ingredientsItems = document.querySelector("#ingredientsEntry");
        let ing = spoonful.ingredients[0].name;
        for(let i = 1; i < spoonful.ingredients.length; i ++){
          ing += (", " + spoonful.ingredients[i].name);
        }
        ingredientsItems.value = ing;*/
        // console.log(ing);

        // Instructions
        // TODO: Edit this to work with the instruction card format
        // Would be nice to reference the createInstructionCard function
        // Create the instruction step cards and fill in the items
        /*const instructionItems = document.querySelector("#instructionsEntry");
        let ins = spoonful.instructions[0].steps[0].step;
        for(let k = 0; k < spoonful.instructions.length; k++){
          if(k != 0){
            ins += '\n' + spoonful.instructions[k].steps[0].step;
          }
          for(let i = 1; i < spoonful.instructions[k].steps.length; i++){
            ins += ("\n" + spoonful.instructions[k].steps[i].step);
          }
        }
        instructionItems.value = ins;
        console.log(spoonful.instructions[0]);*/
    }
}
customElements.define('edit-recipe', editRecipe);