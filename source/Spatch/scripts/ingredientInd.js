class Ingredient extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        const style = document.createElement('style');
        const styleText = `
            .ingredient-ind {
                display: block;
                position: relative;
                width: 100%;
                margin-top: 0.5em;
            }

            .ingredient-ind-name{
                display: inline-block;
                position: relative;
                width: 35%;
                height: 100%;
                margin-right: 1em;
            }

            .ingredient-ind-amount {
                display: inline-block;
                position: relative;
                width: 20%;
                height: 100%;
                margin-right: 1em;
            }

            .ingredient-ind-unit {
                display: inline-block;
                position: relative;
                width: 15%;
                height: 100%;
                margin-right: 1em;
            }
        `;

        style.innerHTML = styleText;
        this.shadowRoot.appendChild(style);

        /*
        <!--Testing the ingredient individual information div-->
        <div class="ingredient-ind">
            <input type="text" class="ingredient-ind-name" name="ingredient-ind-name" placeholder="Ingredient">
            <input type="text" class="ingredient-ind-amount" name="ingredient-ind-amount" placeholder="Amount">
            <select class="ingredient-ind-unit" name="ingredient-ind-unit">
                <option value="lbs">lbs</option>
                <option value="kgs">kgs</option>
                <option value="pieces">pieces</option>
                <option value="ml">ml</option>
            </select>
            <button class="btn btn-danger btn-sm">Discard</button>

        </div>
        */

        const bootstrapCSS = document.createElement('link');
        bootstrapCSS.rel = 'stylesheet';
        bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css';
        bootstrapCSS.crossOrigin = 'anonymous';
        this.shadowRoot.appendChild(bootstrapCSS);

        const bootstrapJS = document.createElement('script');
        bootstrapJS.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js';
        bootstrapJS.crossOrigin = 'anonymous';
        this.shadowRoot.appendChild(bootstrapJS);

        const mainDiv = document.createElement('div');
        mainDiv.classList.add('ingredient-ind');
        this.shadowRoot.appendChild(mainDiv);

        const ingName = document.createElement('input');
        ingName.classList.add('ingredient-ind-name');
        ingName.name = 'ingredient-ind-name';
        ingName.placeholder = 'Ingredient';
        mainDiv.appendChild(ingName);

        const ingAmount = document.createElement('input');
        ingAmount.classList.add('ingredient-ind-amount');
        ingAmount.name = 'ingredient-ind-amount';
        ingAmount.placeholder = "Amount";
        mainDiv.appendChild(ingAmount);

        const unitSelect = document.createElement('select');
        unitSelect.classList.add('ingredient-ind-unit');
        unitSelect.name = "ingredient-ind-unit";
        let nextOption = document.createElement('option');
        nextOption.text = "lbs";
        nextOption.value = "lbs";
        unitSelect.add(nextOption);

        nextOption = document.createElement('option');
        nextOption.text = "kgs";
        nextOption.value = "kgs";
        unitSelect.add(nextOption);

        nextOption = document.createElement('option');
        nextOption.text = "pieces";
        nextOption.value = "pieces";
        unitSelect.add(nextOption);

        nextOption = document.createElement('option');
        nextOption.text = "ml";
        nextOption.value = "ml";
        unitSelect.add(nextOption);

        mainDiv.appendChild(unitSelect);

        const discardButton = document.createElement('button');
        discardButton.classList.add('btn');
        discardButton.classList.add('btn-outline-danger');
        discardButton.classList.add('btn-sm');
        discardButton.innerHTML = "Discard";
        mainDiv.appendChild(discardButton);

        discardButton.addEventListener('click', removeElement);
    }
}

function removeElement(clicked)
{
    clicked.target.parentElement.remove();
}

customElements.define('ingredient-card', Ingredient);