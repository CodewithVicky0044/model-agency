import React from "react"
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"

const Footer = () => {
  return (
    <div className="bg-[#111] text-white pt-16 pb-6 px-6 md:px-16 relative">

      {/* TOP GRID */}
      <div className="grid md:grid-cols-3 gap-10 items-start">

        {/* LEFT - LOGO + LINKS */}
        <div>
          <h2 className="text-2xl tracking-widest font-light mb-2">
           RUNWAY DREAMS
          </h2>
          <p className="text-sm text-gray-400 mb-6 tracking-widest">
            TALENTS
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <a href="#">Home</a>
            <a href="#">Models</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
        </div>

        {/* CENTER - MAP */}
        <div>
          <h3 className="mb-4 font-semibold">Location</h3>

          <iframe
            title="map"
            src="https://www.google.com/maps?q=Sikar%20Rajasthan&output=embed"
            className="w-full h-40 border-0 rounded"
            loading="lazy"
          ></iframe>
        </div>

        {/* RIGHT - CONTACT */}
        <div>
          <h3 className="mb-4 font-semibold">Contact</h3>

          <div className="flex items-center gap-3 mb-3 text-gray-400 text-sm">
            <FaPhone size={16} />
            <span>+91 9602347639</span>
          </div>

          <div className="flex items-center gap-3 mb-3 text-gray-400 text-sm">
            <FaEnvelope size={16} />
            <span>runwaydreams00@gmail.com</span>
          </div>

          <div className="flex items-center gap-3 text-gray-400 text-sm">
            <FaMapMarkerAlt size={16} />
            <span>Sikar</span>
          </div>
        </div>

      </div>

      {/* LINE */}
      <div className="border-t border-gray-800 mt-10 pt-4 text-center text-gray-500 text-sm">
        Copyright © 2026 Runway Dreams. All rights reserved.
      </div>

    </div>
  )
}

export default Footer