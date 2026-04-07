import { useState } from "react"
import Sidebar from "./components/Sidebar"
import AppRoutes from "./routes/AppRoutes"
import { FaBars } from "react-icons/fa"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import { Link } from "react-router-dom"
import { Toaster } from "react-hot-toast"

const App = () => {
  const [isOpen, setIsOpen] = useState(false)

  // ✅ reusable function
  const handleNavClick = (path) => {
    setIsOpen(false)

    if (window.location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <>
      <ScrollToTop />  {/* 👈 Top level pe best */}
       <Toaster position="top-right" />

      <div className="flex">

        {/* MOBILE NAVBAR */}
        <div className="lg:hidden fixed top-0 left-0 w-full bg-black text-white flex items-center justify-between px-4  z-50">
          
          <button onClick={() => setIsOpen(true)} className="py-4">
            <FaBars size={28} />
          </button>
         <Link to="/" onClick={() => handleNavClick("/")}>
          <img src="/logo.png" alt="logo" className="h-12" />
        </Link>

          <div className="w-7"></div>
        </div>

        {/* SIDEBAR */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* MAIN CONTENT */}
        <div className="flex-1 lg:pl-80 mt-15 lg:mt-0 flex flex-col min-h-screen">

          {/* ROUTES */}
          <div className="flex-1">
            <AppRoutes />
          </div>

          {/* FOOTER */}
          <Footer />

        </div>

      </div>
    </>
  )
}

export default App