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
                margin-bottom: 0.5em;
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
                right: 3%;
                width: 25%;
            }

            .instruction-time-input {
                width: 100%;
            }

            .instruction-unit {
                margin-left: -20px;
            }

            .instruction-discard {
                position: absolute;
                right: 3%;
                bottom: 15%;
            }

            .instruction-ind-index {
                color: #0d6efd;
                position: absolute;
                top: 48%;
                right: 22%;
                font-size: 1.8em;
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
        insText.cols = 50;
        insText.rows = 3;
        insText.name = 'instruction-ind-text';
        insText.placeholder = 'Guide the foodies through this step';
        insText.classList.add('instruction-text');
        mainDiv.appendChild(insText);

        const insTimeContainer = document.createElement('span');
        insTimeContainer.classList.add('instruction-time');
        const insTime = document.createElement('input');
        insTime.classList.add('instruction-time-input');
        insTime.name = 'instruction-ind-time';
        insTime.placeholder = 'Time taken';
        insTimeContainer.appendChild(insTime);

        const insUnit = document.createElement('span');
        insUnit.classList.add('instruction-unit');
        insUnit.innerHTML = 'M';
        insTimeContainer.appendChild(insUnit);
        mainDiv.appendChild(insTimeContainer);

        this.discardButton = document.createElement('button');
        this.discardButton.classList.add('btn');
        this.discardButton.classList.add('btn-outline-danger');
        this.discardButton.classList.add('btn-sm');
        this.discardButton.classList.add('instruction-discard');
        this.discardButton.innerHTML = "Discard";
        mainDiv.appendChild(this.discardButton);

        // this.discardButton.addEventListener('click', removeElement);

        this.indexNote = document.createElement('span');
        this.indexNote.classList.add('instruction-ind-index');
        this.indexNote.innerHTML = '#1';
        mainDiv.appendChild(this.indexNote);

        this.indexNo = 1;
    }

    set indexNo(index)
    {
        this.indexNote.innerHTML = '#' + index;
    }
}

// function removeElement(clicked)
// {
//     clicked.target.parentElement.remove();
// }

customElements.define('instruction-card', InstructionCard);