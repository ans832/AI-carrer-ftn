// Fully working React Chat + Quiz UI with auto-scroll and quiz loading feedback

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { flushSync } from 'react-dom';


const Chat = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'AI', text: "Hellooo!", type: 'received' },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [quizQuestions, setQuizQuestions] = useState(null);
    const [quizAnswers, setQuizAnswers] = useState({});

    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom on new message
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;
        const userMessage = {
            id: messages.length + 1,
            sender: 'You',
            text: input.trim(),
            type: 'sent'
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            if (quizQuestions) {
                // Ignore free text during quiz
                setLoading(false);
                return;
            }

            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, { message: userMessage.text });

            if (res.data.response.type === "quiz") {
                setQuizQuestions(res.data.response.questions);
            } else {
                const aiMessage = {
                    id: messages.length + 2,
                    sender: 'AI',
                    text: res.data.response,
                    type: 'received'
                };
                setMessages(prev => [...prev, aiMessage]);
            }
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, {
                id: messages.length + 2,
                sender: 'AI',
                text: "Sorry, something went wrong.",
                type: 'received'
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleQuizAnswerChange = (id, answer) => {
        setQuizAnswers(prev => ({ ...prev, [id]: answer }));
    };

const handleQuizSubmit = async () => {
    const answersArray = quizQuestions.map(q => ({
        id: q.id,
        answer: quizAnswers[q.id] || ""
    }));

    // 1️⃣ Force immediate rendering of "Analyzing..." message
    flushSync(() => {
        setMessages(prev => [
            ...prev,
            {
                id: prev.length + 1,
                sender: 'AI',
                text: "Analyzing your quiz responses... Please wait.",
                type: 'received'
            }
        ]);
    });

    // 2️⃣ Now set loading for disabling inputs/buttons
    setLoading(true);

    try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
            answers: answersArray
        });
        const aiMessage = {
            id: messages.length + 2,
            sender: 'AI',
            text: res.data.response,
            type: 'received'
        };
        setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
        console.error(err);
        setMessages(prev => [
            ...prev,
            {
                id: prev.length + 2,
                sender: 'AI',
                text: "Sorry, something went wrong.",
                type: 'received'
            }
        ]);
    } finally {
        // 3️⃣ Only clear quiz UI AFTER message has been rendered
        setQuizQuestions(null);
        setQuizAnswers({});
        setLoading(false);
    }
};



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-500 p-4 mt-10">
            <div className="w-full max-w-md bg-white rounded-2xl shadow p-6 space-y-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xl font-semibold text-gray-700">AI</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Career Chatbot</h1>
                </div>

                <div className="h-96 overflow-y-auto bg-gray-50 p-4 rounded-xl space-y-4">
                    {messages.map(msg => (
                        msg.type === 'received' ? (
                            <div key={msg.id} className="flex items-start space-x-2">
                                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                    <span className="text-sm font-medium text-gray-700">AI</span>
                                </div>
                                <div className="bg-white p-3 rounded-lg shadow max-w-xs">
                                    <p className="text-sm text-red-700 whitespace-pre-line">{msg.text}</p>
                                </div>
                            </div>
                        ) : (
                            <div key={msg.id} className="flex justify-end">
                                <div className="bg-blue-500 p-3 rounded-lg shadow max-w-xs">
                                    <p className="text-sm text-white whitespace-pre-line">{msg.text}</p>
                                </div>
                            </div>
                        )
                    ))}

                  {quizQuestions && (
    <div className="space-y-4">
        {quizQuestions.map(q => (
            <div key={q.id} className="flex items-center space-x-4">
                <p className="font-medium text-gray-800 w-2/3">{q.id}. {q.question}</p>
                <input
                    type="text"
                    placeholder="Yes/No"
                    className="flex-grow p-2 border rounded"
                    onChange={e => handleQuizAnswerChange(q.id, e.target.value)}
                />
            </div>
        ))}
        <div className="flex justify-center">
            <button
                onClick={handleQuizSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                disabled={loading}
            >
                Submit Quiz
            </button>
        </div>
    </div>
)}

                    <div ref={messagesEndRef} />
                </div>

                {!quizQuestions && (
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder={loading ? "AI is typing..." : "Type your message..."}
                            className="flex-grow p-3 rounded-lg border focus:outline-none"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSend()}
                            disabled={loading}
                        />
                        <button
                            onClick={handleSend}
                            className={`bg-blue-500 text-white p-3 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            Send
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
