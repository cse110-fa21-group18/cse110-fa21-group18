window.addEventListener('DOMContentLoaded', init);
// This is the first function to be called, so when you are tracing your code start here.
async function init() {
    var recipes = JSON.parse(localStorage.getItem("recipes"));
    var recipeInstructions = JSON.parse(localStorage.getItem("instructions"));
    // console.log(recipes);
    // console.log(recipeInstructions);
    for(let i = 0; i < recipes.length;i ++){
        const test = {
            image_link: recipes[i].image,
            recipe_title: recipes[i].title,
            cook_time: recipes[i].readyInMinutes + ' minutes',
            tags: ['Norway food', 'easy']
        }
        fakeCardData.push(test);
    }

    // fetch the recipes and wait for them to load

    const main = document.querySelector('.recipe-display');

    fakeCardData.forEach(sfData => {
    const nextCard = document.createElement('recipe-card');
    nextCard.data = sfData;
    main.appendChild(nextCard);
  });
}

const fakeCardData = [
    {
        image_link: 'https://picsum.photos/200/300?random=1',
        image_alt: 'alt',
        recipe_title: 'Recipe Title',
        cook_time: 'total time',
        tags: ['Tag A', 'Tag B', 'Tag C']
    },
    {
        image_link: 'https://picsum.photos/200/300?random=2',
        image_alt: 'Not every image needs an alt!',
        recipe_title: 'Title B',
        cook_time: 'total time',
        tags: ['Tag A', 'Tag B', 'Tag C']
    },
    {
        image_link: 'https://picsum.photos/200/300?random=3',
        recipe_title: 'Title C',
        cook_time: 'IE 20 minutes',
        tags: ['Norway food', 'easy']
    },
    {
        image_link: 'https://picsum.photos/200/300?random=3',
        recipe_title: 'Title C',
        cook_time: 'IE 20 minutes',
        tags: ['Norway food', 'easy']
    },
    {
        image_link: 'https://picsum.photos/200/300?random=3',
        recipe_title: 'Title C',
        cook_time: 'IE 20 minutes',
        tags: ['Norway food', 'easy']
    },
    {
        image_link: 'https://picsum.photos/200/300?random=3',
        recipe_title: 'Title C',
        cook_time: 'IE 20 minutes',
        tags: ['Norway food', 'easy']
    },
    
]