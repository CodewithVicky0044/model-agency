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
      xhr.open(
        "POST",
        "https://model-agency-1uat.onrender.com/api/submission"
      )

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded * 100) / e.total)
          setProgress(percent)
        }
      }

      // ✅ FIXED RESPONSE HANDLING
      xhr.onload = () => {
        setLoading(false)
        setProgress(0)

        if (xhr.status >= 200 && xhr.status < 300) {
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
        } else {
          console.error("Server Error:", xhr.responseText)
          toast.error("Server error ❌")
        }
      }

      xhr.onerror = () => {
        setLoading(false)
        console.error("Network Error")
        toast.error("Network error ❌")
      }

      xhr.send(form)

    } catch (error) {
      setLoading(false)
      console.error(error)
      toast.error("Something went wrong ❌")
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-10">

      <h1 className="text-3xl font-semibold text-center mb-10">
        Model Submission Form
      </h1>

      <form className="max-w-4xl mx-auto space-y-6">

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

        <div className="grid md:grid-cols-2 gap-6">
          {["front", "back", "left", "right"].map((pos) => (
            <label
              key={pos}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, pos)}
              className={`border-2 rounded-lg p-4 text-center relative cursor-pointer
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
                  className="absolute top-2 right-2 bg-red-500 px-2 py-1 text-xs rounded"
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
                <p>Upload {pos} photo</p>
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

        {progress > 0 && <p>{progress}%</p>}

        <button
          type="button"
          onClick={() => setShowTerms(true)}
          disabled={loading}
          className="w-full border py-3 rounded"
        >
          {loading ? "Uploading..." : "Submit"}
        </button>

      </form>

      {showTerms && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded">

            <label>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              I Agree
            </label>

            <button
              onClick={(e) => {
                if (!agreed) return toast.error("Please agree")
                setShowTerms(false)
                handleSubmit(e)
              }}
            >
              Submit
            </button>

          </div>
        </div>
      )}

    </div>
  )
}

export default Submission