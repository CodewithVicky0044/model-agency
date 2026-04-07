# 🎭 Model Agency Website

A full-stack model agency platform where users can submit their details and photos for modeling opportunities. This project includes contact and submission forms with image upload and email integration.

---

## 🚀 Features

- 📩 Contact Form with Email Integration
- 📸 Model Submission Form with Image Upload (Front, Back, Left, Right)
- 📤 Email Notifications using Nodemailer
- 🖼️ Image Preview before upload
- 🧲 Drag & Drop Image Upload
- ❌ Remove Selected Images
- 📊 Upload Progress Bar
- 🔔 Toast Notifications (Success/Error)
- 🧾 Form Validation (Prevents empty submission)

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- Tailwind CSS
- React Hot Toast

### Backend:
- Node.js
- Express.js
- Nodemailer
- Multer

---

## 📁 Project Structure

```
model-agency/
├── client/   # React Frontend
├── server/   # Node.js Backend
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```
git clone https://github.com/CodewithVicky0044/model-agency.git
```

---

### 2️⃣ Install Dependencies

#### Client
```
cd client
npm install
```

#### Server
```
cd server
npm install
```

---

### 3️⃣ Environment Variables

Create a `.env` file in the `server` folder:

```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

---

### 4️⃣ Run Project

#### Start Backend
```
cd server
npm run dev
```

#### Start Frontend
```
cd client
npm run dev
```

---

## 📬 API Endpoints

### Contact Form
```
POST /api/contact
```

### Model Submission
```
POST /api/submission
```

---

## 🎯 Future Improvements

- MongoDB database integration
- Admin dashboard for submissions
- Cloudinary image storage
- User authentication system

---

## 👨‍💻 Author

**Vikram Swami**  
🔗 https://github.com/CodewithVicky0044

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
