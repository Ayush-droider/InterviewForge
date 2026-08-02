import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import DashboardLayout from "@/layouts/DashboardLayout";
import { speak, stopSpeaking } from "@/utils/speech";

import ChatBubble from "@/components/interview/ChatBubble";
import ChatInput from "@/components/interview/ChatInput";
import TypingIndicator from "@/components/interview/TypingIndicator";
import ChatHeader from "@/components/interview/ChatHeader";

import {
    submitAnswer,
    getInterview,
} from "@/services/interviewService";

import toast from "react-hot-toast";

const createMessage = ({
    sender,
    text,
    topic = null,
    difficulty = null,
}) => ({
    id: crypto.randomUUID(),
    sender,
    text,
    topic,
    difficulty,
});

export default function InterviewSession() {

    const navigate = useNavigate();
    const { id } = useParams();
    const { state } = useLocation();

    const [interview, setInterview] = useState(
        state?.interview ?? null
    );

    const [answer, setAnswer] = useState("");

    const [loading, setLoading] = useState(false);

    const [typing, setTyping] = useState(false);

    const conversationRef = useRef(null);

    const [messages, setMessages] = useState(() => {

        if (!state?.interview?.currentQuestion) {
            return [];
        }

        return [
            createMessage({
                sender: "AI",
                text: state.interview.currentQuestion.questionText,
                topic: state.interview.currentQuestion.topic,
                difficulty: state.interview.currentQuestion.difficulty,
            }),
        ];

    });

    /*
     * Load interview if user opened from history
     * or refreshed the page.
     */
    useEffect(() => {

        if (interview) return;

        const loadInterview = async () => {

            try {

                const data = await getInterview(id);

                setInterview(data);

                if (data.currentQuestion) {

                    setMessages([
                        createMessage({
                            sender: "AI",
                            text: data.currentQuestion.questionText,
                            topic: data.currentQuestion.topic,
                            difficulty: data.currentQuestion.difficulty,
                        }),
                    ]);

                } else {

                    navigate(`/interview/${id}/scorecard`);

                }

            } catch (e) {

                console.error(e);

                toast.error("Unable to load interview.");

                navigate("/history");

            }

        };

        loadInterview();

    }, [id, interview, navigate]);

    useEffect(() => {

        conversationRef.current?.scrollTo({
            top: conversationRef.current.scrollHeight,
            behavior: "smooth",
        });

    }, [messages, typing]);

    useEffect(() => {

        if (!messages.length) return;

        const lastMessage = messages[messages.length - 1];

        if (lastMessage.sender === "AI") {
            speak(lastMessage.text);
        }

    }, [messages]);

    useEffect(() => {

        return () => {
            stopSpeaking();
        };

    }, []);

    if (!interview) {

        return (
            <DashboardLayout>
                <div className="flex h-[70vh] items-center justify-center text-xl font-semibold">
                    Loading Interview...
                </div>
            </DashboardLayout>
        );

    }

    const question = interview.currentQuestion;

    const handleNext = async () => {

        if (!answer.trim()) {

            toast.error("Please answer the question.");

            return;

        }

        const userAnswer = answer;

        setMessages(previous => [

            ...previous,

            createMessage({
                sender: "USER",
                text: userAnswer,
            }),

        ]);

        setAnswer("");

        setTyping(true);

        try {

            setLoading(true);

            const updatedInterview =
                await submitAnswer(interview.id, {

                    questionId: question.id,

                    answerText: userAnswer,

                });

            setTyping(false);

            if (!updatedInterview.currentQuestion) {

                navigate(`/interview/${interview.id}/scorecard`);

                return;

            }

            setInterview(updatedInterview);

            setMessages(previous => [

                ...previous,

                createMessage({

                    sender: "AI",

                    text: updatedInterview.currentQuestion.questionText,

                    topic: updatedInterview.currentQuestion.topic,

                    difficulty: updatedInterview.currentQuestion.difficulty,

                }),

            ]);

        } catch (e) {

            console.error(e);

            setTyping(false);

            toast.error("Failed to submit answer.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <DashboardLayout>

            <div className="mx-auto flex h-[85vh] max-w-5xl flex-col overflow-hidden rounded-3xl bg-slate-100 shadow-lg">

                <ChatHeader role={interview.targetRole} />

                <div
                    ref={conversationRef}
                    className="flex-1 space-y-6 overflow-y-auto p-6"
                >

                    {messages.map((message) => (

                        <div key={message.id}>

                            <ChatBubble
                                sender={message.sender}
                                message={message.text}
                            />

                            {message.sender === "AI" &&
                                message.topic && (

                                    <div className="ml-14 mt-3 flex gap-3">

                                        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-600">

                                            {message.topic}

                                        </span>

                                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-600">

                                            {message.difficulty}

                                        </span>

                                    </div>

                                )}

                        </div>

                    ))}

                    {typing && <TypingIndicator />}

                </div>

                <div className="border-t bg-white p-5">

                    <ChatInput
                        value={answer}
                        onChange={setAnswer}
                        onSend={handleNext}
                        disabled={loading}
                    />

                </div>

            </div>

        </DashboardLayout>

    );

}