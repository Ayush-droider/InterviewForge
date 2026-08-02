export function speak(text) {

    if (!("speechSynthesis" in window)) {
        console.warn("Speech synthesis is not supported.");
        return;
    }

    // Stop any speech currently playing
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Optional: choose a better voice if available
    const voices = window.speechSynthesis.getVoices();

    const preferredVoice =
        voices.find(v => v.lang.startsWith("en") && v.name.includes("Google")) ||
        voices.find(v => v.lang.startsWith("en"));

    if (preferredVoice) {
        utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
    window.speechSynthesis.cancel();
}