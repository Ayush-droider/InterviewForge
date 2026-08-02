import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Send } from "lucide-react";

export default function ChatInput({
    value,
    onChange,
    onSend,
    disabled,
}) {

    const [listening, setListening] = useState(false);

    const recognitionRef = useRef(null);

    useEffect(() => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.warn("Speech Recognition is not supported.");
            return;
        }

        const recognition = new SpeechRecognition();

        // Better for Indian English
        recognition.lang = "en-IN";

        // Stop after one sentence
        recognition.continuous = false;

        // Return only final transcript
        recognition.interimResults = false;

        // Better recognition
        recognition.maxAlternatives = 3;

        recognition.onresult = (event) => {

            const transcript = event.results[0][0].transcript.trim();

            onChange(transcript);

        };

        recognition.onerror = (event) => {

            console.error("Speech Recognition Error:", event.error);

            setListening(false);

        };

        recognition.onend = () => {

            setListening(false);

        };

        recognitionRef.current = recognition;

        return () => {

            recognition.stop();

        };

    }, [onChange]);

    const toggleListening = () => {

        if (!recognitionRef.current) return;

        if (listening) {

            recognitionRef.current.stop();

            return;

        }

        // Stop AI voice before listening
        window.speechSynthesis.cancel();

        // Optional: clear previous text
        onChange("");

        recognitionRef.current.start();

        setListening(true);

    };

    return (

        <div className="flex items-center gap-3 rounded-2xl border bg-white p-3 shadow">

            <button
                type="button"
                onClick={toggleListening}
                className={`rounded-full p-3 transition ${listening
                        ? "bg-red-500 text-white"
                        : "hover:bg-slate-100"
                    }`}
            >
                {listening ? <MicOff /> : <Mic />}
            </button>

            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {

                    if (e.key === "Enter") {

                        e.preventDefault();

                        onSend();

                    }

                }}
                placeholder={
                    listening
                        ? "🎤 Listening..."
                        : "Type or speak your answer..."
                }
                className="flex-1 outline-none"
            />

            <button
                type="button"
                disabled={disabled}
                onClick={onSend}
                className="rounded-full bg-indigo-600 p-3 text-white disabled:opacity-50"
            >
                <Send size={18} />
            </button>

        </div>

    );

}