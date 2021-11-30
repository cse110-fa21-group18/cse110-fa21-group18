class TTS extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    set data(text) {
        // code here

        // css
        const style = document.createElement('style');
        const styleText = `
            .btn_design {
                padding-left: 10px;
                font-size: 2em;
                border-style: solid;
                max-width: 200px;
                margin-bottom: 10px;
            }
            
            .btn_rst_design {
                padding-left: 10px;
                font-size: 2em;
                border-style: solid;
                max-width: 150px;
            }
            
            i:hover {
                color:red;
                cursor: pointer;
            }
        `
        style.innerHTML = styleText;
        this.shadowRoot.appendChild(style);

        // html elements

        
    }
}
customElements.define('recipe-step-TTS', TTS);