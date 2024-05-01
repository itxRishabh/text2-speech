document.getElementById('speakBtn').addEventListener('click', function() {
    const text = document.getElementById('text').value;
    const rate = document.getElementById('rate').value;
    const pitch = document.getElementById('pitch').value;
    const voiceSelected = document.getElementById('voiceSelect').selectedOptions[0].getAttribute('data-name');
    speakText(text, rate, pitch, voiceSelected);
});

document.getElementById('rate').addEventListener('input', function() {
    document.getElementById('rate-value').innerText = this.value;
});

let voices = [];

function populateVoiceList() {
    voices = speechSynthesis.getVoices();
    const voiceSelect = document.getElementById('voiceSelect');
    voiceSelect.innerHTML = '';
    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.setAttribute('data-name', voice.name);
        option.setAttribute('data-lang', voice.lang);
        voiceSelect.appendChild(option);
    });
}

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speakText(text, rate, pitch, voiceSelected) {
    if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(text);
        speech.voice = voices.find(voice => voice.name === voiceSelected);
        speech.lang = speech.voice.lang;
        speech.rate = parseFloat(rate);
        speech.pitch = parseFloat(pitch);
        window.speechSynthesis.speak(speech);
    } else {
        alert('Sorry, your browser does not support text to speech!');
    }
}

window.addEventListener('load', populateVoiceList);
