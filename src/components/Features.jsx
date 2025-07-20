import React from 'react'

const features = [
  { title: "1:1 Live Guidance", description: "Personalized career sessions tailored to your goals." },
  { title: "AI Roadmap Generation", description: "Custom study and project plans using AI insights." },
  { title: "Resume Review", description: "Get your resume optimized for your target job profiles." },
  { title: "Interview Prep", description: "Mock interviews and question banks to build confidence." },
  { title: "Project Suggestions", description: "Build projects that align with your dream roles." },
  { title: "Continuous Support", description: "Post-session support for your follow-up queries." },
];

const Features = () => {
  return (
     <div className="min-h-screen bg-grey-900 py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-yellow-100 mb-8 mt-20">Features We Offer</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-gray-50 rounded-lg shadow-sm p-6 hover:bg-purple-50 transition">
            <h3 className="font-semibold text-lg text-orange-800 mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}



export default Features
