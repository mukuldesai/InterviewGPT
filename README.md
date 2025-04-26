# InterviewGPT

InterviewGPT
InterviewGPT is a web-based application designed to assist users in preparing for job interviews by leveraging the capabilities of generative AI. It offers personalized interview simulations, feedback, and resources to enhance interview readiness.

🚀 Features
AI-Powered Interview Simulations: Engage in mock interviews with AI-generated questions tailored to specific roles and industries.

Real-Time Feedback: Receive instant feedback on responses to improve performance.

Resource Library: Access a curated collection of articles, tips, and best practices for interview preparation.

User Profiles: Track progress over time and revisit previous interview sessions.

Responsive Design: Optimized for both desktop and mobile devices.

🛠️ Tech Stack
Frontend: Next.js, React, TypeScript, Tailwind CSS

Backend: Firebase (Authentication, Firestore, Cloud Functions)

AI Integration: OpenAI GPT-4 API

Deployment: Vercel

📦 Installation
To set up the project locally:

Clone the repository:

bash
Copy
Edit
git clone https://github.com/mukuldesai/InterviewGPT.git
cd InterviewGPT
Install dependencies:

bash
Copy
Edit
npm install
Set up environment variables:

Create a .env.local file in the root directory and add the following variables:

env
Copy
Edit
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
Replace the placeholder values with your actual Firebase and OpenAI credentials.

Run the development server:

bash
Copy
Edit
npm run dev
The application will be available at http://localhost:3000.

🌐 Live Demo
Experience the application live at: https://interview-gpt-qbxh.vercel.app/

⚙️ Deployment
The project is deployed on Vercel. To deploy your own instance:

Push the code to GitHub:

Ensure your local repository is connected to GitHub and push your changes:

bash
Copy
Edit
git add .
git commit -m "Initial commit"
git push origin main
Import the project to Vercel:

Go to Vercel and sign in.

Click on "New Project" and import your GitHub repository.

During the setup, add the necessary environment variables as specified above.

Click "Deploy" to initiate the deployment process.

🧪 Usage
Once deployed:

Navigate to the live application URL.

Sign up or log in using your credentials.

Start a new interview simulation by selecting your desired role and industry.

Answer the AI-generated questions and receive feedback.

Explore the resource library for additional preparation materials.

📁 Project Structure
ruby
Copy
Edit
InterviewGPT/
├── components/ # Reusable UI components
├── pages/ # Next.js pages
├── public/ # Static assets
├── styles/ # Global styles
├── utils/ # Utility functions
├── .env.local # Environment variables
├── next.config.js # Next.js configuration
├── tailwind.config.js # Tailwind CSS configuration
└── package.json # Project metadata and scripts
🤝 Contributing
Contributions are welcome! To contribute:

Fork the repository.

Create a new branch:

bash
Copy
Edit
git checkout -b feature/your-feature-name
Make your changes and commit them:

bash
Copy
Edit
git commit -m "Add your message here"
Push to your forked repository:

bash
Copy
Edit
git push origin feature/your-feature-name
Open a pull request on the main repository.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

📄 License
This project is licensed under the MIT License.

🙏 Acknowledgments
OpenAI for providing the GPT-4 API.

Firebase for backend services.

Vercel for deployment infrastructure.

Tailwind CSS for utility-first CSS framework.
