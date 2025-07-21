import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Head from './components/Head';
import Main from './components/Main';
import Chat from './components/Chat';
import Personal from './components/Personal';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Booking from './components/Booking.jsx';
import { Toaster } from 'react-hot-toast';
import Team from './components/Team';
import Partners from './components/Partners';
import Reviews from './components/Reviews';
import Features from './components/Features.jsx';
import Booked from './components/Booked';

function App() {
   const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // Retrieve from localStorage if stored during login
        const email = localStorage.getItem('userEmail');
        if (email) {
            setUserEmail(email);
        }
    }, []);
  return (
    <BrowserRouter>
      <Head userEmail={userEmail} />
       <Toaster position="top-center" />
      <Routes>
       
        <Route path="/" element={<Main />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/Team" element={<Team />} />
        <Route path="/Partners" element={<Partners />} />
        <Route path="/Reviews" element={<Reviews />} />
        <Route path="/Features" element={<Features />} />
        <Route path="/Booked" element={<Booked userEmail={userEmail} />} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
