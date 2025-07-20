import React from 'react'

const team = [
  { name: "mohd ajeem (leader)", role: "ML/AI Engineer", img: "https://randomuser.me/api/portraits/men/30.jpg" },
  { name: "mohd zaid", role: "Frontend Developer", img: "https://randomuser.me/api/portraits/women/35.jpg" },
  { name: "Ansh Gupta", role: "BACKEND Specialist", img: "https://randomuser.me/api/portraits/men/40.jpg" },
  { name: "rajan Verma", role: "CI/CD Designer", img: "https://randomuser.me/api/portraits/women/42.jpg" },
];

const Team = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-yellow-100 mb-8 mt-20">Meet Our Team</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {team.map((member, idx) => (
          <div key={idx} className="bg-gray-50 rounded-xl shadow p-4 flex flex-col items-center hover:bg-pink-50 transition">
            <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full object-cover mb-3" />
            <h3 className="font-semibold text-gray-800">{member.name}</h3>
            <p className="text-sm text-red-500">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;