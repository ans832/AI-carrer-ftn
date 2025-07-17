import React from 'react';
import { useState } from 'react';
import banner from '../image/th.jpg';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal.jsx';
import { isTokenValid } from '../utils/Auth.jsx'; // ✅ import the utility

const Main = () => {
    const navigate = useNavigate();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleAIGuidanceClick = () => {
        if (isTokenValid()) {
            console.log("✅ Valid token found. Navigating directly to /chat.");
            navigate('/chat');
        } else {
            console.log("❌ No valid token. Opening AuthModal.");
            setShowAuthModal(true);
        }
    };

    const handlePersonalGuidanceClick = () => {
        navigate('/personal');
    };

    const handleAuthSuccess = () => {
        setShowAuthModal(false);
        navigate('/chat');
    };

    return (
        <>
            {showAuthModal && (
                <AuthModal
                    onSuccess={handleAuthSuccess}
                    onClose={() => setShowAuthModal(false)}
                />
            )}

            <section className="text-gray-600 body-font bg-gray-900">
                {/* Hero Section */}
                <div className="max-w-5xl pt-52 pb-24 mx-auto">
                    <h1 className="text-5xl text-center font-bold text-white mb-6">
                        Navigate your career with AI in the right direction
                    </h1>
                    <h2 className="text-2xl font-semibold text-gray-300 text-center mb-6">
                        Your career path is now easier than ever to explore.
                        We are with you for guidance and support.
                    </h2>

                    <div className="text-center">
                        <button
                            onClick={handlePersonalGuidanceClick}
                            className="inline-flex items-center py-3 font-semibold text-black bg-white px-7 rounded shadow hover:bg-gray-200 transition"
                        >
                            <span>Personal Guidance</span>
                        </button>
                        <button
                            onClick={handleAIGuidanceClick}
                            className="inline-flex items-center py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-800 px-10 rounded shadow ml-4 hover:from-blue-600 hover:to-blue-900 transition"
                        >
                            <span>AI Guidance</span>
                        </button>
                    </div>
                </div>

                {/* Your existing sections remain untouched */}
                <div className="container flex flex-col items-center justify-center mx-auto">
                    <img
                        className="object-cover object-center w-3/4 mb-10 border shadow-md rounded"
                        alt="Placeholder"
                        src={banner}
                    />
                </div>

                <h2 className="pt-40 mb-1 text-4xl font-semibold text-center text-gray-200">
                    Our Highly Rated Guides
                </h2>
                <p className="mx-auto text-xl text-center text-gray-300 mt-4 max-w-2xl">
                    Here is our collection of best professional guides, based on ratings
                </p>

                <div className="pt-12 pb-24 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                    {["Mohd Ajeem", "Ravi Gupta", "Wazih Khan", "Mohd Zaid"].map((name) => (
                        <div className="bg-gray-800 p-6 rounded-xl text-center" key={name}>
                            <img className="w-12 mx-auto mb-4" src="https://nine4.app/favicon.png" alt={name} />
                            <h3 className="text-lg font-semibold text-white">{name}</h3>
                            <p className="text-gray-300 mt-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
                                tincidunt a libero in finibus. Maecenas a nisl vitae ante rutrum
                                porttitor.
                            </p>
                        </div>
                    ))}
                </div>

                <div className="pt-32 pb-32 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                    {["Why Choose Us?", "What We Offer"].map((title) => (
                        <div className="bg-gray-800 p-6 rounded-xl text-center" key={title}>
                            <img className="w-16 mx-auto mb-4" src="https://nine4.app/images/nine4-3.png" alt={title} />
                            <h3 className="text-lg font-semibold text-white">{title}</h3>
                            <p className="text-gray-300 mt-2">
                                Fusce pharetra ligula mauris, quis faucibus lectus elementum vel.
                                Nullam vehicula, libero at euismod tristique, neque ligula faucibus
                                urna, quis ultricies massa enim in nunc.
                            </p>
                        </div>
                    ))}
                </div>

                <section className="relative pb-24 bg-gray-900">
                    <div className="max-w-4xl mx-auto text-center px-4">
                        <h1 className="mb-5 text-4xl md:text-5xl font-bold text-white">
                            For other queries, feel free to contact us
                        </h1>
                        <p className="mb-6 text-lg text-gray-300">
                            Enter your email address, and we will reach out to you.
                        </p>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                            <input
                                type="email"
                                placeholder="jack@example.com"
                                name="email"
                                autoComplete="email"
                                className="border border-gray-600 w-72 p-3 rounded-md text-gray-800"
                            />
                            <button
                                className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
};

export default Main;
