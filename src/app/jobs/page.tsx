'use client';

import React, {useState, useEffect, useCallback} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {JobListing} from '@/services/job-listings';
import {useToast} from '@/hooks/use-toast';
import {useRouter} from 'next/navigation';
import {ArrowLeft, File as FileIcon, ListChecks, MessageSquare, User, MapPin, Briefcase, Calendar, Link} from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {Badge} from "@/components/ui/badge";
import {Slider} from "@/components/ui/slider";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";
import {Label} from "@/components/ui/label";

const JobsPage = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const {toast} = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const jobs = await getJobListings(jobTitle, location);
      setJobListings(jobs);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch jobs.');
      setJobListings([]);
    } finally {
      setLoading(false);
    }
  }, [jobTitle, location]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSearch = () => {
    fetchJobs();
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
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
                <FileIcon className="w-4 h-4"/>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
            </div>

            {showAdvancedFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              </div>
            )}

            <div className="flex justify-between mb-4">
              <Button onClick={handleSearch} variant="outline">
                Search
              </Button>
              <Button variant="secondary" onClick={toggleAdvancedFilters}>
                {showAdvancedFilters ? "Hide Filters" : "Show Advanced Filters"}
              </Button>
            </div>

            {loading && <div className="flex justify-center"><Skeleton className="w-48 h-8"/></div>}
            {error && <div className="text-red-500">Error: {error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobListings.length > 0 ? (
                jobListings.map((job, index) => (
                  <JobCard key={index} job={job}/>
                ))
              ) : !loading && (
                <div className="col-span-full text-center py-4">No jobs found matching your criteria.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarProvider>
  );
};

interface JobCardProps {
  job: JobListing;
}

const JobCard: React.FC<JobCardProps> = ({job}) => {
  return (
    <Card className="bg-white shadow-md rounded-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <CardTitle className="text-lg font-semibold truncate">{job.title}</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="icon">
                <Link className="h-4 w-4"/>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Apply Now
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Briefcase className="h-4 w-4"/>
          <span>{job.company}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
          <MapPin className="h-4 w-4"/>
          <span>{job.location}</span>
        </div>
        <CardDescription className="text-sm text-gray-700 mt-2 line-clamp-3">{job.description}</CardDescription>
        <Button asChild variant="link" className="mt-4">
          <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
            Learn More <ArrowLeft className="ml-2 h-4 w-4 rotate-180"/>
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobsPage;

async function getJobListings(
  jobTitle: string,
  location: string,
): Promise<JobListing[]> {
  const apiKey = 'a1669c566bmshb8c4ee08d9ea3dfp1c36a3jsn0e4929007baa';
  const apiUrl = 'https://jsearch.p.rapidapi.com/search';
  const host = 'jsearch.p.rapidapi.com';

  try {
    const params = new URLSearchParams({
      query: jobTitle,
      location: location,
      page: '1',
      num_pages: '1',
    });

    const response = await fetch(`${apiUrl}?${params.toString()}`, {
      headers: {
        'x-rapidapi-host': host,
        'x-rapidapi-key': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    const jobResults = data.data;

    if (!jobResults || !Array.isArray(jobResults)) {
      console.warn('No job results found or invalid API response format.');
      return [];
    }

    let formattedListings: JobListing[] = jobResults.map((job: any) => ({
      title: job.job_title || 'N/A',
      company: job.employer_name || 'N/A',
      description: job.job_description || 'N/A',
      applyUrl: job.apply_link || job.job_google_link || 'N/A',
      location: job.job_country || 'N/A',
    }));

    return formattedListings;
  } catch (error: any) {
    console.error('Error fetching job listings:', error);
    throw new Error(`Failed to fetch job listings: ${error.message}`);
  }
}
