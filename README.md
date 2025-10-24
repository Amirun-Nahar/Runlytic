# 🏃‍♂️ RunLytic - Marathon Management System Frontend

A modern, responsive web application for marathon management, training tracking, and race recommendations built with React, TypeScript, and Vite.

## ✨ Features

### 🏠 **Home & Discovery**
- **Featured Marathons** - Discover popular and upcoming marathons
- **Marathon Search** - Find marathons by location, date, and distance
- **Real-time Updates** - Live marathon information and registrations
- **Responsive Design** - Optimized for all devices

### 🏃‍♂️ **Marathon Management**
- **Marathon Listings** - Browse all available marathons
- **Detailed Marathon Pages** - Comprehensive race information
- **Registration System** - Easy marathon registration process
- **My Marathons** - Track your registered races

### 🎯 **AI-Powered Recommendations**
- **Smart Suggestions** - AI-powered marathon recommendations using Gemini API
- **Personalized Matching** - Based on your preferences and training data
- **Compatibility Scoring** - Detailed compatibility analysis
- **Recommendation Filters** - Customize your search criteria

### 📊 **Progress Tracking** (NEW!)
- **Activity Logging** - Track runs, walks, cross-training, and rest days
- **Training Streak** - Monitor consecutive training days
- **Progress Analytics** - Weekly summaries and detailed statistics
- **Interactive Charts** - Visual progress tracking with Chart.js
- **Mood Tracking** - Record how you felt during workouts
- **Weather Integration** - Track weather conditions
- **Pace Calculation** - Automatic pace calculation
- **Goal Tracking** - Monitor progress towards your marathon goals

### 🏋️‍♂️ **Training Dashboard**
- **Training Plans** - Structured training programs
- **Workout Logging** - Record your training sessions
- **Progress Visualization** - Track your improvement over time
- **Achievement System** - Unlock badges and milestones
- **Training Calendar** - Visual training schedule

### 🔐 **User Authentication**
- **Firebase Authentication** - Secure user management
- **Profile Management** - Update your personal information
- **Protected Routes** - Secure access to user-specific features

## 🛠️ **Technology Stack**

### **Frontend**
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **React Query** - Server state management and caching
- **Axios** - HTTP client for API requests

### **UI & Styling**
- **Flowbite React** - Beautiful UI components
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Comprehensive icon library
- **Chart.js** - Interactive charts and graphs
- **React Chart.js 2** - React wrapper for Chart.js

### **State Management**
- **React Query** - Server state management
- **React Context** - Global state (Auth, Theme)
- **Local Storage** - Client-side data persistence

### **Development Tools**
- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking
- **React Hot Toast** - Beautiful notifications
- **React Helmet Async** - SEO and meta tag management

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Marathon-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # API Configuration
   VITE_API_URL=http://localhost:5000/api
   
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 **Project Structure**

```
Marathon-Frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── layout/         # Layout components (Navbar, Footer)
│   │   ├── ProgressTracker.tsx    # Progress tracking component
│   │   ├── ProgressCharts.tsx     # Analytics charts
│   │   └── ...            # Other components
│   ├── contexts/          # React Context providers
│   │   ├── AuthContext.tsx        # Authentication context
│   │   └── ThemeContext.tsx       # Theme management
│   ├── pages/             # Page components
│   │   ├── Home.tsx               # Landing page
│   │   ├── Marathons.tsx          # Marathon listings
│   │   ├── MarathonDetails.tsx    # Individual marathon page
│   │   ├── TrainingDashboard.tsx  # Training dashboard
│   │   ├── ProgressTracking.tsx   # Progress tracking page
│   │   ├── MarathonRecommendations.tsx # AI recommendations
│   │   └── ...            # Other pages
│   ├── routes/            # Routing configuration
│   ├── utils/             # Utility functions
│   │   └── axiosSecure.ts         # API client configuration
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## 🎨 **Key Components**

### **Progress Tracker**
- **Activity Logging** - Add detailed workout entries
- **Statistics Dashboard** - View training metrics
- **Streak Counter** - Track consecutive training days
- **Recent Activities** - Display latest workouts

### **Progress Charts**
- **Weekly Distance Chart** - Track weekly mileage
- **Activity Type Distribution** - Visualize workout types
- **Weekly Activity Count** - Monitor training frequency

### **AI Recommendations**
- **Smart Matching** - AI-powered marathon suggestions
- **Compatibility Analysis** - Detailed scoring system
- **Personalized Results** - Based on user preferences

## 🔧 **Available Scripts**

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Type checking
npm run type-check   # Check TypeScript types
```

## 🌐 **API Integration**

### **Backend Endpoints**
- **Marathons**: `/api/marathons`
- **Registrations**: `/api/registrations`
- **Progress**: `/api/progress`
- **Recommendations**: `/api/recommendations`
- **Authentication**: `/api/jwt`

### **Progress Tracking API**
```typescript
// Add new activity
POST /api/progress
{
  type: 'run' | 'walk' | 'cross_training' | 'rest',
  distance: number,
  duration: number,
  notes?: string,
  weather?: string,
  difficulty?: number,
  mood?: string
}

// Get progress statistics
GET /api/progress/stats?period=30

// Get training streak
GET /api/progress/streak

// Get weekly summary
GET /api/progress/weekly-summary?startDate=2024-01-01&endDate=2024-01-07
```

## 🎯 **Features in Detail**

### **Progress Tracking System**
- **Activity Types**: Run, Walk, Cross Training, Rest Days
- **Metrics**: Distance, Duration, Pace, Difficulty, Mood
- **Analytics**: Weekly summaries, training streaks, progress charts
- **Visualization**: Interactive charts with Chart.js
- **Data Persistence**: MongoDB integration

### **AI Recommendations**
- **Gemini AI Integration** - Advanced AI-powered suggestions
- **Personalization** - Based on user training data and preferences
- **Compatibility Scoring** - Detailed analysis of marathon fit
- **Fallback System** - Rule-based recommendations when AI is unavailable

### **Training Dashboard**
- **Training Plans** - Structured workout programs
- **Progress Tracking** - Visual progress monitoring
- **Achievement System** - Gamified training experience
- **Workout Logging** - Detailed activity recording

## 🔒 **Security Features**

- **JWT Authentication** - Secure token-based authentication
- **Protected Routes** - Route-level access control
- **Input Validation** - Client and server-side validation
- **CORS Configuration** - Cross-origin request security

## 📱 **Responsive Design**

- **Mobile-First** - Optimized for mobile devices
- **Tablet Support** - Enhanced tablet experience
- **Desktop Optimization** - Full desktop functionality
- **Touch-Friendly** - Mobile gesture support

## 🎨 **Theme Support**

- **Dark Mode** - Complete dark theme implementation
- **Light Mode** - Clean light theme
- **Theme Persistence** - User preference storage
- **Smooth Transitions** - Animated theme switching

## 🚀 **Deployment**

### **Build for Production**
```bash
npm run build
```

### **Deploy to Netlify**
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables
5. Deploy!

### **Environment Variables for Production**
```env
VITE_API_URL=https://your-backend-url.com/api
VITE_FIREBASE_API_KEY=your_production_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_production_domain
VITE_FIREBASE_PROJECT_ID=your_production_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_production_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_production_sender_id
VITE_FIREBASE_APP_ID=your_production_app_id
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Flowbite** - Beautiful UI components
- **Chart.js** - Interactive charts
- **React Query** - Server state management
- **Firebase** - Authentication and hosting
- **Google Gemini AI** - AI-powered recommendations

## 📞 **Support**

For support, email support@runlytic.com or join our community Discord.

---

**Built with ❤️ for the running community** 🏃‍♂️🏃‍♀️