import React from 'react'
import sidebarModel from '../assets/sidebarModel.avif'
import { FaInstagram, FaYoutube, FaFacebook, FaTimes } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation()

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Models", path: "/models" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "contact" },
    { name: "Submission", path: "/Submission" },
  ]

  // ✅ reusable function
  const handleNavClick = (path) => {
    setIsOpen(false)

    if (window.location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div
      className={`
        fixed top-0 left-0 h-screen w-80 bg-cover bg-bottom text-amber-50 pt-8 z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      style={{ backgroundImage: `url(${sidebarModel})` }}
    >

      {/* CLOSE BUTTON */}
      <button 
        className="lg:hidden absolute top-4 right-4 text-xl"
        onClick={() => setIsOpen(false)}
      >
        <FaTimes />
      </button>

      {/* LOGO */}
      <div className="pl-6 mb-6">
        <Link to="/" onClick={() => handleNavClick("/")}>
          <img 
            src="/logo.png" 
            alt="logo" 
            className="h-20 lg:h-16 xl:h-20 object-contain transition-all duration-300 cursor-pointer" 
          />
        </Link>
      </div>

      {/* MENU */}
      <div className='flex flex-col justify-center h-[60vh] gap-6 pl-10 text-lg'>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => handleNavClick(link.path)}
            className={`transition ${
              location.pathname === link.path
                ? "text-white font-semibold"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* FOOTER */}
      <div className='absolute bottom-0 w-full bg-black/70 p-6'>
        
        <div className='flex gap-5 mb-4 text-xl'>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-pink-500 cursor-pointer transition transform hover:scale-110" />
          </a>

          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="hover:text-blue-500 cursor-pointer transition transform hover:scale-110" />
          </a>

          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="hover:text-red-500 cursor-pointer transition transform hover:scale-110" />
          </a>
        </div>

        <span className="text-sm text-gray-400">© 2026 Runway</span>
      </div>

    </div>
  )
}

export default Sidebar