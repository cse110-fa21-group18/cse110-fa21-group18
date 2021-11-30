class InstructionCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        const style = document.createElement('style');
        const styleText = `
            .instruction-ind {
                display: block;
                position: relative;
                width: 100%;
                border-radius: 2px;
                border-style: solid;
                border-width: 1px;
                padding: 0.5em 0.5em 0.5em 1em;
            }

            .instruction-text {
                display: inline-block;
                position: relative;
                left: 0;
                top: 0;
            }

            .instruction-time {
                display: inline-block;
                position: absolute;
                right: 0;
                width: 20%;
            }

            .instruction-unit {
                position: absolute;
                right: 1em;
                top: 0.6em;
            }

            .instruction-discard {
                position: absolute;
                right: 3.1em;
                bottom: 1.4em;
            }
        `
        style.innerHTML = styleText;
        this.shadowRoot.appendChild(style);

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
        mainDiv.classList.add('instruction-ind');
        this.shadowRoot.appendChild(mainDiv);

        const insText = document.createElement('textarea');
        insText.cols = 40;
        insText.rows = 3;
        insText.name = 'instruction-ind-text';
        insText.classList.add('instruction-text');
        mainDiv.appendChild(insText);

        const insTime = document.createElement('input');
        insTime.classList.add('instruction-time');
        insTime.name = 'instruction-ind-time';
        insTime.placeholder = 'Time taken';
        mainDiv.appendChild(insTime);

        const insUnit = document.createElement('span');
        insUnit.classList.add('instruction-unit');
        insUnit.innerHTML = 'M';
        mainDiv.appendChild(insUnit);

        let discardButton = document.createElement('button');
        discardButton.classList.add('btn');
        discardButton.classList.add('btn-outline-danger');
        discardButton.classList.add('btn-sm');
        discardButton.classList.add('instruction-discard');
        discardButton.innerHTML = "Discard";
        mainDiv.appendChild(discardButton);

        discardButton.addEventListener('click', removeElement);
    }
}

function removeElement(clicked)
{
    clicked.target.parentElement.remove();
}

customElements.define('instruction-card', InstructionCard);