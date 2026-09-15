let speechInterval: number | undefined;

export const startAlertSpeech = (text: string) => {
    speechInterval = window.setInterval(() => {
        const speech = new SpeechSynthesisUtterance(text);

        speech.rate = 0.9;
        speech.pitch = 1;
        speech.volume = 1;

        speechSynthesis.speak(speech);
    }, 1000);
};

export const stopAlertSpeech = () => {
    if (speechInterval) {
        window.clearInterval(speechInterval);
    }

    speechSynthesis.cancel();
};