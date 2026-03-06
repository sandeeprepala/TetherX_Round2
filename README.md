# 🩺 TetherX: AI-Powered Healthcare Triage & Patient Care Coordination

TetherX is a modern, full-stack healthcare platform designed to streamline patient triage through advanced AI and intuitive dashboards. It leverages **Google Gemini 2.5 Flash** to analyze symptoms, prioritize cases, and provide doctors with assistive medical recommendations.

## 🚀 Key Features

- **🤖 AI-Driven Triage**: Integrates with Google Gemini API to evaluate patient symptoms and severity in real-time.
- **📊 Smart Prioritization**: Custom algorithm (Priority Calculator) to rank cases, ensuring critical patients get immediate attention.
- **👨‍⚕️ Doctor Dashboard**: A streamlined interface for healthcare providers to review AI-analyzed cases and recommendations.
- **👩‍Responsive Patient Interface**: Intuitive symptom logging and history tracking for patients.
- **🔐 Secure Authentication**: Multi-layered auth with JWT (Session management) and **Firebase Social Login** (Google).
- **✨ Premium UI/UX**: Built with React, Tailwind CSS, and Framer Motion for a smooth, high-performance experience.

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State/Data**: Axios, React Hook Form, Zod (Validation), React Router DOM, React Hot Toast.
- **Icons**: Lucide React.

### **Backend**
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (via Mongoose)
- **AI Engine**: [Google Gemini 2.5 Flash](https://ai.google.dev/)
- **Auth**: JWT (JSON Web Tokens), Bcrypt.js, Firebase Auth.

---

## 📂 Project Structure

```text
TetherX_Round2/
├── Backend/               # Express.js Server
│   ├── config/            # DB & Config files
│   ├── controllers/       # Route logic (Auth, Cases)
│   ├── middleware/        # Auth & validation middleware
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API Endpoints
│   ├── utils/             # AI Service & Priority Calculator
│   └── index.js           # Server entry point
└── frontend/              # Vite + React Client
    ├── src/
    │   ├── components/    # Reusable UI components
    │   ├── App.jsx        # Root component & Routing
    │   ├── api.js         # API instance and calls
    │   └── index.css      # Styling & Global resets
    └── tailwind.config.js # Custom Design Configuration
```

---

## 🏗️ Getting Started

### **Prerequisites**
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Google Gemini API Key
- Firebase API Configuration

### **1. Clone the repository**
```bash
git clone <repository-url>
cd TetherX_Round2
```

### **2. Setup Backend**
```bash
cd Backend
npm install
```
Create a `.env` file in the `Backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_KEY=your_google_gemini_api_key
```
Run the server:
```bash
npm run dev
```

### **3. Setup Frontend**
```bash
cd ../frontend
npm install
```
Run the frontend development server:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

---

## 🧠 Core Intelligence

### **AI Recommendation Engine**
The platform uses the **Gemini 2.5 Flash** model to provide doctors with assistive insights, including:
- **Medicine Suggestions**: Non-prescription, low-risk recommendations.
- **Safety Checks**: Precautions and side effects to watch for.
- **Confidence Scoring**: Real-time evaluation of AI certainty.

### **Priority Algorithm**
Cases are ranked using a multi-factor calculation:
1. **Symptom Weighting**: Categories ranging from Critical/Emergency (e.g., Cardiac Arrest - 10/10 weight) to Very Low (e.g., Cold - 2/10 weight).
2. **Severity Levels**: Mild (2), Moderate (5), and Severe (10) weights.
3. **Persistence (Time Factor)**: Symptoms present for longer periods (2, 5, or 8+ days) increase priority.
4. **Previous Medication**: Extra weighting given if the patient has already attempted self-medication.

**Priority Levels:**
- **Critical** (Score 25+)
- **High** (Score 18-24)
- **Medium** (Score 10-17)
- **Low** (Score <10)

---

## 👨‍💻 Author
**Sandeep Repala**

---
🚀 *Building the future of AI-assisted healthcare.*
