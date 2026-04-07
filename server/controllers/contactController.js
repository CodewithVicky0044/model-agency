import { transporter } from "../config/mailer.js"

export const sendContactMail = async (req, res) => {
  try {
    const { name, email, message } = req.body

   await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,
  replyTo: email,
  subject: "New Contact Message",
  html: `
    <h2>Contact Form</h2>
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Message:</b> ${message}</p>
  `,
})

    res.json({ success: true, message: "Email sent ✅" })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}