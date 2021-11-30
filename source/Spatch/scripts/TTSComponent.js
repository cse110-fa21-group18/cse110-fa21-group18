class TTS extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    set data(text) {
        // code here
        
    }
}
customElements.define('recipe-step-TTS', TTS);