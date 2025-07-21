import React from 'react'
import { useState, useEffect, useRef } from 'react';
import Profile from './Profile.jsx';
import { useNavigate } from 'react-router-dom';
import Features from './Features.jsx';

const Head = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const profileRef = useRef();
  const navigate = useNavigate();

  const feats = () => {
    navigate('/Features');
  }
  const ptns = () => {
    navigate('/Partners');
  } 
  const tms = () => {
    navigate('/Booked');
  }
  const rvws = () => {
    navigate('/Reviews');
  }

     useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

   
 
   return (
     <header className="fixed top-0 left-0 w-full bg-gray-900 z-50">
       <div className="max-w-5xl mx-auto flex flex-wrap p-5 flex-col md:flex-row">
         <div className="flex flex-row items-center justify-between p-3 md:p-1">
           <a
             href="/"
             class="flex text-3xl text-white font-medium mb-4 md:mb-0"
           > AI-Career-Navigator
           </a>
           <button
             className="text-white pb-4 cursor-pointer leading-none px-3 py-1 md:hidden outline-none focus:outline-none content-end ml-auto"
             type="button"
             aria-label="button"
             onClick={() => setNavbarOpen(!navbarOpen)}
           >
             <svg
               xmlns="http://www.w3.org/2000/svg"
               width="24"
               height="24"
               viewBox="0 0 24 24"
               fill="none"
               stroke="white"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
               className="feather feather-menu"
             >
               <line x1="3" y1="12" x2="21" y2="12"></line>
               <line x1="3" y1="6" x2="21" y2="6"></line>
               <line x1="3" y1="18" x2="21" y2="18"></line>
             </svg>
           </button>
         </div>
         <div
           className={
             "md:flex flex-grow items-center" +
             (navbarOpen ? " flex" : " hidden")
           }
         >
           <div class="md:ml-auto md:mr-auto font-4 pt-1 md:pl-14 pl-1 flex flex-wrap items-center md:text-base text-1xl md:justify-center justify-items-start">
             <a onClick={feats} class="mr-11 pr-2 cursor-pointer text-gray-300 hover:text-white font-semibold tr04">
               Features
             </a>
             <div className="relative">
               <button onClick={ptns}
                 type="button"
                 className="
                    group rounded-md text-gray-300 inline-flex items-center text-base font-medium focus:outline-none pb-8'
                   "
               
               >
                 <span className="tr04">Partnerships</span>
               
               </button>
              
             </div>
             <a   onClick={rvws} class="mr-12 md:ml-11 ml-0 cursor-pointer text-gray-300 hover:text-white font-semibold tr04">
               Reviews
             </a>
             <a onClick={tms} class="mr-5 cursor-pointer text-gray-300 hover:text-white font-semibold tr04">
               Bookings
             </a>
           </div>
          
           <div className="relative" ref={profileRef}>
      {/* Profile Logo */}
      <div
        className="ml-3 h-10 w-10 overflow-hidden rounded-full cursor-pointer"
        onClick={() => setShowProfile(!showProfile)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-10 w-10 p-2.5 text-white bg-gray-500 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>

      {/* Conditional Profile Panel */}
      {showProfile && <Profile />}
    </div>


         </div>
       </div>
     </header>
   );
}

export default Head
