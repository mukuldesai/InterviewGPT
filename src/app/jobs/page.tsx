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

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import axios from "axios";
import {FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_AUTH_DOMAIN, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET} from "@/app/config";

// Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const JobsPage = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobListings, setJobListings] = useState<any[]>([]);
  const {toast} = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const jobs = await searchJobsFromFirebase({keywords: jobTitle, location: location});
      setJobListings(jobs);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch jobs.');
      setJobListings([]);
    } finally {
      setLoading(false);
    }
  }, [jobTitle, location]);

  useEffect(() => {
    const refreshJobsIfNeeded = async () => {
      try {
        // Check when jobs were last updated
        const lastUpdate = localStorage.getItem('lastJobsUpdate');
        const now = new Date();

        // If never updated or updated more than 24 hours ago
        if (!lastUpdate || (now - new Date(lastUpdate)) > 24 * 60 * 60 * 1000) {
          // Fetch fresh jobs from API
          const newJobs = await fetchJobsFromAPI();

          // Store in Firebase
          await storeJobsInFirebase(newJobs);

          // Update last refresh time
          localStorage.setItem('lastJobsUpdate', now.toISOString());
        }
      } catch (error) {
        console.error("Error refreshing jobs:", error);
      }
    };

    refreshJobsIfNeeded();
  }, []);

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
  job: any;
}

const JobCard: React.FC<JobCardProps> = ({job}) => {
  return (
    <Card className="bg-white shadow-md rounded-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <CardTitle className="text-lg font-semibold truncate">{job.title}</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="icon" onClick={() => applyToJob(job.apply_url)}>
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
          <span>{job.company_name}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
          <MapPin className="h-4 w-4"/>
          <span>{job.location}</span>
        </div>
        <CardDescription className="text-sm text-gray-700 mt-2 line-clamp-3">{job.description}</CardDescription>
        <Button asChild variant="link" className="mt-4">
          {/*{job.applyUrl}*/}
          {/*<a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">*/}
          {/*  Learn More <ArrowLeft className="ml-2 h-4 w-4 rotate-180"/>*/}
          {/*</a>*/}
        </Button>
      </CardContent>
    </Card>
  );
};

async function fetchJobsFromAPI(params = {}) {
  try {
    // Set up the API request with your parameters
    const options = {
      method: 'GET',
      url: 'https://active-jobs-db.p.rapidapi.com/active-ats-6m',
      params: {
        description_type: 'text',
        // Add any additional parameters based on user search
        ...params
      },
      headers: {
        'x-rapidapi-host': 'active-jobs-db.p.rapidapi.com',
        'x-rapidapi-key': 'a1669c566bmshb8c4ee08d9ea3dfp1c36a3jsn0e4929007baa'
      }
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs from API:", error);
    throw error;
  }
}

// 4. Function to store jobs in Firebase
async function storeJobsInFirebase(jobs) {
  try {
    const jobsCollection = collection(db, "jobs");
    const batch = [];

    for (const job of jobs) {
      // Check if job already exists to avoid duplicates
      const q = query(jobsCollection, where("job_id", "==", job.job_id));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Format the job data for storage
        const jobData = {
          job_id: job.job_id,
          title: job.title,
          company_name: job.company_name,
          location: job.location,
          description: job.description,
          apply_url: job.apply_url, // This is the critical field for redirecting to apply
          posted_date: new Date(job.posted_at),
          salary: job.salary || "Not specified",
          job_type: job.job_type || "Not specified",
          keywords: extractKeywords(job.title, job.description),
          last_updated: new Date()
        };

        batch.push(addDoc(jobsCollection, jobData));
      }
    }

    // Execute all document additions
    await Promise.all(batch);
    console.log(`${batch.length} new jobs added to database`);

    return true;
  } catch (error) {
    console.error("Error storing jobs in Firebase:", error);
    throw error;
  }
}

// 5. Function to extract keywords for better searching
function extractKeywords(title, description) {
  // Simple implementation - split on spaces and filter
  // In a production app, you might want a more sophisticated NLP approach
  const combined = `${title} ${description}`.toLowerCase();

  // Remove common words and punctuation
  const words = combined.split(/\W+/).filter(word =>
    word.length > 2 &&
    !['and', 'the', 'for', 'with', 'this', 'that'].includes(word)
  );

  // Return unique words
  return [...new Set(words)];
}

// 6. Function to search jobs from Firebase
async function searchJobsFromFirebase(searchParams) {
  try {
    const jobsCollection = collection(db, "jobs");
    let q = query(jobsCollection, orderBy("posted_date", "desc"), limit(50));

    // Add filters based on search parameters
    if (searchParams.keywords) {
      // Note: This is a simple implementation
      // Firestore doesn't support full-text search natively
      // For production, consider using Algolia or similar
      q = query(q, where("keywords", "array-contains-any", searchParams.keywords.split(" ")));
    }

    if (searchParams.location) {
      q = query(q, where("location", "==", searchParams.location));
    }

    // Add other filters as needed

    const querySnapshot = await getDocs(q);
    const jobs = [];

    querySnapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() });
    });

    return jobs;
  } catch (error) {
    console.error("Error searching jobs from Firebase:", error);
    throw error;
  }
}

// 7. Function to redirect to application page
function applyToJob(applyUrl) {
  // Open in new tab
  window.open(applyUrl, '_blank');
}
export default JobsPage;
