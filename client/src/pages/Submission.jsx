import React, { useState } from "react"
import toast from "react-hot-toast"

const Submission = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    height: "",
    mobile: "",
    email: "",
    city: "",
    weight: "",
    waist: "",
    hair: "",
    eye: "",
    experience: "",
    skills: "",
  })

  const [images, setImages] = useState({
    front: null,
    back: null,
    left: null,
    right: null,
  })

  const [preview, setPreview] = useState({})
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)

  const [showTerms, setShowTerms] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImage = (e, name) => {
    const file = e.target.files[0]

    if (file) {
      if (preview[name]) URL.revokeObjectURL(preview[name])

      setImages((prev) => ({ ...prev, [name]: file }))
      setPreview((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(file),
      }))

      toast.success(`${name} image selected ✅`)
    }

    e.target.value = null
  }

  const handleDrop = (e, name) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]

    if (file) {
      if (preview[name]) URL.revokeObjectURL(preview[name])

      setImages((prev) => ({ ...prev, [name]: file }))
      setPreview((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(file),
      }))

      toast.success(`${name} image selected ✅`)
    }
  }

  const removeImage = (name) => {
    if (preview[name]) URL.revokeObjectURL(preview[name])

    setImages((prev) => ({ ...prev, [name]: null }))
    setPreview((prev) => ({ ...prev, [name]: null }))

    toast("Image removed ❌")
  }

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault()

    const requiredFields = [
      "name",
      "age",
      "height",
      "mobile",
      "email",
      "city",
      "weight",
    ]

    for (let field of requiredFields) {
      if (!formData[field]) {
        return toast.error(`${field} is required ❌`)
      }
    }

    const requiredImages = ["front", "back", "left", "right"]

    for (let img of requiredImages) {
      if (!images[img]) {
        return toast.error(`${img} image is required ❌`)
      }
    }

    try {
      setLoading(true)

      const form = new FormData()

      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key])
      })

      Object.keys(images).forEach((key) => {
        if (images[key]) form.append(key, images[key])
      })

      form.append("agreedToTerms", true)

      const xhr = new XMLHttpRequest()
      xhr.open("POST", "http://localhost:5000/api/submission")

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded * 100) / e.total)
          setProgress(percent)
        }
      }

      xhr.onload = () => {
        setLoading(false)
        setProgress(0)

        toast.success("Submission successful 🚀")

        setFormData({
          name: "",
          age: "",
          height: "",
          mobile: "",
          email: "",
          city: "",
          weight: "",
          waist: "",
          hair: "",
          eye: "",
          experience: "",
          skills: "",
        })

        setImages({
          front: null,
          back: null,
          left: null,
          right: null,
        })

        setPreview({})
        setAgreed(false)
      }

      xhr.onerror = () => {
        setLoading(false)
        toast.error("Upload failed ❌")
      }

      xhr.send(form)

    } catch (error) {
      setLoading(false)
      toast.error("Server error ❌")
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-10">

      <h1 className="text-3xl font-semibold text-center mb-10">
        Model Submission Form
      </h1>

      <form className="max-w-4xl mx-auto space-y-6">

        {/* INPUTS */}
        <div className="grid md:grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              name={key}
              value={formData[key]}
              placeholder={key}
              onChange={handleChange}
              className="bg-transparent border border-gray-600 p-3 rounded"
            />
          ))}
        </div>

        {/* IMAGE UPLOAD */}
        <div className="grid md:grid-cols-2 gap-6">
          {["front", "back", "left", "right"].map((pos) => (
            <label
              key={pos}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, pos)}
              className={`border-2 rounded-lg p-4 text-center transition relative cursor-pointer
              ${preview[pos]
                ? "border-green-500 bg-green-500/10"
                : "border-gray-600 hover:border-white"
              }`}
            >
              {preview[pos] && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    removeImage(pos)
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
                >
                  ✕
                </button>
              )}

              {preview[pos] ? (
                <img
                  src={preview[pos]}
                  alt="preview"
                  className="w-full h-40 object-cover rounded"
                />
              ) : (
                <>
                  <p className="text-sm text-gray-300 mb-2">
                    Drag & Drop or Click
                  </p>
                  <p className="text-xs text-gray-500">
                    Upload {pos} photo
                  </p>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImage(e, pos)}
                className="hidden"
              />
            </label>
          ))}
        </div>

        {/* PROGRESS */}
        {progress > 0 && (
          <div className="w-full bg-gray-700 h-2 rounded">
            <div
              className="bg-green-500 h-2 rounded transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <button
          type="button"
          onClick={() => setShowTerms(true)}
          disabled={loading}
          className="w-full border border-white py-3 rounded hover:bg-white hover:text-black"
        >
          {loading ? "Uploading..." : "Submit"}
        </button>

      </form>

      {/* TERMS MODAL */}
{showTerms && (
  <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
    <div className="bg-white text-black max-w-4xl w-full rounded-xl p-6 max-h-[85vh] overflow-y-auto">

      <h2 className="text-2xl font-semibold mb-4">
        Terms & Conditions
      </h2>

      <div className="space-y-4 text-sm text-gray-700 leading-relaxed">

        <p><b>1. Eligibility</b><br />
        Applicants must be at least 16 years old.<br />
        If under 18, parent/guardian consent is mandatory.
        </p>

        <p><b>2. Authentic Information</b><br />
        All information submitted must be true and accurate.<br />
        Any false details may result in immediate rejection or termination.
        </p>

        <p><b>3. No Guarantee of Selection</b><br />
        Submission does not guarantee selection, contracts, or assignments.<br />
        The agency reserves full rights to accept or reject applications.
        </p>

        <p><b>4. Image Usage Rights</b><br />
        By submitting photos, you grant the agency permission to:
        <br />• Review your profile
        <br />• Use images for internal selection or promotional purposes (if selected)
        </p>

        <p><b>5. Professional Conduct</b><br />
        Models must maintain professional behavior in all communications and assignments.<br />
        Misconduct may lead to removal from the agency.
        </p>

        <p><b>6. Optional Services – Photo Submit, Portfolio & Coaching</b><br />
        ZJELL may offer optional services like Photo Submission, Portfolio Review, and Coaching.
        <br /><br />
        These are add-on paid services subject to separate terms.
        <br /><br />
        Reports or coaching materials provided are confidential and cannot be reused, copied, or distributed without written permission.
        </p>

        <p><b>7. Legal Jurisdiction</b><br />
        This agreement is governed by the laws of India, for users registered through MG Materials (India).
        </p>

        <p><b>8. Additional Questions / Consent</b></p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Are you comfortable traveling for shoots?</li>
          <li>Are you comfortable with camera/video shoots?</li>
          <li>Do you have any tattoos or piercings? (If yes, specify)</li>
          <li>Availability details may be requested when shortlisted.</li>
          <li>Do you agree to follow agency rules and guidelines?</li>
        </ul>

        <p className="font-semibold mt-4">
          ✅ DECLARATION
        </p>

        <p className="italic">
          “I hereby declare that the information provided is true and I agree to the terms and conditions of the agency.”
        </p>

      </div>

      <label className="flex items-center gap-2 mt-6">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <span>I Agree to Terms & Conditions</span>
      </label>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => {
            setShowTerms(false)
            setAgreed(false)
          }}
          className="flex-1 border border-gray-400 py-2 rounded"
        >
          Cancel
        </button>

        <button
          onClick={(e) => {
            if (!agreed) {
              return toast.error("Please agree to Terms & Conditions")
            }

            setShowTerms(false)
            handleSubmit(e)
          }}
          className="flex-1 bg-black text-white py-2 rounded"
        >
          I Agree & Submit
        </button>
      </div>

    </div>
  </div>
)}

    </div>
  )
}

export default Submission