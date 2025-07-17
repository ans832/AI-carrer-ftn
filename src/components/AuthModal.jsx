import React, { useState } from 'react';
import axios from 'axios';

const AuthModal = ({ onSuccess, onClose }) => {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const sendOtp = async () => {
        if (!email) {
            setError("Please enter your email.");
            return;
        }
        setLoading(true);
        setError('');
        try {
            await axios.post('http://localhost:3000/api/send-otp', { email });
            setOtpSent(true);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

   const verifyOtp = async () => {
    if (!otp) {
        setError("Please enter the OTP.");
        return;
    }
    setLoading(true);
    setError('');
    try {
        const response = await axios.post('http://localhost:3000/api/verify-otp', { email, otp });
        
        // ✅ Store JWT token securely
        localStorage.setItem('token', response.data.token);

        onSuccess(); // continue to dashboard or close modal
    } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || 'Invalid OTP. Please try again.');
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-xl w-80 space-y-4 shadow-lg animate-fade-in">
                <h2 className="text-lg font-bold text-center">Email Verification</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                {!otpSent ? (
                    <>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                        />
                        <button
                            onClick={sendOtp}
                            disabled={loading}
                            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
                        >
                            {loading ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                        />
                        <button
                            onClick={verifyOtp}
                            disabled={loading}
                            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
                        >
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </>
                )}
                <button
                    onClick={onClose}
                    className="text-blue-500 underline text-sm w-full"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default AuthModal;
