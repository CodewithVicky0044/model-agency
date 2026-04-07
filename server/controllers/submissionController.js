import { transporter } from "../config/mailer.js"

export const sendSubmissionMail = async (req, res) => {
  try {
    const data = req.body
    const files = req.files

    const attachments = []

    if (files.front) {
      attachments.push({
        filename: "front.jpg",
        content: files.front[0].buffer,
      })
    }

    if (files.back) {
      attachments.push({
        filename: "back.jpg",
        content: files.back[0].buffer,
      })
    }

    if (files.left) {
      attachments.push({
        filename: "left.jpg",
        content: files.left[0].buffer,
      })
    }

    if (files.right) {
      attachments.push({
        filename: "right.jpg",
        content: files.right[0].buffer,
      })
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Model Submission",
      html: `
        <h2>Model Details</h2>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Age:</b> ${data.age}</p>
        <p><b>Height:</b> ${data.height}</p>
        <p><b>Mobile:</b> ${data.mobile}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>City:</b> ${data.city}</p>
        <p><b>Skills:</b> ${data.skills}</p>
        <p><b>experience:</b> ${data.experience}</p>
        <p><b>eye:</b> ${data.eye}</p>
        <p><b>hair:</b> ${data.hair}</p>
        <p><b>waist:</b> ${data.waist}</p>
      `,
      attachments,
    })

    res.json({ success: true, message: "Submission sent 🚀" })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}