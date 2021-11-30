let speech = new SpeechSynthesisUtterance(document.querySelector('instructions').textContent);     //I just grabbed the text from a section called instructions that we can change later

let toggleState = 0;
window.speechSynthesis.cancel();

// Set Speech Language
speech.lang = "en";

let voices = []; // global array of available voices

window.speechSynthesis.onvoiceschanged = () => {
  // Get List of Voices
  voices = window.speechSynthesis.getVoices();

  // Initially set the First Voice in the Array.
  speech.voice = voices[0];
};

speech.volume = 100;

function toggleIcon(x) {
  x.classList.toggle("fa-pause-circle");        //Pause
  window.speechSynthesis.resume();
  if(toggleState) {
      toggleState = 0;
  }
  else {
      toggleState = 1;
  }
}

document.querySelector("#start_pause_btn").addEventListener("click", () => {
  console.log("Second");
    if(toggleState) {
      window.speechSynthesis.speak(speech);

      document.getElementById('start_pause_btn').innerHTML = 'TTS Instructions <i onclick="toggleIcon(this)" class="fa fa-pause-circle">';   //Pause
      speech.onend = function() {
        document.getElementById('start_pause_btn').innerHTML = 'TTS Instructions <i onclick="toggleIcon(this)" class="fa fa-play-circle">';   //Play
        console.log("Done");
        window.speechSynthesis.cancel();
        toggleState = 0;
      }
      console.log("Speaking:" + toggleState);
    }
    else {
      window.speechSynthesis.pause();
      document.getElementById('start_pause_btn').innerHTML = 'TTS Instructions <i onclick="toggleIcon(this)" class="fa fa-play-circle">';   //Resume
      console.log("Paused:" + toggleState);
    }
})

function restartText(x) {
  window.speechSynthesis.cancel();
}