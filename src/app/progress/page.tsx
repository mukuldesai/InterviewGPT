'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart,
  CartesianGrid, 
  Cell, 
  Legend, 
  Line, 
  LineChart, 
  Pie, 
  PieChart, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Calendar,
  CheckCircle, 
  File, 
  ListChecks, 
  MessageSquare, 
  User, 
  Clock,
  Activity,
  Award,
  TrendingUp,
  Star,
  Target,
  Zap,
  Share,
  Download,
  Sparkles,
  BriefcaseBusiness,
  BookOpen
} from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  HoverCard, 
  HoverCardContent, 
  HoverCardTrigger, 
  HoverCardProps 
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import confetti from 'canvas-confetti'; 
const ProgressPage = () => {
  // State for animations
  const [showCharts, setShowCharts] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [achievementUnlocked, setAchievementUnlocked] = useState(false);

  // Animated progress on load
  useEffect(() => {
    setShowCharts(true);
    const timer = setTimeout(() => {
      setProgressPercentage(75);
    }, 500);
    
    // Simulate achievement unlock after 3 seconds
    const achievementTimer = setTimeout(() => {
      setAchievementUnlocked(true);
      // Play confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(achievementTimer);
    };
  }, []);

  // Weekly progress data
  const weeklyProgressData = [
    { name: 'Week 1', score: 3.5, applications: 4, interviews: 1, newSkills: 2 },
    { name: 'Week 2', score: 4.0, applications: 6, interviews: 2, newSkills: 1 },
    { name: 'Week 3', score: 4.2, applications: 8, interviews: 3, newSkills: 3 },
    { name: 'Week 4', score: 4.5, applications: 10, interviews: 4, newSkills: 2 },
    { name: 'Week 5', score: 4.7, applications: 12, interviews: 5, newSkills: 2 },
    { name: 'Week 6', score: 4.8, applications: 14, interviews: 6, newSkills: 1 },
  ];

  // Monthly trend data for line chart
  const monthlyTrendData = [
    { month: 'Jan', applications: 20, interviews: 5, offers: 1 },
    { month: 'Feb', applications: 25, interviews: 8, offers: 0 },
    { month: 'Mar', applications: 35, interviews: 12, offers: 2 },
    { month: 'Apr', applications: 40, interviews: 15, offers: 1 },
  ];

  // Skills radar data
  const skillsData = [
    { subject: 'Technical', A: 120, B: 110, fullMark: 150 },
    { subject: 'Communication', A: 98, B: 130, fullMark: 150 },
    { subject: 'Problem Solving', A: 86, B: 130, fullMark: 150 },
    { subject: 'Teamwork', A: 99, B: 100, fullMark: 150 },
    { subject: 'Leadership', A: 85, B: 90, fullMark: 150 },
    { subject: 'Adaptability', A: 65, B: 85, fullMark: 150 },
  ];

  // Application success rate data
  const applicationData = [
    { name: 'Applied', value: 40 },
    { name: 'Screening', value: 25 },
    { name: 'Interview', value: 15 },
    { name: 'Offer', value: 10 },
    { name: 'Rejected', value: 10 },
  ];

  // Job fit scores
  const jobFitData = [
    { name: 'Software Engineer', score: 95 },
    { name: 'Frontend Developer', score: 90 },
    { name: 'Full Stack Developer', score: 85 },
    { name: 'DevOps Engineer', score: 70 },
    { name: 'Product Manager', score: 60 },
  ];

  // Color generator for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Activity logs
  const activityLogs = [
    { date: 'Today', activities: [
      { time: '10:30 AM', activity: 'Applied to Senior Developer at TechCorp', type: 'application' },
      { time: '2:15 PM', activity: 'Updated Resume', type: 'resume' },
    ]},
    { date: 'Yesterday', activities: [
      { time: '11:00 AM', activity: 'Mock Interview Session', type: 'interview' },
      { time: '4:30 PM', activity: 'Added React Native to Skills', type: 'skill' },
    ]},
    { date: 'Last Week', activities: [
      { time: 'Monday', activity: 'Applied to 3 jobs', type: 'application' },
      { time: 'Wednesday', activity: 'Received feedback on Portfolio', type: 'feedback' },
      { time: 'Friday', activity: 'Completed TypeScript course', type: 'learning' },
    ]},
  ];

  // Achievements
  const achievements = [
    { title: 'Fast Starter', description: 'Applied to 10+ jobs in first week', icon: <Zap className="h-6 w-6 text-yellow-500" />, unlocked: true },
    { title: 'Interview Ace', description: 'Passed 5 technical interviews', icon: <Star className="h-6 w-6 text-purple-500" />, unlocked: achievementUnlocked },
    { title: 'Skill Master', description: 'Added 10 new skills to profile', icon: <Award className="h-6 w-6 text-blue-500" />, unlocked: false },
    { title: 'Network Builder', description: 'Connected with 20 professionals', icon: <Share className="h-6 w-6 text-green-500" />, unlocked: false },
    { title: 'Offer Collector', description: 'Received 3 job offers', icon: <CheckCircle className="h-6 w-6 text-red-500" />, unlocked: false },
  ];

  // Learning resources
  const learningResources = [
    { title: 'System Design Interview', type: 'Course', completed: '75%', icon: <BookOpen className="h-4 w-4" /> },
    { title: 'React Advanced Patterns', type: 'Tutorial', completed: '90%', icon: <BookOpen className="h-4 w-4" /> },
    { title: 'Typescript Masterclass', type: 'Course', completed: '50%', icon: <BookOpen className="h-4 w-4" /> },
  ];

  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return ( 
    <SidebarProvider >
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
              <SidebarMenuButton href="/progress" className="bg-primary/10">
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
              <SidebarMenuButton href="/profile">
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
                    d="M12.22 2.16a8.5 8.5 0 0 1 6.36 6.36 8.5 8.5 0 0 1-1.15 2.48m-2.48 1.15a8.5 8.5 0 0 0 6.36 6.37 8.5 8.5 0 0 0-1.15 2.48m-2.48 1.15a8.5 8.5 0 0 0-6.36-6.36 8.5 8.5 0 0 0 1.15-2.48M12 14.5V17m0-5 0 5M12 6.5V9m0 8V22m6.36-6.36a8.5 8.5 0 0 1-2.48-1.15"/>
                </svg>
                Settings
              </SidebarMenuButton >
            </SidebarMenuItem>
          </SidebarMenu >
        </SidebarContent>
      </Sidebar>

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Progress Tracking</h1>
            <p className="text-muted-foreground">Track your job search journey and improvements</p>
          </div>
          <Button variant="ghost" onClick={handleBackToHome} className="mt-2 md:mt-0">
            <ArrowLeft className="mr-2"/>
            Back to Home
          </Button>
        </div>

        {/* Summary Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
                    <h3 className="text-2xl font-bold mt-1">75%</h3>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>                
                <Progress value={progressPercentage} className="mt-4 h-2" />
                <p className="text-xs text-muted-foreground mt-2">+5% from last week</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Applications</p>
                    <h3 className="text-2xl font-bold mt-1">42</h3>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-full">
                    <File className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-xs font-medium text-green-500">+12 this week</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Interviews</p>
                    <h3 className="text-2xl font-bold mt-1">8</h3>
                  </div>
                  <div className="bg-purple-100 p-2 rounded-full">
                    <MessageSquare className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-xs font-medium text-green-500">+3 this week</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Profile Strength</p>
                    <h3 className="text-2xl font-bold mt-1">92/100</h3>
                  </div>
                  <div className="bg-green-100 p-2 rounded-full">
                    <Award className="h-6 w-6 text-green-500" />
                  </div>
                </div>
                
                <Progress value={92} className="mt-4 h-2" />

                {/* ✅ Corrected HoverCard */}
                <HoverCard
                  trigger={
                    <Button variant="link" className="p-0 h-auto text-xs mt-1">
                      View suggestions
                    </Button>
                  }
                  content={
                    <div className="w-80 space-y-2">
                      <h4 className="text-sm font-semibold">Profile Improvement Tips</h4>
                      <div className="flex gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Add 1 more project</span>
                      </div>
                      <div className="flex gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Complete your education details</span>
                      </div>
                    </div>
                  }
                />
                
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Charts */} 
          <div className="lg:col-span-2 space-y-6">
            <Tabs 
              defaultValue="overview" 
              className="w-full"
              onValueChange={(value) => setActiveTab(value)}
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="fit">Job Fit</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Progress Score</CardTitle>
                    <CardDescription>Your overall job search progress over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AnimatePresence>
                      {showCharts && activeTab === "overview" && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={weeklyProgressData} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                              <defs>
                                <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis domain={[0, 5]} />
                              <Tooltip 
                                content={({ active, payload, label }: any) => {
                                  if (active && payload && payload.length) {
                                    return (
                                      <div className="bg-background border rounded p-2 shadow-md">
                                        <p className="font-semibold">{label}</p>
                                        <p className="text-sm">Score: <span className="font-medium">{payload[0].value}</span></p>
                                        <p className="text-sm">Applications: <span className="font-medium">{payload[0].payload.applications}</span></p>
                                        <p className="text-sm">Interviews: <span className="font-medium">{payload[0].payload.interviews}</span></p>
                                      </div>
                                    );
                                  }
                                  return null;
                                }}
                              />
                              <Area 
                                type="monotone" 
                                dataKey="score" 
                                stroke="#8884d8" 
                                fillOpacity={1} 
                                fill="url(#scoreColor)" 
                                animationDuration={1500}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Monthly Trends */}
                    <div className="mt-8">
                      <h3 className="text-sm font-medium mb-4">Monthly Application Trends</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={monthlyTrendData} margin={{top: 5, right: 30, left: 0, bottom: 5}}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="applications" stroke="#8884d8" animationDuration={1500} />
                          <Line type="monotone" dataKey="interviews" stroke="#82ca9d" animationDuration={1500} />
                          <Line type="monotone" dataKey="offers" stroke="#ff7300" animationDuration={1500} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent >
              
              <TabsContent value="applications">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Funnel</CardTitle>
                    <CardDescription>Track where your applications are in the process</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AnimatePresence>
                      {showCharts && activeTab === "applications" && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="flex items-center justify-center"
                        >
                          <div className="w-full md:w-2/3">
                            <ResponsiveContainer width="100%" height={300}>
                              <PieChart>
                                <Pie
                                  data={applicationData}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  outerRadius={100}
                                  fill="#8884d8"
                                  dataKey="value"
                                  animationDuration={1500}
                                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                  {applicationData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {/* Application Stats */}
                    {/* Application Stats */}
                    <div className="mt-8 grid grid-cols-3 gap-4">
                      <motion.div 
                        className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg"
                         initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="text-3xl font-bold text-blue-600 mb-1">40%</div>
                        <div className="text-sm text-center text-blue-700">Response Rate</div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="text-3xl font-bold text-green-600 mb-1">25%</div>
                        <div className="text-sm text-center text-green-700">Interview Rate</div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="text-3xl font-bold text-purple-600 mb-1">6.2</div>
                        <div className="text-sm text-center text-purple-700">Days to Response</div>
                      </motion.div>
                    </div>
                  </CardContent >
                </Card>
              </TabsContent >
              
              <TabsContent value="skills">
                <Card >
                  <CardHeader>
                    <CardTitle>Skills Assessment</CardTitle>
                    <CardDescription>Your skills compared to job requirements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AnimatePresence>
                      {showCharts && activeTab === "skills" && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <ResponsiveContainer width="100%" height={350}>
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
                              <PolarGrid />
                              <PolarAngleAxis dataKey="subject" />
                              <PolarRadiusAxis angle={30} domain={[0, 150]} />
                              <Radar name="Your Skills" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} animationDuration={1500} />
                              <Radar name="Job Requirements" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} animationDuration={1500} />
                              <Legend />
                              <Tooltip />
                            </RadarChart>
                          </ResponsiveContainer>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Skill Improvement */} 
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-4">Skill Improvement Progress</h3>
                      <div className="space-y-4" >
                        <motion.div 
                          className="space-y-1"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="flex justify-between">
                            <span className="text-sm">React</span>
                            <span className="text-sm font-medium">Advanced</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </motion.div>
                        
                        <motion.div 
                          className="space-y-1"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="flex justify-between">
                            <span className="text-sm">TypeScript</span>
                            <span className="text-sm font-medium">Intermediate</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </motion.div>
                        
                        <motion.div 
                          className="space-y-1"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="flex justify-between">
                            <span className="text-sm">Node.js</span>
                            <span className="text-sm font-medium">Intermediate</span>
                          </div>
                          <Progress value={70} className="h-2" />
                        </motion.div>
                        
                        <motion.div 
                          className="space-y-1"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <div className="flex justify-between">
                            <span className="text-sm">System Design</span>
                            <span className="text-sm font-medium">Beginner</span>
                          </div>
                          <Progress value={45} className="h-2" />
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent >
              <TabsContent value="fit">
                  <Card>
                </Card>
              </TabsContent>
            </Tabs>
            
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProgressPage;