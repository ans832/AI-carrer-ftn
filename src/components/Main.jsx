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
                           
                            <h3 className="text-lg font-semibold text-white">{name}</h3>
                            <p className="text-gray-300 mt-2">
                              “As your dedicated career guide, I am committed to helping you navigate your path with clarity and confidence. Together, we will work on building the right strategy for your goals while ensuring each session brings you closer to your aspirations.”
                            </p>
                        </div>
                    ))}
                </div>

                <div className="pt-32 pb-32 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                    {["Why Choose Us?", "What We Offer"].map((title) => (
                        <div className="bg-gray-800 p-6 rounded-xl text-center" key={title}>
                            
                            <h3 className="text-lg font-semibold text-white">{title}</h3>
                            <p className="text-gray-300 mt-2">
                              we wre fastest growing career guidance platform, offering personalized AI-driven solutions to help you achieve your career goals. Our expert guides provide tailored advice, ensuring you have the right roadmap for success.
                            </p>
                        </div>
                    ))}
                </div>

               <footer class="bg-gray-900 text-white pt-12 pb-8">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
    
      <div class="space-y-4">
        <div class="flex items-center">
          <svg class="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span class="ml-2 text-xl font-bold">AI NAV</span>
        </div>
        <p class="text-gray-400">Building innovative solutions for the modern world.</p>
        <div class="flex space-x-4">
          <a href="#" class="text-gray-400 hover:text-white transition">
            <span class="sr-only">Facebook</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-white transition">
            <span class="sr-only">Twitter</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-white transition">
            <span class="sr-only">Instagram</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-white transition">
            <span class="sr-only">LinkedIn</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>

      
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Quick Links</h3>
        <ul class="space-y-2">
          <li><a href="/" class="text-gray-400 hover:text-white transition">Home</a></li>
          <li><a href="/Team" class="text-gray-400 hover:text-white transition">Team</a></li>
          <li><a href="/partners" class="text-gray-400 hover:text-white transition">partners</a></li>
          <li><a href="/review" class="text-gray-400 hover:text-white transition">reviews</a></li>
          <li><a href="/features" class="text-gray-400 hover:text-white transition">Features</a></li>
        </ul>
      </div>

      
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Services</h3>
        <ul class="space-y-2">
          <li><a href="#" class="text-gray-400 hover:text-white transition">career guidance</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white transition">booking a guide </a></li>
          <li><a href="#" class="text-gray-400 hover:text-white transition">book best guide</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white transition">schedule a meeting</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white transition">problem Solutions</a></li>
        </ul>
      </div>

      
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Contact Us</h3>
        <address class="not-italic text-gray-400">
          <p>901/b kanoon goyan</p>
          <p>sector 2 bareilly</p>
          <p class="mt-2">Email: <a href="mailto:info@company.com" class="hover:text-white transition">AINAV@company.com</a></p>
          <p>Phone: <a href="tel:+11234567890" class="hover:text-white transition">+91 9118218424</a></p>
        </address>
      </div>
    </div>

    <div class="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
      <p class="text-gray-500 text-sm mb-4 md:mb-0">© 2025 Company. All rights reserved.</p>
      <div class="flex space-x-6">
        <a href="#" class="text-gray-500 hover:text-white text-sm transition">Privacy Policy</a>
        <a href="#" class="text-gray-500 hover:text-white text-sm transition">Terms of Service</a>
        <a href="#" class="text-gray-500 hover:text-white text-sm transition">Cookies</a>
      </div>
    </div>
  </div>
</footer>
            </section>
        </>
    );
};

export default Main;
