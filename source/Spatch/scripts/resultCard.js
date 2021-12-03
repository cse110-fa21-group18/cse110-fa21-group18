class resultCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }
    set data(spoonful) {
        // Similar to how styles were managed in Lab 6
        const style = document.createElement('style');
        const styleText = `
            .wrapper {
                width: 250px;
                height: 283px;
                // border-style: solid;
                border: #999 1px solid;
                border-radius: 10px;
                padding: 5px;
                // float: left;
                // box-shadow: 2px 2px darkgray;
                box-shadow: 1px 1px 10px #999;
                margin-right: 15px;
                cursor: pointer;
                display:inline-block;
                vertical-align:top;
            }
            .wrapper:hover {
                animation-duration: 0.5s;
                animation-name: hover_card;
                // border: #000 2px solid;
                // box-shadow: 6px 6px #0E6EFD;
                box-shadow: 1px 1px 10px #0E6EFD;
                cursor: pointer;
            }
            @keyframes hover_card {
                from {
                    // box-shadow: 2px 2px darkgray;
                    box-shadow: 1px 1px 10px #999;
                }
                to {
                    // border: 2px 2px darkgray;
                    box-shadow: 1px 1px 10px #0E6EFD;
                }
            }
            .photo_wrapper {
                height: 60%;
                border-radius: 5px;
                overflow: hidden;
                left: 50%;
                align-items: center;
                width: 250px;
            }
            img {
                // Fix later!
                width: 100%;
                // bottom: 50%;
                // position: relative;
                height: 100%;
            }
            .title {
                overflow: auto;
                height: 18%;
                font-size: 170%;
                font-weight: bold;
                margin-top: 15px;
                margin-left: 5px;
            }
            .cooktime {
                color: #505050;
                height: 11%;
                margin-left: 5px;
            }
            .tag_wrapper {
                height: 11%;
                overflow: hidden;
                white-space: nowrap;
            }
            .tag_element {
                font-size: 110%;
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
            .bookmark_wrapper {
                width: 60px;
                height: 0px;
                overflow: visible;
                float: right;
            }
            .bookmark {
                width: 60px;
                height: 60px;
                position: relative;
                z-index: 1;
                background-color: gray;
                background: url('/source/Spatch/public/Assets-images/circle-bookmark-unchecked.svg') no-repeat;
                background-size: contain;
                margin-top:2px;
            }
            // .bookmark:hover {
            //     width: 60px;
            //     height: 60px;
            //     position: relative;
            //     z-index: 1;
            //     background-color: gray;
            //     background: url('/source/Spatch/public/Assets-images/circle-bookmark-checked.svg') no-repeat;
            //     background-size: contain;
            //     margin-top:2px;
            // }
        `
        // Append the style and create the container element
        style.innerHTML = styleText;
        this.shadowRoot.appendChild(style);
        // temp
        // const wrapperAll = document.createElement('div');
        // wrapperAll.classList.add('wrapper');
        // this.shadowRoot.appendChild(wrapperAll);
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        this.shadowRoot.appendChild(wrapper);
        // Append the bookmark button
        const bookmark_wrapper = document.createElement('div');
        const bookmark_img = document.createElement('div');
        bookmark_wrapper.classList.add('bookmark_wrapper');
        bookmark_img.classList.add('bookmark');
        bookmark_wrapper.appendChild(bookmark_img);
        wrapper.appendChild(bookmark_wrapper);
        // Append the photo and it's container (contained to have a border radius)
        const img_wrapper = document.createElement('div');
        img_wrapper.classList.add('photo_wrapper');
        // TODO: Backend
        const img = document.createElement('img');
        img.setAttribute('src', spoonful.image);
        img.setAttribute('alt', spoonful.image_alt ? spoonful.image_alt : ('Picture of ' + spoonful.recipe_title));
        img_wrapper.appendChild(img);
        wrapper.appendChild(img_wrapper);
        // Append the Recipie Title
        const div_title = document.createElement('div');
        div_title.classList.add('title');
        // TODO: Backend
        div_title.innerHTML = spoonful.title;
        wrapper.appendChild(div_title);
        // Append the recipie cooktime
        const div_cooktime = document.createElement('div');
        div_cooktime.classList.add('cooktime');
        // TODO: Backend
        div_cooktime.innerHTML = "🕑 " + (spoonful.cook_time ? spoonful.cook_time : '(see recipe)');
        wrapper.appendChild(div_cooktime);
        // Append the recipie tags
        // const tags_wrapper = document.createElement('div');
        // tags_wrapper.classList.add('tag_wrapper');
        // // TODO Backend
        // const tags = spoonful.tags;
        // tags.forEach(value => {
        //     const div_tag = document.createElement('div');
        //     div_tag.classList.add('tag_element');
        //     div_tag.innerHTML = value;
        //     tags_wrapper.appendChild(div_tag);
        // });
        // wrapper.appendChild(tags_wrapper);
        wrapper.addEventListener('click', e => {
            sessionStorage.setItem("clickIndex", spoonful.index);
            console.log(spoonful.index);
            document.location.href = 'recipeDisplay.html';
        })
    }
}
customElements.define('result-card', resultCard);
