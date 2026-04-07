import React, { useState } from "react"
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"
import toast from "react-hot-toast"

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 🔥 basic validation
    if (!formData.name || !formData.email || !formData.message) {
      return toast.error("Please fill all fields ❌")
    }

    try {
      setLoading(true)

      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.success) {
        toast.success("Message sent successfully ✅")

        setFormData({
          name: "",
          email: "",
          message: "",
        })
      } else {
        toast.error("Something went wrong ❌")
      }

    } catch (error) {
      console.log(error)
      toast.error("Server error ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#111] text-white px-6 md:px-16 py-16 min-h-screen">

      {/* TOP CONTENT */}
      <div className="max-w-5xl mx-auto mb-16 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Why Choose Runway Dreams Modeling Agencie
        </h2>

        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
          The Best Modeling Agency focuses on essential features and functions to assist models.
        </p>

        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          Our agency connects models with reputed brands and helps them grow professionally.
        </p>
      </div>

      {/* CONTACT GRID */}
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

        {/* LEFT SIDE */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Contact Us</h3>

          <div className="flex items-center gap-3 mb-4 text-gray-400">
            <FaPhone size={18} />
            <span>+91 9602347639</span>
          </div>

          <div className="flex items-center gap-3 mb-4 text-gray-400">
            <FaEnvelope size={18} />
            <span>runwaydreams00@gmail.com</span>
          </div>

          <div className="flex items-center gap-3 text-gray-400">
            <FaMapMarkerAlt size={18} />
            <span>sikar</span>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="border border-gray-800 p-6 rounded-md">

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* NAME */}
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Your Name"
              onChange={handleChange}
              className="bg-transparent border-b border-gray-700 outline-none py-2 text-sm focus:border-white transition"
              required
            />

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Your Email"
              onChange={handleChange}
              className="bg-transparent border-b border-gray-700 outline-none py-2 text-sm focus:border-white transition"
              required
            />

            {/* MESSAGE */}
            <textarea
              name="message"
              value={formData.message}
              placeholder="Message"
              onChange={handleChange}
              rows="3"
              className="bg-transparent border-b border-gray-700 outline-none py-2 text-sm resize-none focus:border-white transition"
              required
            ></textarea>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-white text-black py-2 rounded-full hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default ContactSection