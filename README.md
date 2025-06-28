# RunLytic - Marathon Management System

A full-stack web application for managing marathon events, connecting organizers with participants.

![image](https://github.com/user-attachments/assets/30b88100-7c05-4352-9ba4-0c5f6b8baad8)


🌐 Live Site: [RunLytic](https://runlytic-marathon.netlify.app/)

## Features

- **User Authentication & Profile Management**
  - Secure login with Firebase (Email/Password and Social Login)
  - Personalized user dashboard with profile management
  - Role-based access control for organizers and participants

- **Marathon Event Management**
  - Create and manage marathon events with detailed information
  - Real-time countdown timer for upcoming events
  - Customizable event settings (distance, date, location, etc.)
  - Image upload and management for event banners

- **Registration System**
  - Streamlined registration process for participants
  - Real-time registration status updates
  - Automated confirmation emails
  - Registration analytics and tracking

- **Interactive Dashboard**
  - Organizer dashboard for event management
  - Participant dashboard for registration tracking
  - Real-time statistics and analytics
  - Event search and filtering capabilities

- **Modern UI/UX**
  - Responsive design for all devices
  - Dark/Light theme support
  - Interactive maps for event locations
  - Real-time notifications and updates

## Tech Stack

- Frontend:
  - React with TypeScript
  - Vite
  - Tailwind CSS with Flowbite
  - React Router DOM
  - Firebase Authentication
  - React Query
  - Axios
  - React Hot Toast
  - React Countdown Circle Timer

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - JWT for authentication
  - Cors
  - Dotenv

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. Create `.env` file in the root directory and add your configuration:
   ```
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id

   # MongoDB Configuration
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret

   # Server Configuration
   PORT=5000
   CLIENT_URL=http://localhost:5173
   ```

4. Start the development servers:
   ```bash
   # Start frontend (in client directory)
   npm run dev

   # Start backend (in server directory)
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
marathon-management-system/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom hooks
│   │   ├── contexts/     # Context providers
│   │   ├── utils/        # Utility functions
│   │   └── services/     # API services
│   └── ...
├── server/                # Backend Node.js application
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   └── utils/        # Utility functions
│   └── ...
└── ...
``` 
