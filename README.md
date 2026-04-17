# InterviewGPT — AI Interview Preparation Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![Firebase](https://img.shields.io/badge/Firebase-DD2C00?style=flat&logo=firebase&logoColor=white)](https://firebase.google.com)
[![OpenAI](https://img.shields.io/badge/OpenAI_GPT--4o-412991?style=flat&logo=openai&logoColor=white)](https://openai.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)

Full-stack AI-powered interview preparation platform. Generates role-specific interview questions using GPT-4o, analyzes resumes with quality scoring, and tracks performance improvement over time.

🔗 **[Live Demo](https://interview-gpt-qbxh.vercel.app)**

---

## Features

**Dynamic Interview Simulator**
- Role and industry-specific question generation using GPT-4o
- Behavioral, technical, and situational question types
- Real-time AI feedback on responses with actionable suggestions

**AI Resume Analyzer**
- Resume quality scoring with gap identification
- Section-by-section improvement recommendations
- ATS keyword analysis

**Progress Dashboard**
- Session history with performance trends
- Improvement tracking across question categories
- Exportable session summaries

**Profile Management**
- Application tracker with status management
- Session bookmarking and review

---

## Tech Stack

| Layer | Tool |
|---|---|
| Frontend | Next.js 14, React, TypeScript, Tailwind CSS |
| Backend | Firebase (Firestore, Auth, Cloud Functions) |
| AI | OpenAI GPT-4o, Google Gemini 2.0 Flash |
| Deployment | Vercel |

---

## Project Structure

```
InterviewGPT/
├── app/
│   ├── (auth)/               # Authentication pages
│   ├── dashboard/            # Main user dashboard
│   ├── interview/            # Interview simulator
│   └── profile/              # User profile management
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── interview/            # Interview-specific components
│   └── dashboard/            # Dashboard widgets
├── lib/
│   ├── firebase.ts           # Firebase configuration
│   ├── openai.ts             # GPT-4o integration
│   └── utils.ts
├── public/
├── tailwind.config.ts
└── package.json
```

---

## Setup

```bash
git clone https://github.com/mukuldesai/InterviewGPT
cd InterviewGPT
npm install
```

Create `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_key
```

```bash
npm run dev
# Visit http://localhost:3000
```

---

## Deployment

This project deploys automatically to Vercel on push to `main`. To deploy your own instance:

1. Fork this repository
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

---

## Author

**Mukul Desai** — Data Engineer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-mukuldesai-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/mukuldesai)
[![Portfolio](https://img.shields.io/badge/Portfolio-mukuldesai.vercel.app-000000?style=flat&logo=vercel&logoColor=white)](https://mukuldesai.vercel.app)
