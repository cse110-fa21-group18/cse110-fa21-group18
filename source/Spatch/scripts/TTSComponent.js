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
            // * {
            //     font-family: "Font Awesome 5 Brands"; 
            //     font-weight: 400;
            //     content: "\f09a";
            // }
            .wrapper {
                width: 200px;
                height: 100px;
                background-color: #ddd;
                border-radius: 10px;
                padding: 20px;
                padding-top: 1px;
            }
            .tts-button {
                display: block;
                float:left;
            }
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
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        // wrapper.innerHTML = text.step;
        this.shadowRoot.appendChild(wrapper);

        // Title
        const TTStitle = document.createElement('h3');
        TTStitle.textContent = "TTS for step " + text.step;
        wrapper.appendChild(TTStitle);

        // row col divs
        const ttsRow = document.createElement("div");
        // ttsRow.classList.add("row");
        // const ttsColPlay = document.createElement("div");
        // ttsColPlay.classList.add("col");
        // const ttsColRestart = document.createElement("div");
        // ttsColRestart.classList.add("col");
        // ttsRow.appendChild(ttsColPlay);
        // ttsRow.appendChild(ttsColRestart);
        wrapper.appendChild(ttsRow);

        // Play button
        const playButton = document.createElement("button");
        playButton.textContent = "Play";
        playButton.classList.add("tts-button");
        ttsRow.appendChild(playButton);
        // Restart button
        const restartButton = document.createElement("button");
        restartButton.classList.add("tts-button");
        restartButton.textContent = "Restart";
        ttsRow.appendChild(restartButton);

        // set the TTS
        
    }
}
customElements.define('recipe-tts', TTS);