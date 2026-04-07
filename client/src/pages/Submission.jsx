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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // 🔥 IMAGE SELECT
  const handleImage = (e, name) => {
    const file = e.target.files[0]

    if (file) {
      if (preview[name]) {
        URL.revokeObjectURL(preview[name])
      }

      setImages((prev) => ({ ...prev, [name]: file }))
      setPreview((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(file),
      }))

      toast.success(`${name} image selected ✅`)
    }

    e.target.value = null
  }

  // 🔥 DRAG DROP
  const handleDrop = (e, name) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]

    if (file) {
      if (preview[name]) {
        URL.revokeObjectURL(preview[name])
      }

      setImages((prev) => ({ ...prev, [name]: file }))
      setPreview((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(file),
      }))

      toast.success(`${name} image selected ✅`)
    }
  }

  // 🔥 REMOVE IMAGE
  const removeImage = (name) => {
    if (preview[name]) {
      URL.revokeObjectURL(preview[name])
    }

    setImages((prev) => ({ ...prev, [name]: null }))
    setPreview((prev) => ({ ...prev, [name]: null }))

    toast("Image removed ❌")
  }

  // 🔥 SUBMIT WITH VALIDATION
  const handleSubmit = async (e) => {
    e.preventDefault()

    // ✅ REQUIRED FIELD VALIDATION
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

    // ✅ IMAGE VALIDATION
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
        if (images[key]) {
          form.append(key, images[key])
        }
      })

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

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">

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
              ${preview[pos] ? "border-green-500 bg-green-500/10" : "border-gray-600 hover:border-white"}`}
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
                name={pos}
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
            ></div>
          </div>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full border border-white py-3 rounded hover:bg-white hover:text-black disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Submit"}
        </button>

      </form>
    </div>
  )
}

export default Submission