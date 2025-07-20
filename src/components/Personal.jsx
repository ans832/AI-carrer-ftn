import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Booking from './Booking.jsx';
import AuthModal from './AuthModal.jsx';
import { isTokenValid } from '../utils/Auth.jsx'; 
import { toast } from 'react-hot-toast';
const teamMembers = [
    {
        name: "Rajan Verma",
        role: "Software Engineer at google",
        experience: "4 years",
        email: "anshgupta911821@gmail.com",
        img: "https://spacema-dev.com/elevate/assets/images/team/1.jpg"
    },
    {
        name: "Mohd Ajeem",
        role: "Graphic Designer at oracle",
        experience: "2 years",
        email: "ajeem8119@gmail.com",
        img: "https://spacema-dev.com/elevate/assets/images/team/4.jpg"
    },
    {
        name: "Mohd Zaid",
        role: "Marketing Manager at facebook",
        experience: "3 years",
        email: "mohzaid035@gmail.com",
        img: "https://spacema-dev.com/elevate/assets/images/team/3.jpg"
    },
    {
        name: "Ravi Kumar",
        role: "SEO Specialist at google",
        experience: "5 years",
        email: "rajan.verma@gmail.com",
        img: "https://spacema-dev.com/elevate/assets/images/team/2.jpg"
    },
    {
        name: "Khemendra gangwar",
        role: "professor of Computer Science at university",
        experience: "8 years",
        email: "rajan.verma@gmail.com",
        img: "https://spacema-dev.com/elevate/assets/images/team/5.jpg"
    },
    {
        name: "DR abhishek saxena",
        role: "HOD of Computer Science at university",
        experience: "10 years",
        email: "rajan.verma@gmail.com",
        img: "https://spacema-dev.com/elevate/assets/images/team/6.jpg"
    },
    {
        name: "Wazih Ahmed",
        role: "Dean of computer Science at university",
        experience: "12 years",
        email: "rajan.verma@gmail.com",
        img: "https://spacema-dev.com/elevate/assets/images/team/7.jpg"
    },
    {
        name: "DR Hemant yadav",
        role: "director of computer Science at university",
        experience: "15 years",
        email: "rajan.verma@gmail.com",
        img: "https://spacema-dev.com/elevate/assets/images/team/8.jpg"
    },
];



const Personal = () => {
      const navigate = useNavigate();
     const [showAuthModal, setShowAuthModal] = useState(false);
    

const handleAIGuidanceClick = (member) => {
    
    if (isTokenValid()) {
        toast.success('You are logged in, redirecting to booking page...');
       localStorage.setItem('selectedGuide', JSON.stringify(member));
       navigate('/Booking', { state: { guide: member } });

    } else {
        toast.error('Please log in to book a session.');
        setShowAuthModal(true);
    }
};


    const handleAuthSuccess = () => {
        setShowAuthModal(false);
        navigate('/Booking');
    };
  

   


    return (
        <>
        
        {showAuthModal && (
                        <AuthModal
                            onSuccess={handleAuthSuccess}
                            onClose={() => setShowAuthModal(false)}
                        />
                    )}
        <section id="our-team" className="bg-white-800 py-32">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Meet Our Guides</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md p-6 my-6 text-center hover:shadow-lg transition-shadow duration-300"
                        >
                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-full rounded-full mb-4 object-cover aspect-square"
                            />
                            <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                            <p className="text-gray-700">{member.role}</p>
                            <p className="text-gray-700">{member.experience}</p>
                            <button  onClick={() => handleAIGuidanceClick(member)}  className='mt-4 bg-yellow-800 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300'>
                                Book Session
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        </>
    );
};

export default Personal;

