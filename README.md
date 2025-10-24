# MindWell - Mental Health Awareness Platform

A comprehensive mental health awareness platform built with React and Node.js, providing resources, support, and community for mental wellness with real-time shared data across all users.

![MindWell Logo](https://via.placeholder.com/400x200/10B981/FFFFFF?text=MindWell)

## 🚀 Quick Start

### Frontend Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Development
```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Start backend server
npm start
```

Visit `http://localhost:5173` to view the application (backend runs on `http://localhost:3001`).

## ✨ Features

### Core Functionality
- **Interactive Mood Tracker** - Track daily mood and emotional well-being with data persistence
- **Comprehensive Education** - Learn about 10+ mental health conditions with detailed information
- **Crisis Support** - Access to national and local helplines with zip code-based search
- **Community Forum** - Real-time shared forum with posts, replies, and likes across all users
- **Professional Counseling** - Schedule appointments with mental health professionals
- **Local Resource Finder** - Find mental health resources by zip code

### Advanced Features
- **Real-time Data Sharing** - All forum posts, replies, and likes are shared across users
- **Progressive Web App** - Installable with offline capabilities
- **AI Assistant** - Intelligent mental health support and guidance
- **Crisis Detection** - Automated detection of crisis situations with immediate support
- **Dark/Light Mode** - Auto-detection of system preference with manual override
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Tailwind CSS** - Utility-first CSS framework with custom animations
- **Lucide React** - Beautiful icon library
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Web application framework
- **File-based Storage** - JSON file storage for data persistence
- **CORS & Security** - Cross-origin resource sharing and input sanitization

## 📁 Project Structure

```
MindWell/
├── src/                    # Frontend React application
│   ├── components/         # React components
│   │   ├── pages/         # Page components (Home, Learn, Support, etc.)
│   │   ├── forms/         # Form components (Appointment, etc.)
│   │   ├── community/     # Community forum and chat
│   │   └── advanced/      # Advanced features (AI, PWA, Crisis Detection)
│   ├── data/              # Static data and content
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API services and data management
│   └── App.jsx           # Main application component
├── backend/               # Backend Node.js server
│   ├── data/             # JSON file storage
│   ├── server.js         # Express server with API endpoints
│   └── package.json      # Backend dependencies
├── docs/                 # Comprehensive documentation
│   ├── competition/      # BPA competition materials
│   ├── deployment/       # Deployment guides and instructions
│   ├── presentation/     # Presentation materials and guides
│   └── technical/        # Technical specifications and reports
└── public/               # Static assets and PWA files
```

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) directory:

- **[Project Summary](./docs/PROJECT_SUMMARY.md)** - Complete project overview and key features
- **[Competition Documentation](./docs/competition/)** - BPA competition materials and submission packages
- **[Deployment Guides](./docs/deployment/)** - Complete deployment instructions for frontend and backend
- **[Technical Specs](./docs/technical/)** - Technical specifications, accessibility reports, and wireframes
- **[Presentation Materials](./docs/presentation/)** - Business-focused presentation guides and materials

## 🚀 Deployment

### Frontend (Netlify)
The frontend is automatically deployed to Netlify with the following features:
- Automatic builds on git push
- Custom domain support
- HTTPS enabled
- CDN distribution

### Backend (Render)
The backend is deployed to Render with:
- Automatic deployments from git
- Persistent file storage
- Environment variable configuration
- Health monitoring

## 🆘 Mental Health Resources

### National Crisis Resources
- **National Suicide & Crisis Lifeline**: 988
- **Crisis Text Line**: Text HOME to 741741
- **SAMHSA Treatment Referral**: 1-800-662-4357
- **NAMI Helpline**: 1-800-950-NAMI

### Local Resources
Use our built-in zip code search to find local mental health resources in your area.

## 🤝 Contributing

This project was developed as part of a BPA competition demonstration. For educational purposes, contributions and improvements are welcome.

## 📄 License

This project is licensed under the MIT License and is intended for educational purposes as part of a BPA competition demonstration.

## ⚠️ Disclaimer

This is a demonstration project for educational purposes. For actual mental health emergencies, please contact professional crisis hotlines or emergency services.

---

**Built with ❤️ for mental health awareness and community support**