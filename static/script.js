const startBtn = document.getElementById("startBtn");
const outputText = document.getElementById("outputText");

// Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.interimResults = true;
recognition.lang = "en-US";

// 🎤 Start button
startBtn.addEventListener("click", () => {
    recognition.start();
    outputText.innerText = "🎧 Listening...";
});

// 🎤 When speech is detected
recognition.onresult = (event) => {
    let finalText = "";

    for (let i = 0; i < event.results.length; i++) {
        finalText += event.results[i][0].transcript;
    }

    processText(finalText);
};

// ⌨️ Typing input
function sendText() {
    let text = document.getElementById("textInput").value;
    processText(text);
}

// 🔥 MAIN FUNCTION
function processText(text) {

    text = text.toLowerCase();

    document.getElementById("outputText").innerText = "You said: " + text;
    document.getElementById("aiResult").innerText = "Sign Language Output:";

    const container = document.getElementById("signContainer");
    container.innerHTML = "";

    let index = 0;

    function showNextLetter() {
        if (index >= text.length) return;

        let char = text[index];

        // Skip special characters
        if (!/[a-z ]/.test(char)) {
            index++;
            showNextLetter();
            return;
        }

        let img = document.createElement("img");

        if (char === " ") {
            img.src = "/static/signs/space.jpg"; // your space image
        } else {
            img.src = "/static/signs/" + char + ".jpg";
        }

        img.className = "sign-img";

        container.innerHTML = ""; // show one at a time
        container.appendChild(img);

        index++;

        setTimeout(showNextLetter, 800); // speed of animation
    }

    showNextLetter();
}