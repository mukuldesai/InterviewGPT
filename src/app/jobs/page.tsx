'use client';

import React, {useState, useEffect} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {JobListing} from '@/services/job-listings';
import {useToast} from '@/hooks/use-toast';
import {useRouter} from 'next/navigation';
import {ArrowLeft} from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {File, ListChecks, MessageSquare, User} from "lucide-react";

const adzunaAppId = '4cc9f61bcf7dd24c36d8bc59a8f56805';
const adzunaAppKey = '67a5043d';

const JobsPage = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const {toast} = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchJobListings = async () => {
      if (!jobTitle || !location) {
        return;
      }

      try {
        let apiUrl = `https://api.adzuna.com/v1/api/jobs/${location.toLowerCase().replace(
          ' ',
          '_'
        )}/search/1?app_id=${adzunaAppId}&app_key=${adzunaAppKey}&what=${jobTitle}&content-type=application/json`;

        // Add salary filter if specified
        if (salaryRange) {
          apiUrl += `&salary_min=${salaryRange}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results) {
          const formattedListings: JobListing[] = data.results.map((job: any) => ({
            title: job.title,
            company: job.company.display_name,
            description: job.description,
            applyUrl: job.redirect_url,
          }));

          // Filter job listings based on experience level
          const filteredListings = experienceLevel
            ? formattedListings.filter(listing =>
                listing.description.toLowerCase().includes(experienceLevel.toLowerCase())
              )
            : formattedListings;

          setJobListings(filteredListings);
        } else {
          setJobListings([]);
        }
      } catch (error) {
        console.error('Error fetching job listings:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch job listings.',
          variant: 'destructive',
        });
        setJobListings([]);
      }
    };

    fetchJobListings();
  }, [jobTitle, location, experienceLevel, salaryRange]);

  const handleBackToHome = () => {
    router.push('/');
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
      </Sidebar>

      <div className="container mx-auto py-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Job Listings</CardTitle>
              <Button variant="ghost" onClick={handleBackToHome}>
                <ArrowLeft className="mr-2"/>
                Back to Home
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Input
                type="text"
                placeholder="Job Title"
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Location"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
              <Select onValueChange={setExperienceLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Experience Level"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any</SelectItem>
                  <SelectItem value="entry level">Entry Level</SelectItem>
                  <SelectItem value="associate">Associate</SelectItem>
                  <SelectItem value="mid level">Mid Level</SelectItem>
                  <SelectItem value="senior level">Senior Level</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Input
                type="number"
                placeholder="Salary Range (Minimum)"
                value={salaryRange}
                onChange={e => setSalaryRange(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobListings.map((job, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>{job.company}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{job.description.substring(0, 100)}...</p>
                    <Button asChild>
                      <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                        Apply Now
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
              {jobListings.length === 0 && <p>No jobs found matching your criteria.</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarProvider>
  );
};

export default JobsPage;
