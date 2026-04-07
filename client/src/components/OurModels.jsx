import React, { useState } from "react"

// ✅ IMPORT YOUR LOCAL IMAGES
import model1 from "../assets/femaleModel1.avif"
import model2 from "../assets/maleModel1.avif"
import model3 from "../assets/maleModel2.avif"
import model4 from "../assets/femaleModel2avif.avif"
import model5 from "../assets/maleModel3.avif"
import model6 from "../assets/femaleModel3.avif"
import model7 from "../assets/maleModel4.avif"
import model8 from "../assets/maleModel5.avif"
import Models from "../pages/Models"
import { useNavigate } from "react-router-dom"

const modelsData = [
  { name: "Apeksha", gender: "Female", img: model1 },
  { name: "Aagaz", gender: "Male", img: model2 },
  { name: "Abhishek", gender: "Male", img: model3 },
  { name: "Jayati", gender: "Female", img: model4 },
  { name: "Ayaan", gender: "Male", img: model5 },
  { name: "Swechchha", gender: "Female", img: model6 },
  { name: "Akshay N", gender: "Male", img: model7 },
  { name: "Varun S", gender: "Male", img: model8 },
]

const OurModels = () => {
  const [filter, setFilter] = useState("All")

  const filteredModels =
    filter === "All"
      ? modelsData
      : modelsData.filter((m) => m.gender === filter)
      const navigate = useNavigate();

  return (
    <div className="bg-[#111] text-white min-h-screen px-6 md:px-16 py-16">

      {/* TITLE */}
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
        Our Models
      </h2>

      {/* FILTER */}
      <div className="flex justify-center gap-6 mb-10 text-sm">
        {["All", "Female", "Male"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`${
              filter === item ? "border-b border-white" : "text-gray-400"
            } pb-1`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {filteredModels.map((model, index) => (
          <div key={index} className="group relative overflow-hidden">

            {/* IMAGE */}
            <img
              src={model.img}
              alt={model.name}
              className="w-full h-75 object-cover grayscale group-hover:grayscale-0 transition duration-300"
            />

            {/* OVERLAY */}
            <div className="absolute bottom-0 left-0 w-full bg-black/80 px-3 py-2 text-sm">
              <p className="text-gray-400">{model.gender}</p>
              <h3 className="font-semibold">{model.name.toUpperCase()}</h3>
            </div>

          </div>
        ))}

      </div>

      {/* BUTTON */}
      <div className="flex justify-center mt-10">
        <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition" onClick={()=>{navigate("/models")}}>
          View More
        </button>
      </div>

    </div>
  )
}

export default OurModels