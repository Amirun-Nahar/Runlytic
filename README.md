# RunLytic - Marathon Management System

<div align="center">
  <p>A comprehensive full-stack web application for managing marathon events and connecting organizers with participants.</p>
</div>
🌐 **Live Site**: https://runlytic-marathon.netlify.app 

<p top="5" gap="5">

  <img width="1881" height="757" alt="image" src="https://github.com/user-attachments/assets/71ec24f6-324d-4d0c-abae-5995c0719623" />
  <img width="1873" height="877" alt="image" src="https://github.com/user-attachments/assets/e32b8478-af3c-4ec2-8a8d-e7ec0d835478" />
  <img width="1883" height="781" alt="image" src="https://github.com/user-attachments/assets/b012fc28-c3bf-4d93-9cc3-59caa1688f84" />

</p>

## Overview

RunLytic is a modern marathon management platform designed to streamline the organization and participation in marathon events. The system provides a robust set of features for both event organizers and participants, making the entire marathon management process efficient and user-friendly.

## Key Features

### 🔐 User Authentication & Profile Management

- **Multi-provider Authentication**
  - Email/Password authentication with validation
  - Social login integration (Google, Facebook)
  - JWT-based secure authentication flow
- **Profile Management**
  - Customizable user profiles with avatar upload
  - Running history and achievements tracking
  - Personal statistics dashboard

### 🏃‍♂️ Marathon Event Management
- **Event Creation & Configuration**
  - Intuitive event creation interface
  - Customizable marathon categories
    - Full Marathon (42.195 km)
    - Half Marathon (21.0975 km)
    - 10K Run
    - 5K Run
  - Dynamic pricing tiers with early bird options
  - Participant capacity management
  - Custom registration form builder

- **Event Dashboard**
  - Real-time registration statistics
  - Participant demographics
  - Revenue analytics
  - Export functionality for participant data

### 📝 Registration System
- **Smart Registration Process**
  - Step-by-step registration wizard
  - Automatic age category assignment
  - Group registration support
  - Dynamic pricing based on registration date
  - Integrated payment processing

- **Registration Management**
  - Bulk participant import/export
  - Registration status tracking
  - Automated email notifications
    - Registration confirmation
    - Payment confirmation
    - Event updates
    - Race day instructions

### 📊 Analytics & Reporting
- **Organizer Analytics**
  - Registration trends
  - Revenue reports
  - Participant demographics
  - Custom report generation

- **Participant Insights**
  - Personal performance tracking
  - Race history
  - Achievement badges
  - Comparative statistics

## Technology Stack

### Frontend Architecture
- **Core Technologies**
  - React 18.2.0 with TypeScript
  - Vite 4.4.5 for build tooling
  - React Router DOM 6.15.0 for routing
  - TanStack Query (React Query) for data fetching

- **UI/UX Components**
  - Tailwind CSS 3.3.3 with Flowbite
  - React Hot Toast for notifications
  - React Countdown Circle Timer
  - Framer Motion for animations

- **State Management & Data Handling**
  - Context API for global state
  - Axios for HTTP requests
  - React Hook Form for form management
  - Zod for schema validation

### Backend Infrastructure
- **Server Framework**
  - Node.js 18.x
  - Express.js 4.18.2
  - MongoDB with Mongoose 7.4.3

- **Security & Authentication**
  - Firebase Admin SDK
  - JWT for token management
  - bcrypt for password hashing
  - helmet for security headers

- **Additional Tools**
  - multer for file uploads
  - nodemailer for email services
  - winston for logging
  - jest for testing

## Getting Started

### Prerequisites
- Node.js (v18.x or higher)
- npm (v9.x or higher)
- MongoDB (v6.x or higher)
- Firebase account
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/runlytic.git
cd runlytic
```

2. Install dependencies
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### Configuration

1. Frontend Configuration (.env)
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# API Configuration
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

2. Backend Configuration (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database Configuration
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

# Email Configuration
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password

# Payment Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
```

3. Start Development Servers
```bash
# Start frontend (http://localhost:5173)
cd client
npm run dev

# Start backend (http://localhost:5000)
cd ../server
npm run dev
```

## Project Structure

```
runlytic/
├── client/                    # Frontend React application
│   ├── public/               # Static files
│   ├── src/
│   │   ├── assets/          # Images, fonts, etc.
│   │   ├── components/      # Reusable UI components
│   │   │   ├── layout/     # Layout components
│   │   │   └── shared/     # Shared components
│   │   ├── config/         # Configuration files
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── styles/         # Global styles
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   ├── .env                 # Environment variables
│   └── vite.config.ts       # Vite configuration
│
├── server/                   # Backend Node.js application
│   ├── src/
│   │   ├── config/         # Server configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   ├── .env                 # Environment variables
│   └── package.json         # Dependencies
│
├── .gitignore               # Git ignore rules
├── README.md                # Project documentation
└── package.json             # Root package.json
```

## API Documentation

Detailed API documentation is available at `/api/docs` when running the server locally. The documentation includes:

- Authentication endpoints
- Marathon management endpoints
- Registration endpoints
- User management endpoints
- Complete request/response examples
- Error codes and handling

## Deployment

### Frontend Deployment (Netlify)
1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `cd client && npm run build`
   - Publish directory: `client/dist`
3. Set up environment variables in Netlify dashboard

### Backend Deployment (Render)
1. Create a new Web Service in Render
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `cd server && npm install`
   - Start command: `cd server && npm start`
4. Set up environment variables in Render dashboard

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


<div align="center">
  Made with ❤️ by the RunLytic Team
</div> 
