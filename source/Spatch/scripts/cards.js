class Card extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    set data(spoonful) {

        // Similar to how styles were managed in Lab 6
        const style = document.createElement('style');
        const styleText = `
            .wrapper {
                width: 230px;
                height: 308px;
                border-style: solid;
                border: #505050 2px solid;
                border-radius: 10px;
                padding: 5px;
                float: left;
                margin-left: 20px;

                box-shadow: 2px 2px darkgray;
            }

            .wrapper:hover {
                animation-duration: 0.5s;
                animation-name: hover_card;
                box-shadow: 6px 6px gray;
                width: 250px;
                height: 338px;
            }

            @keyframes hover_card {
                from {
                    box-shadow: 2px 2px darkgray;
                    width: 230px;
                    height: 308px;
                }

                to {
                    box-shadow: 6px 6px gray;
                    width: 250px;
                    height: 338px;
                }
            }

            .photo_wrapper {
                height: 60%;
                border-radius: 10px;
                overflow: hidden;
            }

            img {
                width: 100%;
                bottom: 50%;
                position: relative;
            }

            .title {
                overflow: auto;
                height: 18%;
                font-size: 200%;
                font-weight: bold;
            }

            .cooktime {
                color: #505050;
                height: 11%;
            }

            .tag_wrapper {
                height: 11%;
                overflow: auto;
                white-space: nowrap;
            }

            .tag_element {
                font-size: 125%;
                margin-right: 10px;
                padding-left: 5px;
                padding-right: 5px;
                width: auto;
                height: 80%;
                display: inline-block;
                border-radius: 5px;
                border-width: 2px;
                border-color: #505050;
                border-style: solid;
                color: #505050;
                background-color: white;
            }
        `
        // Append the style and create the container element
        style.innerHTML = styleText;
        this.shadowRoot.appendChild(style);

        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        this.shadowRoot.appendChild(wrapper);

        // Append the photo and it's container (contained to have a border radius)
        const img_wrapper = document.createElement('div');
        img_wrapper.classList.add('photo_wrapper');

        // TODO: Backend
        const img = document.createElement('img');
        img.setAttribute('src', spoonful.image_link);
        img.setAttribute('alt', spoonful.image_alt ? spoonful.image_alt : ('Picture of ' + spoonful.recipe_title));

        img_wrapper.appendChild(img);
        wrapper.appendChild(img_wrapper);

        // Append the Recipie Title
        const div_title = document.createElement('div');
        div_title.classList.add('title');

        // TODO: Backend
        div_title.innerHTML = spoonful.recipe_title;

        wrapper.appendChild(div_title);

        // Append the recipie cooktime
        const div_cooktime = document.createElement('div');
        div_cooktime.classList.add('cooktime');

        // TODO: Backend
        div_cooktime.innerHTML = "🕑 " + (spoonful.cook_time ? spoonful.cook_time : '(see recipe)');
        wrapper.appendChild(div_cooktime);

        // Append the recipie tags
        const tags_wrapper = document.createElement('div');
        tags_wrapper.classList.add('tag_wrapper');

        // TODO Backend
        const tags = spoonful.tags;
        tags.forEach(value => {
            const div_tag = document.createElement('div');
            div_tag.classList.add('tag_element');
            div_tag.innerHTML = value;
            tags_wrapper.appendChild(div_tag);
        });
        wrapper.appendChild(tags_wrapper);

        wrapper.addEventListener('click', e => {
            alert('This selection should route to the recipe info screen for: ' + spoonful.recipe_title);
        })        
    }
}
customElements.define('steven-card', Card);