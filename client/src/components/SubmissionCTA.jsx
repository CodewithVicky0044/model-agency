import { Link } from "react-router-dom"

const SubmissionCTA = () => {

  return (
    <div className="bg-linear-to-b from-white to-gray-100 py-20 px-6 md:px-12 text-center">

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto">

        <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-4">
          Become a Model
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          Step into the world of fashion and modeling. Showcase your talent and get discovered by top brands and agencies. Your journey starts here.
        </p>
<Link to={"/submission"}>
        <button
          className="px-8 py-3 rounded-full bg-black text-white 
          hover:bg-gray-800 transition-all duration-300 shadow-md hover:scale-105"
        >
         Apply Now
        </button>
        </Link>

      </div>

      
    </div>
  )
}

export default SubmissionCTA