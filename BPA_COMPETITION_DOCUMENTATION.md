# BPA Website Design Team Competition Project
## Mental Health Awareness Campaign Website

### A. System Overview & Tech Stack

#### **Frontend Stack**
- **React 18.2.0**: Modern JavaScript framework for component-based architecture
- **Tailwind CSS 3.3.3**: Utility-first CSS framework for responsive design
- **Lucide React**: Accessible icon library with consistent design
- **Vite 4.4.5**: Fast build tool and development server
- **HTML5 Semantic Elements**: Proper document structure and accessibility
- **CSS3 Custom Properties**: Dynamic theming and responsive design

#### **Backend Stack**
- **Node.js with Express.js**: Lightweight server for API endpoints
- **JSON File Storage**: Simple data persistence for demo purposes
- **CORS Middleware**: Secure cross-origin resource sharing
- **Input Validation**: Server-side form validation and sanitization

#### **Database Choice**
- **JSON File Storage**: Simple, offline-compatible data storage
- **Local Storage**: Client-side caching for mood tracking and preferences
- **Session Storage**: Temporary form data and user state

#### **Hosting Plan**
- **Static Hosting**: Netlify/Vercel for production deployment
- **Offline Demo**: Complete local server setup for BPA presentation
- **CDN Integration**: Asset optimization and global delivery

### B. Frontend Architecture

#### **Component Structure**
```
src/
├── components/
│   ├── common/           # Reusable UI components
│   ├── forms/            # Form components with validation
│   ├── layout/           # Layout components (Header, Footer, Sidebar)
│   └── pages/            # Page-level components
├── hooks/                # Custom React hooks
├── utils/                # Utility functions
├── services/             # API service functions
└── constants/            # Application constants
```

#### **State Management**
- React Context API for global state
- Local component state for UI interactions
- Custom hooks for reusable logic

#### **Routing Strategy**
- Single Page Application (SPA) with React Router
- Programmatic navigation for smooth user experience
- URL-based navigation for bookmarking and sharing

### C. Backend Architecture

#### **API Endpoints**
```javascript
// Counseling Appointment API
POST /api/appointments     // Create new appointment
GET /api/appointments      // Retrieve appointments
PUT /api/appointments/:id  // Update appointment

// Community Support API
GET /api/posts            // Get community posts
POST /api/posts           // Create new post
GET /api/testimonials     // Get user testimonials

// User Data API
POST /api/mood-tracker    // Save mood data
GET /api/mood-history     // Retrieve mood history
```

#### **Data Validation**
- Server-side input sanitization
- XSS protection with DOMPurify
- CSRF token implementation
- Rate limiting for form submissions

### D. Database Schema

#### **Appointments Collection**
```json
{
  "id": "unique_id",
  "name": "sanitized_name",
  "email": "validated_email",
  "phone": "formatted_phone",
  "preferredDate": "ISO_date",
  "serviceType": "individual|group|family|crisis",
  "urgency": "low|medium|high",
  "notes": "sanitized_text",
  "status": "pending|confirmed|completed",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

#### **Mood Tracker Collection**
```json
{
  "id": "unique_id",
  "mood": "great|good|okay|sad|struggling",
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "notes": "optional_text",
  "triggers": ["work", "family", "health"],
  "copingStrategies": ["exercise", "meditation", "music"],
  "createdAt": "timestamp"
}
```

#### **Community Posts Collection**
```json
{
  "id": "unique_id",
  "title": "sanitized_title",
  "content": "sanitized_content",
  "author": "anonymous_id",
  "category": "support|resources|experiences",
  "replies": [],
  "isModerated": false,
  "createdAt": "timestamp"
}
```

### E. Page-by-Page Functional Description

#### **1. Home Page**
- **Hero Section**: Compelling mental health message with clear CTAs
- **Quick Access Cards**: Direct links to crisis helplines, counseling, community
- **Mood Tracker Widget**: Interactive daily mood check-in
- **Statistics Counter**: Mental health awareness facts
- **Trust Indicators**: Professional credentials and testimonials

#### **2. Learn Page**
- **Mental Health Disorders**: Comprehensive information about anxiety, depression, bipolar
- **Symptoms Recognition**: Interactive symptom checker
- **Treatment Options**: Evidence-based treatment information
- **Resource Library**: Downloadable guides and worksheets
- **FAQ Section**: Common mental health questions and answers

#### **3. Support Page**
- **Crisis Helplines**: Clickable phone numbers and text lines
- **Appointment Scheduler**: Multi-step form with calendar integration
- **Service Types**: Individual, group, family, and crisis counseling
- **Emergency Protocols**: Clear instructions for crisis situations
- **Resource Directory**: Local mental health providers

#### **4. Blog Page**
- **Article Grid**: Responsive layout for blog posts
- **Category Filtering**: Filter by topic, date, or read time
- **Search Functionality**: Full-text search through articles
- **Related Posts**: Algorithm-based content recommendations
- **Social Sharing**: Share articles on social media

#### **5. Contact Page**
- **Contact Form**: Multi-field form with validation
- **Office Information**: Address, hours, contact details
- **Interactive Map**: Location finder with directions
- **Success Stories**: User testimonials with privacy protection
- **Feedback System**: User satisfaction and improvement suggestions

### F. Accessibility Features

#### **WCAG 2.1 AA Compliance**
- **Color Contrast**: Minimum 4.5:1 ratio for normal text, 3:1 for large text
- **Keyboard Navigation**: Full keyboard accessibility with visible focus indicators
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Alt Text**: Descriptive alternative text for all images
- **Form Labels**: Associated labels for all form inputs
- **Error Handling**: Clear error messages and validation feedback

#### **Accessibility Techniques**
```html
<!-- Semantic HTML Structure -->
<main role="main" aria-labelledby="page-title">
  <h1 id="page-title">Mental Health Support</h1>
  <nav aria-label="Main navigation">
    <ul role="menubar">
      <li role="none"><a role="menuitem" href="/home">Home</a></li>
    </ul>
  </nav>
</main>

<!-- Form Accessibility -->
<label for="email-input">Email Address</label>
<input 
  id="email-input"
  type="email"
  aria-required="true"
  aria-describedby="email-error"
  aria-invalid="false"
/>
<div id="email-error" role="alert" aria-live="polite"></div>
```

#### **Responsive Design**
- Mobile-first approach with breakpoints at 320px, 768px, 1024px, 1440px
- Flexible grid system using CSS Grid and Flexbox
- Scalable typography with rem units
- Touch-friendly interactive elements (44px minimum)

### G. Security Considerations

#### **Data Protection**
- **Input Sanitization**: All user inputs sanitized using DOMPurify
- **XSS Prevention**: Content Security Policy headers
- **CSRF Protection**: Token-based request validation
- **Rate Limiting**: Prevent form spam and abuse
- **Data Encryption**: Sensitive data encrypted at rest

#### **Privacy Measures**
- **No Real PII**: Demo uses fictional data only
- **Data Anonymization**: User data anonymized for analytics
- **Consent Management**: Clear privacy policy and user consent
- **Data Retention**: Automatic cleanup of old data
- **Secure Headers**: Security headers for all responses

#### **Form Security Implementation**
```javascript
// Input sanitization
import DOMPurify from 'dompurify';

const sanitizeInput = (input) => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
};

// Rate limiting
const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // 5 requests per window
  
  // Implementation logic here
  next();
};
```

### H. Presentation Plan & Speaker Roles

#### **10-Minute Presentation Structure**

**Slide 1: Project Overview (1 minute)**
- Team introduction and project scope
- Speaker: Project Manager
- Key points: Problem statement, target audience, solution approach

**Slide 2: Technical Architecture (1.5 minutes)**
- Frontend and backend technology choices
- Speaker: Lead Developer
- Key points: React, Node.js, security measures, scalability

**Slide 3: User Experience Design (1.5 minutes)**
- Design process and accessibility features
- Speaker: UX/UI Designer
- Key points: User research, wireframes, WCAG compliance, responsive design

**Slide 4: Core Features Demo (2 minutes)**
- Live demonstration of key functionality
- Speaker: Full-Stack Developer
- Key points: Mood tracker, appointment scheduler, community features

**Slide 5: Accessibility & Security (1 minute)**
- Security measures and accessibility compliance
- Speaker: Security Specialist
- Key points: Data protection, input validation, screen reader support

**Slide 6: Data Management (1 minute)**
- Database design and data flow
- Speaker: Database Administrator
- Key points: Schema design, data validation, privacy protection

**Slide 7: Testing & Quality Assurance (1 minute)**
- Testing strategy and quality measures
- Speaker: QA Engineer
- Key points: Cross-browser testing, accessibility testing, performance optimization

**Slide 8: Deployment & Hosting (1 minute)**
- Production deployment and hosting strategy
- Speaker: DevOps Engineer
- Key points: Static hosting, CDN, offline demo capabilities

**Slide 9: Future Enhancements (0.5 minutes)**
- Potential improvements and scalability
- Speaker: Project Manager
- Key points: AI chatbot, mobile app, advanced analytics

**Slide 10: Q&A Preparation (0.5 minutes)**
- Team readiness for questions
- All team members
- Key points: Technical depth, business impact, innovation

#### **Speaker Roles & Responsibilities**

**Project Manager**
- Overall project coordination
- Presentation flow and timing
- Business requirements and user needs
- Risk management and mitigation

**Lead Developer**
- Technical architecture decisions
- Code quality and best practices
- Performance optimization
- Integration and deployment

**UX/UI Designer**
- User experience research
- Visual design and branding
- Accessibility compliance
- Responsive design implementation

**Full-Stack Developer**
- Frontend and backend development
- Feature implementation
- API design and integration
- Database management

**Security Specialist**
- Security architecture
- Data protection measures
- Vulnerability assessment
- Compliance requirements

**Database Administrator**
- Data modeling and design
- Performance optimization
- Backup and recovery
- Data privacy compliance

**QA Engineer**
- Testing strategy and execution
- Quality assurance processes
- Bug tracking and resolution
- Performance monitoring

**DevOps Engineer**
- Deployment automation
- Infrastructure management
- Monitoring and logging
- Disaster recovery

### I. Optional Enhancements (Bonus Creativity Points)

#### **1. Light/Dark Mode Toggle**
- Implemented with CSS custom properties
- User preference persistence
- Smooth transitions and animations
- Accessibility considerations for reduced motion

#### **2. Mood Tracker Mini-App**
- Daily emotional check-ins
- Mood pattern visualization
- Trigger identification
- Coping strategy recommendations
- Data export functionality

#### **3. Simple Chatbot Resource Guide**
- Rule-based conversation flow
- Local JSON knowledge base
- Crisis detection and escalation
- Resource recommendation engine
- Offline functionality

#### **4. Advanced Analytics Dashboard**
- User engagement metrics
- Content performance analysis
- Accessibility usage statistics
- Security incident monitoring

### J. Competition Readiness Checklist

#### **Technical Requirements**
- [ ] Responsive design across all devices
- [ ] WCAG 2.1 AA accessibility compliance
- [ ] Cross-browser compatibility testing
- [ ] Performance optimization (< 3s load time)
- [ ] Security best practices implementation
- [ ] Offline demo capability

#### **Content Requirements**
- [ ] Accurate mental health information
- [ ] Real helpline numbers and resources
- [ ] Professional design and branding
- [ ] Clear navigation and user flow
- [ ] Comprehensive help documentation

#### **Presentation Requirements**
- [ ] 10-slide presentation deck
- [ ] Live demo functionality
- [ ] Team member role assignments
- [ ] Q&A preparation materials
- [ ] Backup presentation plan

#### **Documentation Requirements**
- [ ] Technical architecture documentation
- [ ] User experience design rationale
- [ ] Security and privacy measures
- [ ] Deployment and hosting plan
- [ ] Future enhancement roadmap

This comprehensive project meets all BPA Website Design Team competition requirements while providing a meaningful solution to mental health awareness and support.
