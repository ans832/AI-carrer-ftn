import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chat = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'AI', text: "Hellooo! (say HII to start)", type: 'received' },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [awaitingQuizAnswers, setAwaitingQuizAnswers] = useState(false);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [quizAnswers, setQuizAnswers] = useState({});
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

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
        const text = input.trim();
        setInput('');
        setLoading(true);

        try {
            const res = await axios.post("https://careerbackend-1-hoxd.onrender.com/api/chat", { message: text });
            const aiText = res.data.response;

            if (aiText.includes("Please answer with yes/no for each:")) {
                const lines = aiText.split('\n').slice(1);
                const questions = lines.map(line => {
                    const match = line.match(/^(\d+)\.\s(.+)$/);
                    return match ? { id: Number(match[1]), question: match[2] } : null;
                }).filter(Boolean);
                setQuizQuestions(questions);
                setAwaitingQuizAnswers(true);
            }

            const aiMessage = {
                id: messages.length + 2,
                sender: 'AI',
                text: aiText,
                type: 'received'
            };
            setMessages(prev => [...prev, aiMessage]);
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

    const handleQuizAnswerChange = (id, value) => {
        setQuizAnswers(prev => ({ ...prev, [id]: value.trim().toLowerCase() }));
    };

    const handleQuizSubmit = async () => {
        const answersArray = quizQuestions.map(q => quizAnswers[q.id] || '');
        if (answersArray.some(a => a !== 'yes' && a !== 'no')) {
            setMessages(prev => [...prev, {
                id: prev.length + 1,
                sender: 'AI',
                text: "❌ Please answer each question with 'yes' or 'no'.",
                type: 'received'
            }]);
            return;
        }

        const answersString = answersArray.join(',');

        setMessages(prev => [...prev, {
            id: prev.length + 1,
            sender: 'AI',
            text: "Analyzing your quiz responses... Please wait.",
            type: 'received'
        }]);
        setLoading(true);

        try {
            const res = await axios.post("https://careerbackend-1-hoxd.onrender.com/api/chat", { message: answersString });
            const aiMessage = {
                id: messages.length + 2,
                sender: 'AI',
                text: res.data.response,
                type: 'received'
            };
            setMessages(prev => [...prev, aiMessage]);
            setQuizQuestions([]);
            setQuizAnswers({});
            setAwaitingQuizAnswers(false);
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

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        setMessages(prev => [...prev, {
            id: prev.length + 1,
            sender: 'AI',
            text: "Analyzing your resume... Please wait.",
            type: 'received'
        }]);

        try {
            const formData = new FormData();
            formData.append("resume", file);

            const res = await axios.post("https://careerbackend-1-hoxd.onrender.com/api/upload-resume", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setMessages(prev => [...prev, {
                id: prev.length + 2,
                sender: 'AI',
                text: res.data.response,
                type: 'received'
            }]);
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, {
                id: prev.length + 2,
                sender: 'AI',
                text: "❌ Error analyzing resume. Please try again.",
                type: 'received'
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-8 mt-10">
            <input
                type="file"
                accept=".pdf,.doc,.docx"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
            />

            <div className="w-full max-w-md bg-white rounded-2xl shadow p-6 space-y-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xl font-semibold text-gray-700">AI</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Career Chatbot</h1>
                </div>

                <div className="h-96 overflow-y-auto bg-gray-50 p-4 rounded-xl space-y-4">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.type === 'sent' ? 'justify-end' : 'items-start space-x-2'}`}>
                            {msg.type === 'received' && (
                                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                    <span className="text-sm font-medium text-gray-700">AI</span>
                                </div>
                            )}
                            <div className={`p-3 rounded-lg shadow max-w-xs ${msg.type === 'sent' ? 'bg-blue-500' : 'bg-white'}`}>
                                <p className={`text-sm whitespace-pre-line ${msg.type === 'sent' ? 'text-white' : 'text-gray-700'}`}>
                                    {msg.text}
                                </p>
                            </div>
                        </div>
                    ))}

                    {awaitingQuizAnswers && quizQuestions.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800 text-center">Answer the following questions (yes/no)</h2>
                            {quizQuestions.map(q => (
                                <div key={q.id} className="flex flex-col gap-2 bg-white border rounded-lg p-3 shadow">
                                    <p className="text-gray-700 font-medium">{q.id}. {q.question}</p>
                                    <input
                                        type="text"
                                        placeholder="yes / no"
                                        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        onChange={e => handleQuizAnswerChange(q.id, e.target.value)}
                                    />
                                </div>
                            ))}
                            <div className="flex justify-center">
                                <button
                                    onClick={handleQuizSubmit}
                                    disabled={loading}
                                    className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {loading ? "Submitting..." : "Submit Quiz"}
                                </button>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {!awaitingQuizAnswers && (
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <button
                            onClick={() => fileInputRef.current.click()}
                            disabled={loading}
                            className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:opacity-50 text-sm sm:text-base"
                        >
                            Upload Resume
                        </button>
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
                            disabled={loading}
                            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
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
