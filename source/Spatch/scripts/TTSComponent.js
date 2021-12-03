class TTS extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    set data(instruction) {
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
                background-color: #FFEFAA;
                border-radius: 30px;
                // padding: 2px 24px;
                padding: 1px;
                // padding-top: 1px;
                margin-top: 10px;
                margin-bottom: 10px;
                display: inline-block;
                align-items: center;
                text-align: center;
            }
            .tts-title {
                display: inline-block;
                margin-right: 20px;
            }
            .tts-button {
                display: block;
                // float:left;
                width: 50px;
                height: 40px;
                color: #FFF;
                background-color: #0B5ED7;
                border: none;
                border-radius: 10px;
                display: inline-block;
            }
            .tts-button:hover {
                // display: block;
                // float:left;
                width: 50px;
                height: 40px;
                color: #0B5ED7;
                background-color: #FFF;
                border: solid 1px #0B5ED7;
                border-radius: 10px;
                cursor: pointer;
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

        // Title
        const TTStitle = document.createElement('h3');
        TTStitle.classList.add("tts-title");
        TTStitle.textContent = "TTS";
        ttsRow.appendChild(TTStitle);

        // Play button
        const playButton = document.createElement("button");
        playButton.textContent = "Play";
        playButton.classList.add("tts-button");
        ttsRow.appendChild(playButton);
        // Restart button
        // const restartButton = document.createElement("button");
        // restartButton.classList.add("tts-button");
        // restartButton.textContent = "Restart";
        // ttsRow.appendChild(restartButton);

        // === setting the TTS ===

        let speech = new SpeechSynthesisUtterance(instruction.text);  
        // let toggleState = 0;
        window.speechSynthesis.cancel();

        // Set Speech Language
        speech.lang = "en";

        

        // let voices = []; // global array of available voices

        // function get_voices() {
        //     return new Promise(
        //         function (resolve, reject) {
        //             // let synth = window.speechSynthesis;
        //             let id;
        
        //             id = setInterval(() => {
        //                 if (window.speechSynthesis.getVoices().length !== 0) {
        //                     resolve(window.speechSynthesis.getVoices());
        //                     clearInterval(id);
        //                 }
        //             }, 10);
        //         }
        //     )
        // }

        // // Get List of Voices
        // window.speechSynthesis.onvoiceschanged = () => {
        //     // Get List of Voices
        //     voices = window.speechSynthesis.getVoices();
          
        //     // Initially set the First Voice in the Array.
        //     speech.voice = voices[0];
        //   };
        // voices = get_voices()
        // voices.then(function(voice) {
            
        // });

        // speech.voice = voices[0];

        // speech.volume = 100;

        
        playButton.addEventListener("click", ()=> {
            window.speechSynthesis.speak(speech);
        });

    //     function toggleIcon(x) {
    //         x.classList.toggle("fa-pause-circle");        //Pause
    //         window.speechSynthesis.resume();
    //         if(toggleState) {
    //             toggleState = 0;
    //         }
    //         else {
    //             toggleState = 1;
    //         }
    //     }

    //     playButton.addEventListener("click", () => {
    //         console.log(typeof instruction.text);

    //         window.speechSynthesis.speak(speech);

    //         console.log(window.speechSynthesis.speaking);

    //         speech.onend = function(event) {
    //             console.log('Utterance has finished being spoken after ' + event.elapsedTime + ' seconds.');
    //         };

    //         if(toggleState) {
    //             window.speechSynthesis.speak(speech);
    //             playButton.innerHTML = 'TTS Instructions <i onclick="toggleIcon(this)" class="fa fa-pause-circle">';   //Pause
    //             speech.onend = function() {
    //                 playButton.innerHTML = 'TTS Instructions <i onclick="toggleIcon(this)" class="fa fa-play-circle">';   //Play
    //                 window.speechSynthesis.cancel();
    //                 toggleState = 0;
    //             }
    //         }
    //         else {
    //             window.speechSynthesis.pause();
    //             playButton.innerHTML = 'TTS Instructions <i onclick="toggleIcon(this)" class="fa fa-play-circle">';   //Resume
    //         }
    //     })

    //     restartButton.addEventListener("click", () => {
    //         window.speechSynthesis.cancel();
    //     })

    }
}
customElements.define('recipe-tts', TTS);