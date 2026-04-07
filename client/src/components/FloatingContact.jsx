import React from "react"
import { FaWhatsapp, FaPhone, FaEnvelope } from "react-icons/fa"

const FloatingContact = () => {
  return (
    <div className="fixed right-5 bottom-10 flex flex-col gap-4 z-50">

      {/* WhatsApp */}
      <a href="https://wa.me/919602347639" target="_blank" rel="noopener noreferrer">
        <div className="bg-green-500 p-3 rounded-full text-white shadow-lg hover:scale-110 transition">
          <FaWhatsapp size={20} />
        </div>
      </a>

      {/* Call */}
      <a href="tel:9602347639">
        <div className="bg-blue-500 p-3 rounded-full text-white shadow-lg hover:scale-110 transition">
          <FaPhone size={20} />
        </div>
      </a>

      {/* Email */}
      <a href="mailto:runwaydreams00@gmail.com">
        <div className="bg-red-500 p-3 rounded-full text-white shadow-lg hover:scale-110 transition">
          <FaEnvelope size={20} />
        </div>
      </a>

    </div>
  )
}

export default FloatingContact