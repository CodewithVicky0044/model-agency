import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Models from "../pages/Models"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Submission from "../pages/Submission"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/models" element={<Models />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/submission" element={<Submission />} />
    </Routes>
  )
}

export default AppRoutes