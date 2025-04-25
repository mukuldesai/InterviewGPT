# **App Name**: InterviewGPT - Generative Preparation Trainer

## Core Features:

- Interview Question Generation: Generates role-specific interview questions based on user-selected job role and experience level. This leverages the OpenAI API to tailor questions for Data Analyst, Software Engineer, Product Manager, and other roles.
- Resume Optimization: Analyzes user's resume (uploaded as PDF/DOCX) for ATS compatibility, keyword matching, and skill gaps. The tool provides suggestions for rewording, tailored professional summaries, and an overall ATS match score. Uses OpenAI to generate suggested rewording. The tool identifies the sections of your resume, and gives a confidence score on each section, reasoning about why a particular section might not meet the ATS guidelines.
- Progress Tracking Dashboard: Presents analysis and progress through a dashboard with clear visualizations of scores and improvements over time.
- Voice Analysis Integration: Adds voice analysis to the mock interview setup, including voice file transcription and analysis using OpenAI, along with counting 'ahhs' and 'umms'. The tool will store and process voice files as part of the interview section.
- Personalized Feedback and Tips: Provides personalized insights and tips for improvements based on AI analysis and industry best practices. This is presented in an easily digestible format with actionable recommendations.

## Style Guidelines:

- Primary color: Deep Blue (#1A237E) to convey professionalism and trust.
- Secondary color: Light Gray (#E0E0E0) for backgrounds and subtle contrast.
- Accent: Teal (#00BCD4) for interactive elements and highlights.
- Use a clean and structured layout with clear sections for interview practice, resume analysis, and progress tracking.
- Employ a set of consistent and professional icons to represent different features and actions.
- Incorporate subtle animations to enhance user interaction and provide feedback.

## Original User Request:
InterviewGPT - Generative Preparation Trainer
used python for backend and can used anyhting for freitnedn which youare conforatbaeel

# Navigation Sidebar Redesign for InterviewGPT

I need to transform the navigation sidebar of my InterviewGPT application to match the design shown in Image 2. The current sidebar (Image 1) has basic text links without proper styling or user profile information.

## Required Changes:

1. **User Profile Section**
   - Add a user avatar and "Guest User" label at the top of the sidebar
   - Include proper spacing and styling for this section
   - Ensure this updates dynamically when users log in

2. **Navigation Links Styling**
   - Remove the "Main" header and blue highlight from the current active item
   - Use simple white text on dark background for all navigation items
   - Add proper vertical spacing between items
   - Ensure consistent left alignment
   - Remove icons from the current design

3. **Navigation Structure**
   - Rename menu items to match Image 2:
     * Dashboard → Home
     * Interview Practice → Interview
     * Resume Analysis → Resume
     * Voice Practice → Voice Analysis (this will later be merged with Interview)
     * Job Matching → Jobs
     * Keep Progress and Settings as they are
     * Add a Profile item

4. **Footer Elements**
   - Add copyright text at the bottom: "© 2025 InterviewGPT"
   - Include a Pro Tip section at the bottom with a different styling

5. **Visual Styling**
   - Use the exact same dark background color (#121212)
   - Ensure proper font sizes and weights to match Image 2
   - Use consistent padding and margins throughout

## Technical Requirements:
- Implement using React/Next.js with TypeScript and Tailwind CSS
- Ensure the sidebar is responsive and collapses properly on mobile
- Make sure all links function correctly
- Add hover effects for better user interaction

The goal is to make the sidebar in Image 1 look identical to the one in Image 2, ensuring visual consistency across the application.

# InterviewGPT: AI-Powered Interview Coach & Resume Optimizer

## Project Overview
I'm developing InterviewGPT, a comprehensive AI platform designed to help job seekers prepare for interviews and optimize their resumes. This project is for my Advanced Data Science final portfolio assignment, focusing on creating a practical generative AI application that addresses real-world needs in the career preparation domain.

## Core Functionality
The platform will have two main components:

### 1. AI-Powered Mock Interview Coach
- Generate role-specific interview questions for various positions (Data Analyst, Software Engineer, Product Manager, etc.)
- Accept candidate responses via text input
- Evaluate answers based on multiple dimensions:
  * Content clarity and relevance
  * Technical accuracy
  * Confidence and tone
  * Behavioral structure (STAR format compliance)
- Provide numerical scoring (1-5) for each dimension
- Deliver personalized, constructive feedback on how to improve answers
- Track progress over time with visualization of improvement

### 2. Resume Optimization Engine
- Allow users to upload resumes (PDF/DOCX)
- Scan for ATS compatibility and optimization opportunities
- Analyze keyword matching against selected job descriptions
- Identify missing skills or experience gaps
- Suggest rewording for better impact (quantification, active verbs)
- Generate tailored professional summaries for specific roles
- Provide an overall ATS match score (0-100)

## Technical Requirements

### Frontend
- A clean, intuitive UI built with Streamlit
- Multiple tabs for different functions (Interview Practice, Resume Analysis, Progress Tracking)
- Responsive design that works well on desktop and mobile
- Clear visualization of scores and progress

### Backend
- Integration with OpenAI's GPT-4o API for question generation and answer evaluation
- PDF parsing capabilities for resume extraction
- Secure storage of user data and session history
- Progress tracking database (Firebase or SQLite)

### Data Processing
- Custom prompt engineering to ensure high-quality evaluations
- NLP processing to extract keywords from resumes and job descriptions
- Scoring algorithms for consistent feedback

## User Experience Flow
1. User creates an account or continues as guest
2. Selects either Interview Practice or Resume Analysis
3. For Interview Practice:
   - Selects job role and experience level
   - Receives tailored interview questions
   - Submits answers and receives immediate feedback
   - Can view progress over time if logged in
4. For Resume Analysis:
   - Uploads resume and optionally a job description
   - Receives ATS compatibility score and suggestions
   - Can generate a tailored version of their resume

## Advanced Features (Stretch Goals)
- Voice input for interview answers with real-time transcription
- Sentiment analysis on voice recordings to detect confidence levels
- Export of tailored resumes in multiple formats
- Spaced repetition for previously challenging questions
- Integration with actual job listings API
- Career path recommendations based on skills analysis

## Evaluation Criteria
- Accuracy and relevance of AI-generated feedback
- User experience and interface design
- Technical implementation and code quality
- Innovation and practical usefulness
- Portfolio presentation quality


## Deliverables
- Fully functional web application deployed on Streamlit Cloud or Hugging Face Spaces
- GitHub repository with well-documented code
- Demo video showcasing all features
- Technical report explaining implementation decisions
- User guide for navigating all features

This project aims to create a genuinely useful tool that job seekers can immediately apply to improve their interview performance and resume quality, while showcasing advanced skills in AI, NLP, and application development.

just needa websire with complete use of open ai, gen ai , rang and laang chain

# OpenAI API Configuration (Required)
OPENAI_API_KEY=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

# Application Settings
APP_NAME=InterviewGPT
DEBUG=True
LOG_LEVEL=INFO

# Database Configuration (SQLite - free and local)
DATABASE_URL=sqlite:///./data/user_data/interviewgpt.db

# Vector Database Configuration (FAISS - free and local)
VECTOR_DB=faiss
VECTOR_DB_PATH=./data/vector_db
KNOWLEDGE_BASE_PATH=./data/knowledge_base

# Model Configuration
DEFAULT_MODEL=gpt-4o
EMBEDDING_MODEL=text-embedding-3-small

# Application Features Toggle
ENABLE_RESUME_FEATURE=True
ENABLE_INTERVIEW_FEATURE=True
ENABLE_PROGRESS_TRACKING=True
ENABLE_REPORT_GENERATION=True

PYTHONPATH=./backend

# Security
SECRET_KEY=5b3c8da699ccc14320df62150811813dcfc46f659a3e7e919fcd54cc394aab93
ALLOWED_HOSTS=localhost,127.0.0.1

FIREBASE_CREDENTIALS_PATH=backend/firebase_credentials.json
FIREBASE_STORAGE_BUCKET=interviewgpt-f4116.appspot.com


{
  "type": "service_account",
  "project_id": "interviewgpt-f4116",
  "private_key_id": "fc3758b919780d6c58e4e4ab855509aa25faed0b",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDK68ekClpBSSaI\noYbFoksTPOjPPZGqhX7bDzghxG59OtbtHvSiPsGEJhjZreUOnPikeBZ11NW1wwWH\nZ9sMUUqvxI51rtnOfhceMR6F3vkt6vFaAd070i/9/+jQbY8DwpvORqqyJFgetzBB\nHvCi/qruELn9O+8Bnx+0FpOSwBTcnuzRl9r/pUZdBYoHAOuVnh5dPWdKq0uE0PIW\nPvXmIID85mJbC+eMQxSU2Fsamb5mUnhSnAOEUpj+6wt2BenpRJvFafCnyADDMHSR\nm1PSU295SAiFw21HF0e1+esJOkoTWSL5RY1FlZf7PRbGUscbdjhkLuqWYVgFwwoQ\natgKKKuzAgMBAAECggEAC6xIjb0yt/K3TsDL+e5+Fxs34UQPbxnC1GMpvXeJS5bo\n6jcPp42ooCt43nzMYmzRONTXpeuaZ5xSYxmsVicO/tF1yHtIeEJ0nf4BXX4YI3YS\ncDUPPvO2YwwnnmXPBk5ZnCIgi6LfltS+5+AZw6aWup8ns9OQyi0XK8rorlZyXMaF\nZnDFF8V+EV4BzGTTkBmhUo8JzADA2D/+7E+mIC0ftAke55dVcoKUrT02mVFoFg28\ni2SQjxucX+g7H14amealSx4IbYetehkR3jfktjWw91/DdSVa737FmLUohleVHA5O\nRScNuYhPLCItT1GcpJFUdT8ft77sLTP1V0yhDo3SQQKBgQDtajq5hAr43JzD/f4T\n5yMQSnP+yeKRZR8KjRi4/GkoLojTPq3yF5oDqynXtduwgSTzQKej2iEwzbKxECQN\ns2PpdNDy8kHy3rZlDkuM4qTYuh7xxxg8DfqJ5Ztq8Rau5IAG3Wyg4UZN0raVQOw9\n48yDhLdQs6hwIE1xevP0ZvAz0QKBgQDazkukozgfrPMVdM0QqI9UaN172mF0Yro+\ntEw8HCb9drZzOLwjxvVyKhAI/lePFhTDDuQ3N0l693XN/6usrU4T14BwxNznVoTt\neSRkD28WEDBdtg68GRTKV/24fSx4k4Wzb9LAnxzbTt4j+6CqNPLWg7BNxgXqMlFv\nE6INYuxcQwKBgDucK4h+7d5UTgwrzsqigzxI5Vz4xalp8WRNzwJLZf/Px0z69OPP\nJz16kXP21mU319Y3yp+qWiEN1Kr+eX7zJsfsK7aEOyjG4Jb5AuEp2ugLu09LhPs3\nK0vKWb59MAvTlY2jtO2kAmnx2SQae/aCJsxy2zApG8ajZa5zh6M64V6xAoGBALGm\ncTAY/UZqi2rOTHjMAqNMCRe39Qwj5Idop8TeLqH4MqZWWBrMPRgWIrLKnpikGvNM\nMerKzrQyGsnIXcBzbUMa40Or8pc5Xe/ZPbyn8098kWhkmo4J5yFqU6vopaS4UgOg\nNQMDrNA6to2MjaPkHY4hmZFrx/2gIRIIZLhtqu41AoGBAOXMfWkAfWJ2y38nlkeM\nYREO2lgKApu0tPNZwNFvL78Cb7ezW9pfhD8gqb1uhBxoFFE15L6bWYYh1Cn3aQd2\n3+Evusolu/k/vveOgNMDiVkvlZhxz6bz0ceEWL0bB4fNap1oYY/R1z8MJBniRKaJ\nx59NbhYPLCLwsFfxH7A28gLR\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@interviewgpt-f4116.iam.gserviceaccount.com",
  "client_id": "110952823021579746660",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40interviewgpt-f4116.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

  
  