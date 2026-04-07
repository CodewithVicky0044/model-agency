import express from "express"
import { sendSubmissionMail } from "../controllers/submissionController.js"
import { upload } from "../middleware/upload.js"

const router = express.Router()

router.post(
  "/submission",
  upload.fields([
    { name: "front" },
    { name: "back" },
    { name: "left" },
    { name: "right" },
  ]),
  sendSubmissionMail
)

export default router