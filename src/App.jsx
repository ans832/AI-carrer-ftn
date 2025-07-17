import React from 'react';
import './App.css';
import Head from './components/Head';
import Main from './components/Main';
import Chat from './components/Chat';
import Personal from './components/Personal';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Booking from './components/Booking.jsx';

function App() {
  return (
    <BrowserRouter>
      <Head />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/Booking" element={<Booking />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
