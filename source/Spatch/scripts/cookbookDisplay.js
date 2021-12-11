window.addEventListener('DOMContentLoaded', init);

const colors = [
    ['Seafoam Green', '#a3c1ad', '#a0d6b4'],
    ['Pastel Blue', '#c4faf8', '#85e3ff'],
    ['Yellow', '#ffffd1', '#fff5ba'],
    ['Maroon', '#c5a3ff', '#b28dff'],
    ['Brown', '#877111', '#75620f'],
    ['Bright Red', '#ff8fab', '#fb6f92'],
    ['Apricot', '#fd6a02', '#964000'],
    ['Candy Apple', '#bf0000', '#800000']
]
async function init() {

    // Grab cookbook info from local storage. Cookbooks are indexed by the order they were added (thisIndex)
    let thisIndex = sessionStorage.getItem("bookIndex");

    let cookbooks = JSON.parse(localStorage.getItem("cookbooks"));
    if (cookbooks === null) {
        cookbooks = [];
    }

    let recipes = JSON.parse(localStorage.getItem("recipes"));
    if (recipes === null) {
      recipes = [];
    }

    // If this is a new cookbook, save it to local storage. This will uniquely create it's thisIndex
    if((sessionStorage.getItem("newCookbook") == "true") || (sessionStorage.getItem("newCookbook") === true)) {
        sessionStorage.setItem("newCookbook", false);
        const cookbook = {
            name: 'Cookbook Title',
            colors: ['#a3c1ad', '#a0d6b4'],
            recipes: []
        };
        cookbooks.push(cookbook);
        localStorage.setItem("cookbooks", JSON.stringify(cookbooks));

        thisIndex = cookbooks.length - 1;
    }

    const cookbookMain = document.querySelector("#cookbook-recipes");
    const allRecipesMain = document.querySelector("#all-recipes");

    const fakeCardData = [];

    for (let i = 0; i < recipes.length; i++) {
        const test = {
          image_link: recipes[i].image,
          recipe_title: recipes[i].title,
          cook_time: recipes[i].readyInMinutes + " minutes",
          tags: ["Norway food", "easy"],
          index: i
        };
        fakeCardData.push(test);
        // console.log(recipes[i].analyzedInstructions[0].steps[0].step);
    }

    cookbooks[thisIndex].recipes.forEach(index => {
        const nextCard = document.createElement("recipe-card");
        nextCard.setData(fakeCardData[index], false);
        cookbookMain.appendChild(nextCard);
    });

    fakeCardData.forEach((recipe, idx) => {
        if (!cookbooks[thisIndex].recipes.includes(idx))    {
            const nextCard = document.createElement("recipe-card");
            nextCard.setData(recipe, true);
            nextCard.addEventListener('click', e => {
                try {
                    allRecipesMain.removeChild(nextCard);
                    cookbookMain.appendChild(nextCard);
                    if(!cookbooks[thisIndex].recipes.includes(idx)){
                        cookbooks[thisIndex].recipes.push(idx);
                        localStorage.setItem("cookbooks", JSON.stringify(cookbooks));
                    }
                } catch (error) {
                    console.log("Can't un-add a recipe!")
            }});
            allRecipesMain.appendChild(nextCard);
        }
    });


    // It's only safe to use thisIndex AFTER this point
    // Return to home and delete this cookbook
    const deleteButton = document.querySelector('#goDelete');
    deleteButton.addEventListener('click', e => {
        cookbooks.splice(thisIndex, 1);
        localStorage.setItem("cookbooks", JSON.stringify(cookbooks));
        document.location.href = 'home.html';
    });

    // Change the title of this cookbook
    const titleButton = document.querySelector('#cookbookTitle');
    titleButton.value = cookbooks[thisIndex].name;
    titleButton.addEventListener('input', e => {
        cookbooks[thisIndex].name = titleButton.value;
        localStorage.setItem("cookbooks", JSON.stringify(cookbooks));
    });

    const addButton = document.querySelector('#add-new');
    addButton.addEventListener('click', e => {
        const listElement = document.querySelector('#recipe-list');
        listElement.classList.remove("hidden");
        addButton.classList.add("hidden");
    });

    let colorVisibility = false;
    const colorBox = document.querySelector('#color-box');
    const colorButton = document.querySelector('#changeToCircle');

    colorButton.style.backgroundColor = cookbooks[thisIndex]['colors'][0];
    let changeColors = colorHover(colorButton, cookbooks[thisIndex]['colors']);

    colorButton.addEventListener('click', e => {

        colorVisibility = !colorVisibility;
        if (colorVisibility) {
            colorBox.style.display = "block";
        } else {
            colorBox.style.display = "none";
        }
        colorBox.style.left = (e.pageX) + "px";
        colorBox.style.top = (e.pageY) + "px";
    });

    colors.forEach(color => {
        const nextSelection = document.createElement('div');
        nextSelection.classList.add('colorSelector');
        nextSelection.innerHTML = color[0];

        nextSelection.addEventListener('click', e => {
            cookbooks[thisIndex]["colors"] = [color[1], color[2]];
            localStorage.setItem("cookbooks", JSON.stringify(cookbooks));

            colorBox.style.display = "none";
            colorVisibility = false;

            colorButton.style.backgroundColor = color[1];
            changeColors()
            changeColors = colorHover(colorButton, cookbooks[thisIndex]['colors']);
        });

        colorBox.appendChild(nextSelection);
    });
}

function colorHover(element, colors) {
    element.addEventListener('mouseover', e => {
        element.style.backgroundColor = colors[1];
    });

    element.addEventListener('mouseout', e => {
        element.style.backgroundColor = colors[0];
    });

    return change = () => {
        element.removeEventListener('mouseover', e => {
            element.backgroundColor = colors[1];
        });
    
        element.removeEventListener('mouseout', e => {
            element.backgroundColor = colors[0];
        });
    }
};