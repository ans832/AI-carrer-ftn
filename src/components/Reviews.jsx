import React from 'react'
const reviews = [
  {
    name: "Ankit Sharma",
    role: "B.Tech Student",
    text: "AI Nav's guidance helped me crack my internship at a startup. The live sessions were clear and actionable.",
    img: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Neha Verma",
    role: "MBA Aspirant",
    text: "The personalized roadmap was accurate and kept me focused. Highly recommend for career clarity.",
    img: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Rahul Singh",
    role: "Job Seeker",
    text: "I found confidence in my interviews after AI Nav’s 1:1 guidance sessions.",
    img: "https://randomuser.me/api/portraits/men/47.jpg"
  },
  {
    name: "Priya Chauhan",
    role: "Engineering Graduate",
    text: "Excellent mentors and clear steps towards my career goal. Loved the detailed feedback.",
    img: "https://randomuser.me/api/portraits/women/50.jpg"
  },
  {
    name: "Mohit Gupta",
    role: "CS Student",
    text: "The project recommendations and resume improvements gave me a headstart in placements.",
    img: "https://randomuser.me/api/portraits/men/52.jpg"
  },
  {
    name: "Sneha Pandey",
    role: "Data Analyst",
    text: "The career strategy session helped me transition into a data role confidently.",
    img: "https://randomuser.me/api/portraits/women/65.jpg"
  },
];
const Reviews = () => {
  return (
      <div className="min-h-screen bg-gray-900 py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8 mt-20">What Our Users Say</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
            <img src={review.img} alt={review.name} className="w-20 h-20 rounded-full object-cover mb-4" />
            <h3 className="font-semibold text-lg text-gray-800">{review.name}</h3>
            <p className="text-sm text-gray-500">{review.role}</p>
            <p className="mt-3 text-purple-700 text-sm">{review.text}</p>
          </div>
        ))}
      </div>
    </div>

    
  )
}

export default Reviews
