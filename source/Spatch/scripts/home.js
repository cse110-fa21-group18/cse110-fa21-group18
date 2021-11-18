window.addEventListener('DOMContentLoaded', init);

// This is the first function to be called, so when you are tracing your code start here.
async function init() {
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
    {
        image_link: 'https://picsum.photos/200/300?random=3',
        recipe_title: 'Title C',
        cook_time: 'IE 20 minutes',
        tags: ['Norway food', 'easy']
    },
]