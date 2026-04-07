import React, { useState } from 'react'
import modelImg from '../assets/sidebarModel.avif'
import model1 from "../assets/femaleModel1.avif"
import model2 from "../assets/maleModel1.avif"
import model3 from "../assets/maleModel2.avif"
import model4 from "../assets/femaleModel2avif.avif"
import model5 from "../assets/maleModel3.avif"
import model6 from "../assets/femaleModel3.avif"
import model7 from "../assets/maleModel4.avif"


const modelsData = [
  { name: "AARSHI", city: "Mumbai", img: modelImg },
  { name: "ADITS", city: "Delhi", img: model1 },
  { name: "ADITYA", city: "Mumbai", img: model2 },
  { name: "VIVAAN", city: "Delhi", img: model3 },
  { name: "AKANSHA A", city: "Mumbai", img: model4 },
  { name: "KABIR", city: "Delhi", img: model5 },
  { name: "ANIA", city: "Mumbai", img: model6 },
  { name: "ADITYA", city: "Delhi", img: model7 },
]

const Models = () => {
  const [filter, setFilter] = useState("All")

  const filteredModels =
    filter === "All"
      ? modelsData
      : modelsData.filter((m) => m.city === filter)

  return (
    <div className="ml-0  min-h-screen bg-[#0f0f0f] text-white px-6 md:px-12 py-10">

      {/* TITLE */}
      <h1 className="text-3xl md:text-4xl font-semibold text-center mb-6">
        Female Models
      </h1>

      {/* FILTER */}
      <div className="flex justify-center gap-6 mb-10 text-sm md:text-base">
        {["All", "Mumbai", "Delhi"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`relative ${
              filter === item ? "text-white" : "text-gray-400"
            }`}
          >
            {item}
            {filter === item && (
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-white"></span>
            )}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filteredModels.map((model, index) => (
          <div key={index} className="group cursor-pointer">

            {/* IMAGE */}
            <div className="overflow-hidden">
              <img
                src={model.img}
                alt={model.name}
                className="w-full h-[250px] object-cover grayscale group-hover:grayscale-0 transition duration-300"
              />
            </div>

            {/* NAME */}
            <p className="mt-2 text-sm font-semibold tracking-wide">
              {model.name}
            </p>
          </div>
        ))}
      </div>

      {/* BOTTOM TEXT SECTION */}
      <div className="mt-20 max-w-4xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Unleash Feminine Grace and Power with Runway Dreams
        </h2>

        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          Your journey to stardom begins with Runway Dreams, Sikar’s emerging and dynamic modeling agency. We provide opportunities for aspiring models, helping them turn their passion into a successful career. Whether you are a fresher or experienced, we support your growth with the right guidance, exposure, and industry connections.
        </p>
      </div>

    </div>
  )
}

export default Models