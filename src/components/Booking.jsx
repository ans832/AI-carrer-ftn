import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';


const Booking = () => {
    const location = useLocation();
    const [guide, setGuide] = useState(location.state?.guide || null);

      useEffect(() => {
          if (!guide) {
              const storedGuide = localStorage.getItem('selectedGuide');
              if (storedGuide) {
                  setGuide(JSON.parse(storedGuide));
              }
          }
      }, [guide]);

      useEffect(() => {
          if (guide) {
              console.log('Selected Guide:', guide.email);
          }
      }, [guide]);

    const [selectedPlan, setSelectedPlan] = useState('Standard guidance');
    const [dates, setDates] = useState({
    firstDate: '',
    lastDate: ''
});


    const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
});

    const navigate = useNavigate();


  const handleConfirmBooking = async (e) => {
    e.preventDefault();

            let amount = 1;
        if (selectedPlan === 'Deluxe guidance') amount = 1800;
        if (selectedPlan === 'Executive guidance') amount = 2800;

    try {
        const { data } = await axios.post("https://careerbackend-1-hoxd.onrender.com/api/create-order", {
            amount,
        });
        

        const options = {
            key: 'rzp_live_AsdrTTugwJyHR3', // replace with your Razorpay key_id
            amount: data.amount,
            currency: data.currency,
            name: 'AI Career Nav',
            description: 'Live Session Booking',
            order_id: data.id,
            handler: async function (response) {
               const storedGuide = JSON.parse(localStorage.getItem('selectedGuide'));
               const guideEmail = storedGuide?.email || '';
        toast.success(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        try {
          await axios.post("https://careerbackend-1-hoxd.onrender.com/api/create-booking", {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        selectedPlan,
        amount,
        paymentId: response.razorpay_payment_id,
        dates,
        guideEmail
      // send to backend
    });
    

        navigate('/');
    } catch (error) {
        console.error('Error saving booking:', error);
        toast.error('Payment succeeded, but failed to save booking.');
    }
},


            prefill: {
                name: formData.fullName || '',
                email: formData.email || '',
                contact: formData.phone || '',
            },
            theme: {
                color: '#3399cc',
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    } catch (error) {
        console.error(error);
        toast.error('Failed to initiate payment');
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-900 mt-20">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-6 px-8 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Book Guide For live Session</h1>
                <p className="text-blue-100"> 1:1 personal career guide for you :</p>
              </div>
              <div className="text-4xl">
                <i className="fas fa-hotel"></i>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Book Your Session</h2>

            {/* Guest Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Your Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
               <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
  <input
    type="text"
    required
    value={formData.fullName}
    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  />
</div>
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
  <input
    type="email"
    required
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  />
</div>
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
  <input
    type="text"
    required
    value={formData.phone}
    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  />
</div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                  <select
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {['1 Guest', '2 Guests', '3 Guests', '4 Guests', 'More than 4'].map((g, idx) => (
                      <option key={idx}>{g}</option>
                    ))}
                  </select>
                </div> */}
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Session between</h3>
              <div className="grid md:grid-cols-2 gap-6">
               <div className="grid md:grid-cols-2 gap-6">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">First Date</label>
    <input
      type="date"
      required
      value={dates.firstDate}
      onChange={(e) => setDates({ ...dates, firstDate: e.target.value })}
      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Last Date</label>
    <input
      type="date"
      required
      value={dates.lastDate}
      onChange={(e) => setDates({ ...dates, lastDate: e.target.value })}
      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
</div>

              </div>
            </div>

            {/* Room Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Duration</h3>
              <div className="grid md:grid-cols-3 gap-4">
                        {[
                { name: 'Standard guidance', price: '1200/hour', details: 'one Time guidance' },
                { name: 'Deluxe guidance', price: '1800/hour', details: 'One Time guidance + additional support(1 month)' },
                { name: 'Executive guidance', price: '2800/hour', details: 'Two Time guidance + additional support(6 months)' }
            ].map((room, idx) => (
                <label
                    key={idx}
                    className="border rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 cursor-pointer"
                >
                    <input
                        type="radio"
                        name="roomType"
                        value={room.name}
                        checked={selectedPlan === room.name}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                        className="hidden peer"
                    />
                    <div className="peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:ring-2 peer-checked:ring-blue-200 border rounded-lg p-3">
                        <div className="flex justify-between">
                            <h4 className="font-medium text-gray-800">{room.name}</h4>
                            <span className="text-blue-600 font-bold">{room.price}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{room.details}</p>
                    </div>
                </label>
            ))}

              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
              <textarea
                rows="3"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any special requirements or preferences..."
              ></textarea>
            </div>

            {/* Payment and Submit */}
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  I agree to Booking Ituze's <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a> and{' '}
                  <a href="#" className="text-blue-600 hover:underline">Cancellation Policy</a>
                </label>
              </div>

             <button
                onClick={handleConfirmBooking}
                type="button"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white font-bold text-lg shadow-md hover:shadow-lg transition duration-300"
            >
                <i className="fas fa-calendar-check mr-2"></i> Confirm Booking & Pay
            </button>
            </div>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {[
                { icon: 'fa-phone-alt', text: '+91 9118218425' },
                { icon: 'fa-envelope', text: 'AI-careernav@gmail.com' },
                { icon: 'fa-map-marker-alt', text: 'bahedi bareilly up' }
              ].map((item, idx) => (
                <div key={idx} className="text-sm text-gray-600 mb-2 md:mb-0 flex items-center gap-1">
                  <i className={`fas ${item.icon}`}></i> {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking;
