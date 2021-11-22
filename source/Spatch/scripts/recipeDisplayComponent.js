class Display extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set data(spoonful) {
    // Title
    const recipeName = document.querySelector(".recipeName");
    recipeName.textContent = spoonful.recipe_title;

    // Image
    const recipeImage = document.querySelector(".recipeImage img");
    recipeImage.setAttribute("src", spoonful.image_link);

    // Author
    const author = document.querySelector("#author");
    author.textContent = spoonful.createdBy;

    // Cuisine
    const cuisine = document.querySelector("#cuisine");
    cuisine.textContent = spoonful.cuisine[0];
    // console.log(spoonful.cuisine);
    for (let i = 1; i < spoonful.cuisine.length; i++) {
      cuisine.textContent += (", \n" + spoonful.cuisine[i]);
    }

    // Total Time
    const totalTime = document.querySelector("#totalTime");
    totalTime.textContent = spoonful.cook_time
      ? spoonful.cook_time
      : "(see recipe)";

    // Servings
    const servings = document.querySelector("#servings");
    servings.textContent = spoonful.servings;

    // Ingredients
    const ingredientList = document.getElementById("ingredientList");
    for (let i = 0; i < spoonful.ingredients.length; i++) {
      var listItem = document.createElement("li");
      listItem.classList.add("ingredients-items");
      listItem.appendChild(
        document.createTextNode(spoonful.ingredients[i].name)
      );
      ingredientList.appendChild(listItem);
    }

    // Instructions
    // const instructionItems = document.querySelector(".instruction-item");
    // instructionItems.textContent = "ADD HERE";
    const instructionList = document.getElementById("instructionList");
    for(let k = 0; k < spoonful.instructions.length; k ++){

        for (let i = 0; i < spoonful.instructions[k].steps.length; i++) {
        //   console.log(spoonful.instructions[0].steps[i].step);
        var listItem = document.createElement("li");
        listItem.classList.add("instruction-item");
        listItem.classList.add("list-group-item");
        listItem.appendChild(
            document.createTextNode(spoonful.instructions[k].steps[i].step)
        );
        instructionList.appendChild(listItem);
        }
    }
    //   console.log(spoonful.instructions[0].steps.length);
  }
}
customElements.define("recipe-display", Display);
