import React from 'react'
const partners = [
  { name: "IIT Kanpur", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/IIT_Kanpur_Logo.svg/512px-IIT_Kanpur_Logo.svg.png" },
  { name: "NIT Trichy", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/NIT_Trichy_Logo.svg/512px-NIT_Trichy_Logo.svg.png" },
  { name: "IIM Lucknow", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/IIM_Lucknow_Logo.svg/512px-IIM_Lucknow_Logo.svg.png" },
  { name: "BITS Pilani", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/BITS_Pilani-Logo.svg/512px-BITS_Pilani-Logo.svg.png" },
];


const Partners = () => {
  return (
 <div className="min-h-screen bg-gray-900 py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-yellow-100 mb-8 mt-20">Our Academic Partners</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-center">
        {partners.map((partner, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-4 flex flex-col items-center hover:shadow-md transition">
            <img src={partner.logo} alt={partner.name} className="h-20 object-contain mb-2" />
            <p className="text-sm text-center text-red-700 font-medium">{partner.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}


export default Partners
