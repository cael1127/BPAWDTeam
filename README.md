# MindWell - Mental Health Awareness Campaign

A comprehensive mental health awareness website built with React, providing resources, support, and community for mental wellness.

## Features

- **Interactive Mood Tracker**: Track daily mood and emotional well-being
- **Educational Content**: Learn about common mental health conditions
- **Crisis Support**: Access to helplines and emergency resources
- **Community Features**: Support groups and peer connections
- **Professional Counseling**: Schedule appointments with mental health professionals
- **Dark/Light Mode**: Accessible design with theme switching
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Technology Stack

- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Vite**: Fast build tool and development server

## Project Structure

```
src/
├── components/
│   ├── pages/          # Page components
│   │   ├── HomePage.jsx
│   │   ├── LearnPage.jsx
│   │   ├── SupportPage.jsx
│   │   ├── BlogPage.jsx
│   │   └── ContactPage.jsx
│   ├── Navigation.jsx  # Navigation component
│   └── Footer.jsx      # Footer component
├── data/               # Static data
│   ├── moodOptions.js
│   └── mentalHealthData.js
├── hooks/              # Custom React hooks
│   ├── useDarkMode.js
│   └── useMoodTracker.js
├── App.jsx            # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Key Components

### Custom Hooks

- **useDarkMode**: Manages dark/light theme switching
- **useMoodTracker**: Handles mood tracking functionality

### Data Management

- **moodOptions.js**: Configuration for mood tracking options
- **mentalHealthData.js**: Static content for mental health information, helplines, testimonials, and blog posts

### Page Components

- **HomePage**: Landing page with hero section, quick actions, and mood tracker
- **LearnPage**: Educational content about mental health conditions
- **SupportPage**: Crisis helplines, appointment scheduling, and community features
- **BlogPage**: Mental health blog posts and articles
- **ContactPage**: Contact information and testimonials

## Design Features

- **Accessibility**: WCAG compliant design with proper contrast ratios
- **Responsive**: Mobile-first design that works on all screen sizes
- **Dark Mode**: Full dark mode support with smooth transitions
- **Modern UI**: Clean, professional design with hover effects and animations

## Mental Health Resources

This application includes real mental health resources and helplines:

- National Suicide & Crisis Lifeline: 988
- Crisis Text Line: Text HOME to 741741
- SAMHSA Treatment Referral: 1-800-662-4357
- NAMI Helpline: 1-800-950-NAMI

## License

This project is licensed under the MIT License and is intended for educational purposes as part of a BPA competition demonstration.

## Disclaimer

This is a demonstration project for educational purposes. For actual mental health emergencies, please contact professional crisis hotlines or emergency services.
