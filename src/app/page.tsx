'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Clock, File, ListChecks, MessageSquare, User} from "lucide-react";
import React from "react";
import {Progress} from "@/components/ui/progress";
import {useRouter} from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleInterviewPractice = () => {
    router.push('/interview');
  };

  const handleResumeAnalysis = () => {
    router.push('/resume');
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <div className="flex flex-col items-center pt-4 pb-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://picsum.photos/200/200" alt="Guest User"/>
                <AvatarFallback>GU</AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium mt-2">Guest User</p>
            </div>
          </SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/" isActive={true}>
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
                  className="lucide lucide-home"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
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
                    d="M12.22 2.16a8.5 8.5 0 0 1 6.36 6.36 8.5 8.5 0 0 1-1.15 2.48m-2.48 1.15a8.5 8.5 0 0 1-6.36-6.37 8.5 8.5 0 0 1 1.15-2.48m2.48-1.14a8.5 8.5 0 0 0 6.36 6.37 8.5 8.5 0 0 0-1.15 2.48m-2.48 1.15a8.5 8.5 0 0 0-6.36-6.36 8.5 8.5 0 0 0 1.15-2.48M12 14.5V17m0-5 0 5M12 6.5V9m0 8V22m6.36-6.36a8.5 8.5 0 0 1-2.48-1.15"/>
                </svg>
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarGroup>
            <p className="text-xs text-muted-foreground px-2">© 2025 InterviewGPT</p>
            <div className="bg-secondary p-2 rounded-md mt-2">
              <p className="text-xs font-semibold">Pro Tip</p>
              <p className="text-xs text-muted-foreground">Practice makes perfect. The more you interview, the better you'll
                get!</p>
            </div>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
      <div className="flex-1 p-4">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Welcome to InterviewGPT</h1>
          <p className="text-muted-foreground">Your AI-powered interview coach and resume optimizer</p>
          <div className="flex justify-start space-x-4">
            <Button onClick={handleInterviewPractice}>Start Interview Practice</Button>
            <Button variant="outline" onClick={handleResumeAnalysis}>Analyze Resume</Button>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Practice Sessions</CardTitle>
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
                  className="lucide lucide-bar-chart-horizontal w-4 h-4"
                >
                  <path d="M3 3v18h18"/>
                  <path d="M9 7h12"/>
                  <path d="M9 12h9"/>
                  <path d="M9 17h6"/>
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
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
                  className="lucide lucide-line-chart w-4 h-4"
                >
                  <polyline points="3 3 9 11 13 7 21 15"/>
                  <polyline points="15 11 21 11"/>
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2/5</div>
                <p className="text-xs text-muted-foreground">+0.3 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resume Score</CardTitle>
                <File className="w-4 h-4"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">+5% from last version</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Practice Time</CardTitle>
                <Clock className="w-4 h-4"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.5 hrs</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
              <CardDescription>Your interview performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-48 flex items-center justify-center text-muted-foreground">
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
                  className="lucide lucide-wave-sine mr-2 h-4 w-4"
                >
                  <path d="M1 8c3 0 3.944 2.472 6.944 2.472S13.889 8 16.889 8 19.833 12.944 22 12.944"/>
                  <path d="M2 16c3 0 3.944-2.472 6.944-2.472S13.889 16 16.889 16 19.833 11.056 22 11.056"/>
                </svg>
                Progress chart will appear here
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest practice sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Data Analyst Interview</p>
                  <div className="flex items-center">
                    <p className="text-sm text-muted-foreground">4.5/5</p>
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
                      className="lucide lucide-trending-up ml-1 h-4 w-4 text-green-500"
                    >
                      <polyline points="22 7 13 18.6 8.5 14.2 2 21"/>
                      <polyline points="22 11 22 7 18.5 7"/>
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Today</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Resume Analysis</p>
                  <div className="flex items-center">
                    <p className="text-sm text-muted-foreground">85%</p>
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
                      className="lucide lucide-trending-up ml-1 h-4 w-4 text-green-500"
                    >
                      <polyline points="22 7 13 18.6 8.5 14.2 2 21"/>
                      <polyline points="22 11 22 7 18.5 7"/>
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Yesterday</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Product Manager Interview</p>
                  <div className="flex items-center">
                    <p className="text-sm text-muted-foreground">3.8/5</p>
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
                      className="lucide lucide-trending-down ml-1 h-4 w-4 text-red-500"
                    >
                      <polyline points="22 17 13 5.4 8.5 9.8 2 3"/>
                      <polyline points="22 13 22 17 18.5 17"/>
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">3 days ago</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Voice Practice Session</p>
                  <div className="flex items-center">
                    <p className="text-sm text-muted-foreground">4.2/5</p>
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
                      className="lucide lucide-trending-up ml-1 h-4 w-4 text-green-500"
                    >
                      <polyline points="22 7 13 18.6 8.5 14.2 2 21"/>
                      <polyline points="22 11 22 7 18.5 7"/>
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">1 week ago</p>
              </div>
              <Button variant="link" className="w-full justify-start">View All Activity</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarProvider>
  );
}
