import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Booked = ({ userEmail }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                console.log('Fetching bookings for:', userEmail);
                const res = await axios.get(`https://careerbackend-1-hoxd.onrender.com/api/user/${userEmail}`);
                console.log('Bookings fetched:', res.data);
                setBookings(res.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                alert('Error fetching bookings. Check console for details.');
            } finally {
                setLoading(false);
            }
        };

        if (userEmail) {
            fetchBookings();
        } else {
            console.warn('userEmail is undefined; bookings not fetched.');
        }
    }, [userEmail]);

    if (loading) return <div className="text-center mt-20 text-white">Loading your bookings...</div>;

    return (
       <div className="max-w-2xl mx-auto p-4 mt-20">
    <h2 className="text-3xl font-extrabold mb-8 text-center text-gradient bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent animate-fade-in">
        📚 My Bookings
    </h2>

    {bookings.length === 0 ? (
        <p className="text-center text-white text-lg">You have no bookings yet.</p>
    ) : (
        <div className="space-y-6">
            {bookings.map((booking) => (
                <div
                    key={booking._id}
                    className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] border border-gray-700 rounded-2xl p-5 shadow-lg hover:shadow-xl transition duration-300 animate-fade-in"
                >
                    <p className="text-lg text-white">
                        <span className="font-semibold text-blue-400">Selected Plan:</span> {booking.selectedPlan}
                    </p>
                    <p className="text-white">
                        <span className="font-semibold text-blue-400">Session:</span>{" "}
                        {new Date(booking.dates.firstDate).toLocaleDateString()} -{" "}
                        {new Date(booking.dates.lastDate).toLocaleDateString()}
                    </p>
                    <p className="text-white">
                        <span className="font-semibold text-blue-400">Guide Email:</span> {booking.guideEmail}
                    </p>
                    <p className="text-white">
                        <span className="font-semibold text-blue-400">Payment ID:</span> {booking.paymentId}
                    </p>
                    <p className="text-white">
                        <span className="font-semibold text-blue-400">Booked On:</span>{" "}
                        {new Date(booking.createdAt).toLocaleString()}
                    </p>
                </div>
            ))}
        </div>
    )}
</div>

    );
};

export default Booked;
