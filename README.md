# 🏨 The Wild Embrace

A modern hotel management application built with **React**, **Supabase**, and **React Query** — designed to streamline hotel operations and deliver an efficient, real-world workflow.

---

## 🚀 Overview

**The Wild Embrace** is a full-featured hotel management system that allows staff to manage bookings, guests, cabins, authentication, and analytics through a clean, user-friendly interface.

This project demonstrates strong front-end engineering skills, API integration, state management, and production-ready UI architecture.

---

## ✨ Features

- **User Authentication** with Supabase Auth
- **Cabin Management** (Create, edit, delete cabins)
- **Guest & Booking Management**
- **Check-in / Check-out Operations**
- **Analytics Dashboard** with KPIs & charts
- **Image Upload & Storage** via Supabase
- **Form Validation** using React Hook Form
- **Optimistic UI & Caching** with React Query
- **Responsive UI** with Styled Components
- **Toast Notifications** with react-hot-toast

---

## 🛠️ Tech Stack & Tools

### **Frontend**

- React 19
- React Router 7
- Styled Components 6
- React Hook Form
- React Icons
- React Hot Toast

### **Backend (BaaS)**

- Supabase
  - Authentication
  - PostgreSQL Database
  - File Storage
  - Row Level Security

### **Data Fetching & State Management**

- @tanstack/react-query
- React Query Devtools

### **Utilities**

- date-fns

### **Build Tools & Development**

- Vite 7
- ESLint 9
- @eslint/js
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh
- @types/react
- @types/react-dom

---

## ⚙️ Getting Started

### **1. Clone the repository**

```bash
git clone https://github.com/your-username/the-wild-embrace.git
cd the-wild-embrace
```

### **2. Install dependencies**

```bash
npm install
```

### **3. Set up Supabase**

- Create a new project on [Supabase](https://supabase.com/)
- Set up your database schema and RLS policies (refer to the `/supabase` folder for SQL scripts)
- Obtain your Supabase URL and Anon Key from the project settings
- Create a `.env` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### **4. Run the development server**

```bash
npm run dev
```

## 📜 License

This project is licensed under the MIT License.
