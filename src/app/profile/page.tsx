'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  User, 
  File, 
  ListChecks, 
  MessageSquare, 
  MapPin, 
  Mail, 
  Briefcase, 
  Award, 
  Calendar, 
  Edit, 
  CheckCircle, 
  BookmarkIcon, 
  Clock, 
  Bookmark,
  Github,
  Linkedin,
  Globe,
} from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User as FirebaseAuthUser } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};


const app = initializeApp(firebaseConfig);

// Then:
const auth = getAuth(app);
const db = getFirestore(app);

const ProfilePage = () => {
  // State management
  const [userData, setUserData] = useState({
    name: 'Mukul Desai',
    email: 'mukul.desai12@gmail.com',
    location: 'Boston, USA',
    experience: '2+ years',
    skills: ['JPython', 'SQL', 'Tableau', 'PowerBI', 'ETL'],
    bio: 'Data-driven professional with expertise in data engineering, financial analytics, and AI-driven modeling.',
    education: [
      { degree: 'BE in Electronics and Telecommunications', institution: 'Vivekanand Education Society’s Institute of Technology, University of Mumbai', year: '2023' }
    ],
    projects: [
      { name: 'Real-Time Financial Risk & Fraud Detection System', description: 'Developed a real-time data pipeline using Kafka & Apache Flink to process live stock market transactions', link: 'https://github.com/johndoe/ecommerce' }
    ],
    social: {
      github: 'https://github.com/mukuldesai',
      linkedin: 'https://linkedin.com/in/mukuldesai',
      portfolio: 'https://v0-portfolio-page-creation-seven.vercel.app/'
    },
    joinedDate: 'January 2024'
  });

  // Add this at the very top (below imports)

// Firestore Saved Job type
interface SavedJob {
  id: string;
  job_title: string;
  employer_name: string;
  job_city: string;
  job_country: string;
  job_description: string;
}

// Firestore Application type
interface Application {
  id: string;
  jobTitle: string;
  company: string;
  status: "Applied" | "In Review" | "Interview" | "Offer" | "Rejected";
  appliedDate: string;
  progressPercentage: number;
}

  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [applicationHistory, setApplicationHistory] = useState<Application[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({...userData});
  const [user, setUser] = useState<FirebaseAuthUser | null>(null);
  const [loading, setLoading] = useState(true);
 
  
  
  const [progressStats, setProgressStats] = useState({
    applicationsSubmitted: 12,
    interviewsCompleted: 4,
    resumeScore: 78,
    skillsMatched: 85
  });

  const router = useRouter();

  // Firebase authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchUserData(currentUser.uid);
        fetchSavedJobs(currentUser.uid);
        fetchApplicationHistory(currentUser.uid);
      } else {
        setLoading(false);
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  // Fetch user data from Firestore
  const fetchUserData = async (userId: string) => {
    try {
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, "users", userId));
      
      if (userDoc.exists()) {
        setUserData({...userData, ...userDoc.data()});
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  // Fetch saved jobs
  const fetchSavedJobs = async (userId: string) => {
    try {
      const db = getFirestore();
      const savedJobsRef = collection(db, "users", userId, "savedJobs");
      const snapshot = await getDocs(savedJobsRef);
      
      const jobs: SavedJob[] = [];
      snapshot.forEach((doc) => {
        jobs.push({id: doc.id, ...doc.data().jobData});
      });
      
      setSavedJobs(jobs);
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
    }
  };
  
  // Fetch application history
  const fetchApplicationHistory = async (userId: string) => {
    try {
      const db = getFirestore();
      const applicationsRef = collection(db, "users", userId, "applications");
      const snapshot = await getDocs(applicationsRef);
  
      const applications: Application[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        applications.push({
          id: doc.id,
          jobTitle: data.jobTitle || "Software Engineer",
          company: data.company || "Unknown Company",
          status: data.status || "Applied",
          appliedDate: data.appliedDate || new Date().toISOString(),
          progressPercentage: data.progressPercentage || 25,
        });
      });
  
      setApplicationHistory(applications);
    } catch (error) {
      console.error("Error fetching application history:", error);
    }
  };
  

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    try {
      const db = getFirestore();
      await setDoc(doc(db, "users", user.uid), editData, { merge: true });
      setUserData(editData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  
  const handleEditChange = (field: keyof typeof userData, value: string) => {
    setEditData({...editData, [field]: value});
  };
  
  const handleSkillChange = (value: string) => {
    const skillsArray = value.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
    setEditData({...editData, skills: skillsArray});
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/">
                Home
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/interview">
                <MessageSquare className="w-4 h-4"/>
                Interview
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/resume">
                <File className="w-4 h-4"/>
                Resume
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/jobs">
                <ListChecks className="w-4 h-4"/>
                Jobs
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/progress">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-bar-chart-4"
                >
                  <path d="M3 3v18h18"/>
                  <path d="M7 11V5"/>
                  <path d="M11 19V8"/>
                  <path d="M15 15V3"/>
                  <path d="M19 10v5"/>
                </svg>
                Progress
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/profile" className="bg-primary/10">
                <User className="w-4 h-4"/>
                Profile
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/settings">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-settings"
                >
                  <path
                    d="M12.22 2.16a8.5 8.5 0 0 1 6.36 6.36 8.5 8.5 0 0 1-1.15 2.48m-2.48 1.15a8.5 8.5 0 0 1-6.36-6.37 8.5 8.5 0 0 1 1.15-2.48m2.48-1.14a8.5 8.5 0 0 0 6.36 6.37 8.5 8.5 0 0 0-1.15 2.48m-2.48 1.15a8.5 8.5 0 0 0-6.36-6.36 8.5 8.5 0 0 0 1.15-2.48M12 14.5V17m0-5 0 5M12 6.5V9m0 8V22m6.36-6.36a8.5 8.5 0 0 1-2.48-1.15"/>
                </svg>
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <Button variant="ghost" onClick={handleBackToHome}>
            <ArrowLeft className="mr-2"/>
            Back to Home
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="https://picsum.photos/id/225/200/200" alt={userData.name}/>
                    <AvatarFallback>{userData.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                </motion.div>
                <h2 className="text-xl font-semibold">{userData.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{userData.email}</p>
                
                <div className="w-full space-y-3 mt-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground"/>
                    <span>{userData.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2 text-muted-foreground"/>
                    <span>{userData.experience}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground"/>
                    <span>Joined {userData.joinedDate}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-6">
                  {userData.social.github && (
                    <a href={userData.social.github} target="_blank" rel="noopener noreferrer">
                      <Button size="icon" variant="outline">
                        <Github className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                  {userData.social.linkedin && (
                    <a href={userData.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <Button size="icon" variant="outline">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                  {userData.social.portfolio && (
                    <a href={userData.social.portfolio} target="_blank" rel="noopener noreferrer">
                      <Button size="icon" variant="outline">
                        <Briefcase className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mt-6">
                      <Edit className="mr-2 h-4 w-4" /> Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input 
                          id="name" 
                          value={editData.name} 
                          onChange={(e) => handleEditChange('name', e.target.value)} 
                          className="col-span-3" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-right">
                          Location
                        </Label>
                        <Input 
                          id="location" 
                          value={editData.location} 
                          onChange={(e) => handleEditChange('location', e.target.value)} 
                          className="col-span-3" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="experience" className="text-right">
                          Experience
                        </Label>
                        <Input 
                          id="experience" 
                          value={editData.experience} 
                          onChange={(e) => handleEditChange('experience', e.target.value)} 
                          className="col-span-3" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="skills" className="text-right">
                          Skills
                        </Label>
                        <Input 
                          id="skills" 
                          value={editData.skills.join(', ')} 
                          onChange={(e) => handleSkillChange(e.target.value)} 
                          className="col-span-3" 
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bio" className="text-right">
                          Bio
                        </Label>
                        <Textarea 
                          id="bio" 
                          value={editData.bio} 
                          onChange={(e) => handleEditChange('bio', e.target.value)} 
                          className="col-span-3" 
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleSaveProfile}>Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
              </TabsList>
              
              {/* About Tab */}
              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-sm text-muted-foreground mb-6"
                    >
                      {userData.bio}
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <h3 className="text-lg font-semibold mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {userData.skills.map((skill, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <Badge variant="secondary">{skill}</Badge>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <h3 className="text-lg font-semibold mb-2">Education</h3>
                      <div className="space-y-2 mb-6">
                        {userData.education.map((edu, index) => (
                          <div key={index} className="flex justify-between">
                            <div>
                              <p className="font-medium">{edu.degree}</p>
                              <p className="text-sm text-muted-foreground">{edu.institution}</p>
                            </div>
                            <p className="text-sm">{edu.year}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <h3 className="text-lg font-semibold mb-2">Projects</h3>
                      <div className="space-y-4">
                        {userData.projects.map((project, index) => (
                          <Card key={index} className="bg-muted/50">
                            <CardContent className="p-4">
                              <h4 className="font-medium">{project.name}</h4>
                              <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                              <a 
                                href={project.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline"
                              >
                                View Project
                              </a>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Progress Tab */}
              <TabsContent value="progress">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Progress</CardTitle>
                    <CardDescription>Track your job search journey and see your improvements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-lg border p-4"
                      >
                        <div className="text-sm font-medium text-muted-foreground mb-1">Applications Submitted</div>
                        <div className="text-2xl font-bold mb-2">{progressStats.applicationsSubmitted}</div>
                        <Progress value={progressStats.applicationsSubmitted * 5} className="h-2" />
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="rounded-lg border p-4"
                      >
                        <div className="text-sm font-medium text-muted-foreground mb-1">Interviews Completed</div>
                        <div className="text-2xl font-bold mb-2">{progressStats.interviewsCompleted}</div>
                        <Progress value={progressStats.interviewsCompleted * 20} className="h-2" />
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="rounded-lg border p-4"
                      >
                        <div className="text-sm font-medium text-muted-foreground mb-1">Resume Score</div>
                        <div className="text-2xl font-bold mb-2">{progressStats.resumeScore}%</div>
                        <Progress value={progressStats.resumeScore} className="h-2" />
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="rounded-lg border p-4"
                      >
                        <div className="text-sm font-medium text-muted-foreground mb-1">Skills Matched</div>
                        <div className="text-2xl font-bold mb-2">{progressStats.skillsMatched}%</div>
                        <Progress value={progressStats.skillsMatched} className="h-2" />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <CheckCircle className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Resume Updated</p>
                            <p className="text-sm text-muted-foreground">You updated your resume 2 days ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <MessageSquare className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Mock Interview Completed</p>
                            <p className="text-sm text-muted-foreground">You completed a mock interview 3 days ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <BookmarkIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Job Saved</p>
                            <p className="text-sm text-muted-foreground">You saved a new job 5 days ago</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Saved Jobs Tab */}
              <TabsContent value="saved">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Jobs</CardTitle>
                    <CardDescription>Jobs you've saved for later</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {savedJobs.length === 0 ? (
                      <div className="text-center py-10">
                        <Bookmark className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No saved jobs yet</h3>
                        <p className="text-sm text-muted-foreground mb-4">Jobs you save will appear here</p>
                        <Button onClick={() => router.push('/jobs')}>Browse Jobs</Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {savedJobs.map((job, index) => (
                          <motion.div
                            key={job.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <Card className="overflow-hidden hover:shadow-md transition-shadow">
                              <CardContent className="p-0">
                                <div className="p-4 border-b">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="font-medium text-lg">{job.job_title || job.job_title}</h3>
                                      <p className="text-sm text-muted-foreground">{job.employer_name}</p>
                                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                                        <MapPin className="h-3.5 w-3.5" />
                                        <span>{job.job_city}, {job.job_country}</span>
                                      </div>
                                    </div>
                                    <button className="text-muted-foreground hover:text-primary">
                                      <BookmarkIcon className="h-5 w-5 fill-current" />
                                    </button>
                                  </div>
                                </div>
                                <div className="p-4">
                                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                    {job.job_description || job.job_description}
                                  </p>
                                  <div className="flex justify-between">
                                    <Button size="sm" variant="outline" onClick={() => router.push(`/jobs/${job.id}`)}>
                                      View Details
                                    </Button>
                                    <Button size="sm">
                                      Apply Now
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Applications Tab */}
              <TabsContent value="applications">
                <Card>
                  <CardHeader>
                    <CardTitle>Application History</CardTitle>
                    <CardDescription>Track the status of your job applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {applicationHistory.length === 0 ? (
                      <div className="text-center py-10">
                        <File className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No applications yet</h3>
                        <p className="text-sm text-muted-foreground mb-4">Your job applications will appear here</p>
                        <Button onClick={() => router.push('/jobs')}>Browse Jobs</Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {applicationHistory.map((application, index) => (
                          <motion.div
                            key={application.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <Card>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-medium">{application.jobTitle || 'Software Engineer'}</h3>
                                    <p className="text-sm text-muted-foreground">{application.company || 'Tech Company, Inc.'}</p>
                                  </div>
                                  <Badge 
                                    variant={
                                      application.status === "Applied" ? "secondary" :
                                      application.status === "In Review" ? "default" :
                                      application.status === "Interview" ? "secondary" :
                                      application.status === "Offer" ? "default" :
                                      "outline"
                                    }
                                    
                                  >
                                    {application.status || 'Applied'}
                                  </Badge>
                                </div>
                                
                                <div className="flex items-center mt-3 text-sm text-muted-foreground">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>Applied {application.appliedDate || '2 weeks ago'}</span>
                                </div>
                                
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
                                  <div className="col-span-2">
                                    <p className="text-sm font-medium">Application Status</p>
                                    <div className="relative pt-1">
                                      <div className="flex mb-2 items-center justify-between">
                                        <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary">
                                          {application.progressPercentage || '25'}%
                                        </div>
                                      </div>
                                      <div className="overflow-hidden h-2 text-xs flex rounded bg-muted">
                                        <div 
                                          style={{ width: `${application.progressPercentage || 25}%` }}
                                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <Button variant="outline" size="sm">
                                      View Details
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProfilePage;