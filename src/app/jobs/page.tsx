"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  File as FileIcon,
  ListChecks,
  MessageSquare,
  MapPin,
  Briefcase,
  Calendar,
  User as UserIcon,
  Link,
  Search as SearchIcon,
  Filter as FilterIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Bookmark as BookmarkIcon,
  DollarSign,
  AlertCircle,
} from "lucide-react";

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  where,
  getDocs,
  orderBy,
  query,
  limit,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from "@/app/config";

import { getJobListings, JobListing } from "@/app/actions/jobActions";
import { filterJobs, mockJobListings } from "@/app/mockdata/jobData";

// Firebase configuration

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


// Helper functions
const formatEmploymentType = (type: string): string => {
  if (!type) return "Not specified";
  const typeMap: Record<string, string> = {
    FULLTIME: "Full Time",
    PARTTIME: "Part Time",
    CONTRACTOR: "Contract",
    INTERN: "Internship",
  };
  return typeMap[type] || type;
};

const formatSalary = (salary: number | string, period?: string): string => {
  if (!salary) return "Not specified";
  const formattedSalary =
    typeof salary === "number"
      ? salary.toLocaleString("en-US", { style: "currency", currency: "USD" })
      : salary;

  const periodMap: Record<string, string> = {
    YEAR: "/year",
    MONTH: "/month",
    WEEK: "/week",
    HOUR: "/hour",
  };

  return `${formattedSalary}${period && periodMap[period] ? periodMap[period] : ""}`;
};

const formatDate = (timestamp: number): string => {
  if (!timestamp) return "Recently posted";
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diffDays = Math.floor((+now - +date) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString();
};

const truncateText = (text: string, maxLength: number): string => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

// Enhanced JobListing type that combines Adzuna API response with our UI needs
interface EnhancedJobListing extends JobListing {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo: string;
  job_city: string;
  job_state: string;
  job_is_remote: boolean;
  job_description: string;
  job_employment_type: string;
  job_salary?: number;
  job_salary_period?: string;
  job_posted_at_timestamp: number;
  job_apply_link: string;
  job_required_skills?: string[];
  job_highlights?: {
    qualifications?: string[];
    responsibilities?: string[];
    benefits?: string[];
  };
}

// Filter types
interface FiltersState {
  experience: string[];
  jobType: string[];
  salaryRange: [number, number];
  datePosted: string | null;
}

interface FilterOption {
  value: string;  
  label: string;
  apiValue: string;
}

const JobsPage = () => {
  const [jobListings, setJobListings] = useState<EnhancedJobListing[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const [searchParams, setSearchParams] = useState({
    query: "",
    location: "",
  });
  const [filters, setFilters] = useState<FiltersState>({
    experience: [],
    jobType: [],
    salaryRange: [0, 200000],
    datePosted: null,
  });
  const [activeFilters, setActiveFilters] = useState<Partial<FiltersState>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobDetails, setJobDetails] = useState<EnhancedJobListing | null>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  
  const experienceLevels: FilterOption[] = [
    { value: "entry", label: "Entry Level", apiValue: "entry level" },
    { value: "mid", label: "Mid Level", apiValue: "mid level" },  
    { value: "senior", label: "Senior Level", apiValue: "senior" },
  ];
  const jobTypes: FilterOption[] = [
    { value: "fulltime", label: "Full Time", apiValue: "full_time" },
    { value: "parttime", label: "Part Time", apiValue: "part_time" },
    { value: "contract", label: "Contract", apiValue: "contract" },
    { value: "remote", label: "Remote", apiValue: "remote" },
  ];
  const datePostedOptions: FilterOption[] = [
    { value: "24h", label: "Last 24 Hours", apiValue: "1" },
    { value: "3d", label: "Last 3 Days", apiValue: "3" },
    { value: "7d", label: "Last Week", apiValue: "7" },
    { value: "30d", label: "Last Month", apiValue: "30" },
  ];

  // Add this function to your component
  const fetchSavedJobs = async (uid: string) => {
    try {
      const savedJobsRef = collection(db, "users", uid, "savedJobs");
      const snapshot = await getDocs(savedJobsRef);
      const savedJobIds = snapshot.docs.map((doc) => doc.id);
      setSavedJobs(savedJobIds);
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
    }
  };

  // Add this function to your component
  const getExperienceLevelParam = useCallback((): string | undefined => {
    if (filters.experience.length === 0) return undefined;
    return filters.experience
      .map((exp) => {
        const found = experienceLevels.find((e) => e.value === exp);
        return found ? found.apiValue : exp;
      })
      .join(" ");
  }, [filters.experience, experienceLevels]);

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUserId(user.uid);
        fetchSavedJobs(user.uid);
      } else {
        setUserId(null);
        setSavedJobs([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch saved jobs from Firestore
  // Replace your fetchJobs function with this one
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
  
    try {
      // Get filter parameters
      const experienceLevel = getExperienceLevelParam();
      const jobTypeParams = filters.jobType.length > 0 
        ? filters.jobType.map(type => {
            const found = jobTypes.find(t => t.value === type);
            return found ? found.apiValue : type;
          })
        : undefined;
      
      const datePostedParam = filters.datePosted 
        ? datePostedOptions.find(d => d.value === filters.datePosted)?.apiValue 
        : undefined;
      
      const minSalaryParam = filters.salaryRange[0] > 0 
        ? filters.salaryRange[0] 
        : undefined;
      
      // Call the server action with all parameters
      const result = await getJobListings({
        query: searchParams.query,
        location: searchParams.location,
        experience: experienceLevel,
        jobType: jobTypeParams,
        datePosted: datePostedParam,
        minSalary: minSalaryParam,
        page: currentPage,
        sortBy: sortOption
      });
        
      if (result.jobs && result.jobs.length > 0) {
        setJobListings(
          result.jobs.map((job) => ({
            ...job,
            employer_logo: job.employer_logo ?? "",
            job_state: job.job_state || "",
            job_is_remote: job.job_city?.toLowerCase() === "remote",
            job_required_skills: extractSkills(job.job_description),
            job_highlights: { 
              qualifications: extractQualifications(job.job_description), 
              responsibilities: extractResponsibilities(job.job_description), 
              benefits: extractBenefits(job.job_description) 
            },
          })) as EnhancedJobListing[]
        );
      
        // Set pagination data from the metadata
        if (result.metadata) {
          setTotalPages(result.metadata.totalPages || 1);
          setTotalJobs(result.metadata.totalJobs || 0);
        } else {
          setTotalPages(Math.max(1, Math.ceil(result.jobs.length / 10)));
          setTotalJobs(result.jobs.length);
        }
      } else {
        setJobListings([]);
        setTotalPages(1);
        setTotalJobs(0);
      }
      
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Failed to fetch jobs.');
      }
  
      setJobListings([]);
      setTotalPages(1);
      setTotalJobs(0);
    } finally {
      setLoading(false);
    }
  }, [searchParams, filters, currentPage, sortOption, getExperienceLevelParam, jobTypes, datePostedOptions]);
  
  // Add this effect to load jobs when the page first renders:
  useEffect(() => {
    fetchJobs();
  }, []);
  
  // Utility functions to extract information from job descriptions
  function extractSkills(description: string): string[] {
    const skillKeywords = ['skill', 'proficient', 'experience with', 'knowledge of'];
    const lines = description.split('\n');
    const skills: string[] = [];
    
    for (const line of lines) {
      if (skillKeywords.some(keyword => line.toLowerCase().includes(keyword))) {
        // Try to extract individual skills
        const words = line.split(/[,.;:]+/);
        for (const word of words) {
          const trimmed = word.trim();
          if (trimmed.length > 3 && !skills.includes(trimmed) && !skillKeywords.some(k => trimmed.toLowerCase().includes(k))) {
            skills.push(trimmed);
          }
        }
      }
    }
    
    return skills.length > 0 ? skills : ['Communication', 'Problem Solving', 'Teamwork'];
  }
  
  function extractResponsibilities(description: string): string[] {
    const responsKeywords = ['responsible for', 'duties', 'responsibilities', 'will be', 'you\'ll'];
    const lines = description.split('\n');
    const responsibilities: string[] = [];
    
    let inResponsSection = false;
    
    for (const line of lines) {
      if (responsKeywords.some(keyword => line.toLowerCase().includes(keyword))) {
        inResponsSection = true;
        responsibilities.push(line.trim());
      } else if (inResponsSection && line.trim().length > 20) {
        responsibilities.push(line.trim());
        if (responsibilities.length >= 3) inResponsSection = false;
      }
    }
    
    return responsibilities.length > 0 ? responsibilities : 
      ['Build and maintain applications', 'Collaborate with cross-functional teams', 'Deliver high-quality solutions'];
  }
  
  function extractQualifications(description: string): string[] {
    const qualKeywords = ['qualification', 'require', 'must have', 'should have', 'ideal candidate'];
    const lines = description.split('\n');
    const qualifications: string[] = [];
    
    let inQualSection = false;
    
    for (const line of lines) {
      if (qualKeywords.some(keyword => line.toLowerCase().includes(keyword))) {
        inQualSection = true;
        qualifications.push(line.trim());
      } else if (inQualSection && line.trim().length > 20) {
        qualifications.push(line.trim());
        if (qualifications.length >= 3) inQualSection = false;
      }
    }
    
    return qualifications.length > 0 ? qualifications : 
      ['Bachelor\'s degree or equivalent experience', 'Strong communication skills', 'Ability to work in a team environment'];
  }
  
  function extractBenefits(description: string): string[] {
    const benefitKeywords = ['benefit', 'offer', 'perks', 'package', 'compensation'];
    const lines = description.split('\n');
    const benefits: string[] = [];
    
    let inBenefitSection = false;
    
    for (const line of lines) {
      if (benefitKeywords.some(keyword => line.toLowerCase().includes(keyword))) {
        inBenefitSection = true;
        benefits.push(line.trim());
      } else if (inBenefitSection && line.trim().length > 10) {
        benefits.push(line.trim());
        if (benefits.length >= 3) inBenefitSection = false;
      }
    }
    
    return benefits.length > 0 ? benefits : 
      ['Competitive salary', 'Health insurance', 'Flexible work hours'];
  }

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page on new search
    fetchJobs();
  };

  const clearSearch = () => {
    setSearchParams({ query: "", location: "" });
    setFilters({
      experience: [],
      jobType: [],
      salaryRange: [0, 200000],
      datePosted: null,
    });
    setActiveFilters({});
    setCurrentPage(1);
    fetchJobs();
  };

  const toggleFilter = (filterType: keyof FiltersState, value: string) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
  
      if (filterType === "experience" || filterType === "jobType") {
        const currentArray = updatedFilters[filterType] as string[];
  
        if (currentArray.includes(value)) {
          updatedFilters[filterType] = currentArray.filter((item) => item !== value) as any;
        } else {
          updatedFilters[filterType] = [...currentArray, value] as any;
        }
      }
  
      return updatedFilters;
    });
  };
  

  const applyFilters = () => {
    setActiveFilters({ ...filters });
    setShowFilters(false);
    setCurrentPage(1);
    fetchJobs();
  };

  const resetFilters = () => {
    setFilters({
      experience: [],
      jobType: [],
      salaryRange: [0, 200000],
      datePosted: null,
    });
  };

  const removeFilter = (filterType: keyof FiltersState) => {
    const newFilters = { ...filters };
    if (filterType === 'experience' || filterType === 'jobType') {
      newFilters[filterType] = [];
    } else if (filterType === 'salaryRange') {
      newFilters[filterType] = [0, 200000];
    } else if (filterType === 'datePosted') {
      newFilters[filterType] = null;
    }
    setFilters(newFilters);

    const newActiveFilters = { ...activeFilters };
    delete newActiveFilters[filterType];
    setActiveFilters(newActiveFilters);

    setCurrentPage(1);
    fetchJobs();
  };

  const clearAllFilters = () => {
    resetFilters();
    setActiveFilters({});
    setCurrentPage(1);
    fetchJobs();
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  const openJobDetails = (job: EnhancedJobListing) => {
    setJobDetails(job);
    setShowJobDetails(true);
  };

  const closeJobDetails = () => {
    setShowJobDetails(false);
    setJobDetails(null);
  };

  const toggleSaveJob = async (jobId: string) => {
    if (!userId) {
      toast({
        title: "Login Required",
        description: "Please log in to save jobs.",
        variant: "destructive",
      });
      return;
    }

    try {
      const savedJobRef = doc(db, "users", userId, "savedJobs", jobId);

      if (savedJobs.includes(jobId)) {
        // Unsave job
        await deleteDoc(savedJobRef);
        setSavedJobs((prev) => prev.filter((id) => id !== jobId));
        toast({
          title: "Job Removed",
          description: "Job removed from saved jobs.",
        });
      } else {
        // Save job
        const jobToSave = jobListings.find((job) => job.job_id === jobId);
        if (jobToSave) {
          await setDoc(savedJobRef, {
            savedAt: new Date(),
            jobData: jobToSave,
          });
          setSavedJobs((prev) => [...prev, jobId]);
          toast({
            title: "Job Saved",
            description: "Job saved to your profile.",
          });
        }
      }
    } catch (error) {
      console.error("Error toggling saved job:", error);
      toast({
        title: "Error",
        description: "Could not save/unsave job. Please try again.",
        variant: "destructive",
      });
    }
  };

  const hasActiveFilters =
    Object.keys(activeFilters).length > 0 &&
    ((activeFilters.experience && activeFilters.experience.length > 0) ||
      (activeFilters.jobType && activeFilters.jobType.length > 0) ||
      activeFilters.datePosted ||
      (activeFilters.salaryRange && activeFilters.salaryRange[0] > 0) ||
      (activeFilters.salaryRange && activeFilters.salaryRange[1] < 200000));

  const getFilterLabel = (key: keyof FiltersState, value: string | number | number[]): string => {
    if (key === "experience") {
      return `Experience: ${experienceLevels.find((e) => e.value === value)?.label || value}`;
    } else if (key === "jobType") {
      return `Job Type: ${jobTypes.find((j) => j.value === value)?.label || value}`;
    } else if (key === "salaryRange" && Array.isArray(value)) {
      return `Salary: $${value[0].toLocaleString()} - $${value[1].toLocaleString()}`;
    } else if (key === "datePosted") {
      return `Date Posted: ${datePostedOptions.find((d) => d.value === value)?.label || value}`;
    }
    return `Unknown Filter: ${value}`;
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/">Home</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/interview">
                <MessageSquare className="w-4 h-4" />
                Interview
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/resume">
                <FileIcon className="w-4 h-4" />
                Resume
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/jobs" className="active">
                <ListChecks className="w-4 h-4" />
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
                  <path d="M3 3v18h18" />
                  <path d="M7 11V5" />
                  <path d="M11 19V8" />
                  <path d="M15 15V3" />
                  <path d="M19 10v5" />
                </svg>
                Progress
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/profile">
                <UserIcon className="w-4 h-4" />

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
                  <path d="M12.22 2.16a8.5 8.5 0 0 1 6.36 6.36 8.5 8.5 0 0 1-1.15 2.48m-2.48 1.15a8.5 8.5 0 0 0 6.36 6.37 8.5 8.5 0 0 0-1.15 2.48m-2.48 1.15a8.5 8.5 0 0 0-6.36-6.36 8.5 8.5 0 0 0 1.15-2.48M12 14.5V17m0-5 0 5M12 6.5V9m0 8V22m6.36-6.36a8.5 8.5 0 0 1-2.48-1.15" />
                </svg>
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      <div className="jobs-page p-4 md:p-6 w-full">
        <header className="jobs-header mb-6 flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Job Listings</CardTitle>
          <Button
            variant="ghost"
            onClick={handleBackToHome}
            className="back-button"
          >
            <ArrowLeft className="mr-2" />
            Back to Home
          </Button>
        </header>

        <Card className="job-search-container mb-6">
          <CardContent className="pt-6">
            {/* Main search bar */}
            <div className="primary-search flex flex-col md:flex-row gap-4 mb-4">
              <div className="search-input-container relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Job title, skills, or keywords"
                  value={searchParams.query}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, query: e.target.value })
                  }
                  className="pl-10"
                />
              </div>

              <div className="location-input-container relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="City, state, or remote"
                  value={searchParams.location}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      location: e.target.value,
                    })
                  }
                  className="pl-10"
                />
              </div>

              <Button
                className="search-button md:w-36"
                onClick={handleSearch}
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Search Jobs"}
              </Button>
            </div>

            {/* Advanced filters */}
            <div
              className="advanced-filters-toggle flex items-center gap-2 text-sm cursor-pointer py-2 mb-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FilterIcon className="w-4 h-4" />
              <span>Advanced Filters</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
              />
            </div>

            {showFilters && (
              <div className="advanced-filters-panel p-4 bg-gray-50 rounded-md mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="filter-group">
                    <Label className="mb-2 block">Date Posted</Label>
                    <div className="space-y-2">                   
                      {datePostedOptions.map((option) => (
                        <label
                          key={option.value} 
                          className="flex items-center gap-2"
                        >
                          <input
                            type="radio"
                            name="datePosted"
                            value={option.value}
                            checked={filters.datePosted === option.value}
                            onChange={() =>
                              setFilters({
                                ...filters,
                                datePosted: option.value,
                              })
                            }
                            className="rounded-full"
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                  <Label className="mb-2 block">Experience Level</Label>
                    {experienceLevels.map((level: FilterOption) => (
                      <label
                        key={level.value}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          value={level.value}
                          checked={filters.experience.includes(level.value)}
                          onChange={() =>
                            toggleFilter("experience", level.value)
                          }
                          className="rounded"
                        />
                        <span>{level.label}</span>
                      </label>
                    ))}
                  </div>

                    <Label className="mb-2 block">Job Type</Label>
                    <div className="space-y-2">
                      {jobTypes.map((type: FilterOption) => (
                         <label
                          key={type.value}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            value={type.value}
                            checked={filters.jobType.includes(type.value)}
                            onChange={() => toggleFilter("jobType", type.value)}
                            className="rounded"
                          />
                          <span>{type.label}</span>
                        </label>
                      ))}
                    </div>
                    <Label className="mb-4 block">Salary Range</Label>
                    <Slider
                      min={0}
                      max={200000}
                      step={10000}
                      value={filters.salaryRange}
                      onValueChange={(values) => setFilters({ ...filters, salaryRange: values as [number, number] })}
                      className="mb-2"
                    />                  
                </div>

                <div className="filter-actions flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                  <Button onClick={applyFilters}>Apply Filters</Button>
                </div>
              </div>
            )}

            {/* Active filters display */}
            {hasActiveFilters && (
              <div className="active-filters flex flex-wrap items-center gap-2 mt-4">
                <span className="text-sm text-gray-500">Active Filters:</span>
                {activeFilters.experience && activeFilters.experience.length > 0 &&
                  activeFilters.experience.map((value) => (
                    <Badge
                      key={`exp-${value}`}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {getFilterLabel("experience", value)}
                      <button
                        onClick={() => removeFilter("experience")}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}

                {activeFilters.jobType && activeFilters.jobType.length > 0 &&
                  activeFilters.jobType.map((value) => (
                    <Badge
                      key={`job-${value}`}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {getFilterLabel("jobType", value)}
                      <button
                        onClick={() => removeFilter("jobType")}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}

                {activeFilters.datePosted && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {getFilterLabel("datePosted", activeFilters.datePosted)}
                    <button
                      onClick={() => removeFilter("datePosted")}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </Badge>
                )}

                {activeFilters.salaryRange && (
                  (activeFilters.salaryRange[0] > 0 ||
                  activeFilters.salaryRange[1] < 200000) && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {getFilterLabel("salaryRange", activeFilters.salaryRange)}
                    <button
                      onClick={() => removeFilter("salaryRange")}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </Badge>
                ))}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="ml-auto"
                >
                  Clear All
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="job-results-container">
          <CardContent className="pt-6">
            <div className="results-header flex justify-between items-center mb-6">
              <h3 className="results-count text-lg font-medium">
                {totalJobs} jobs found
              </h3>
              <div className="sort-options flex items-center gap-2">
                <label className="text-sm text-gray-600">Sort by:</label>
                <Select onValueChange={setSortOption} defaultValue={sortOption}>
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="date">Most Recent</SelectItem>
                    <SelectItem value="salary">Salary (high to low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoading ? (
              <div className="loading-jobs space-y-6">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <JobCardSkeleton key={index} />
                  ))}
              </div>
            ) : jobListings.length > 0 ? (
              <div className="job-cards space-y-6">
                {jobListings.map((job) => (
                  <JobCard 
                    key={`${job.job_id}`}
                    job={job}
                    openJobDetails={openJobDetails}
                    toggleSaveJob={toggleSaveJob}
                    savedJobs={savedJobs}
                  />
                ))}
              </div>
            ) : (
              <div className="no-results text-center py-16">
                <SearchIcon className="mx-auto w-12 h-12 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">No jobs found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search criteria or explore recommended jobs
                  below.
                </p>
                <Button onClick={clearSearch} variant="outline">
                  Clear Search
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Button>

                <div className="page-numbers flex items-center gap-1">
                  {generatePageNumbers().map((page, index) => (
                    <Button
                      key={
                        page === "..." ? `ellipsis-${index}` : `page-${page}`
                      }
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      className="w-9 h-9"
                      onClick={() =>
                        typeof page === "number" && setCurrentPage(page)
                      }
                      disabled={page === "..."}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Job Details Modal */}
        {showJobDetails && jobDetails && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-auto">
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">{jobDetails.job_title}</h2>
                <Button variant="ghost" size="sm" onClick={closeJobDetails}>
                  ×
                </Button>
              </div>

              <div className="p-6">
                <div className="job-header flex items-start gap-4 mb-6">
                  <div className="company-logo-container w-16 h-16 flex-shrink-0">
                    {jobDetails.employer_logo ? (
                      <img
                        src={jobDetails.employer_logo}
                        alt={`${jobDetails.employer_name} logo`}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <CompanyPlaceholder name={jobDetails.employer_name} />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-medium">
                      {jobDetails.employer_name}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-600 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {jobDetails.job_city}, {jobDetails.job_state}
                      </span>
                      {jobDetails.job_is_remote && (
                        <Badge variant="outline">Remote</Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 mt-3">
                      {jobDetails.job_employment_type && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <Briefcase className="w-4 h-4" />
                          <span>
                            {formatEmploymentType(
                              jobDetails.job_employment_type
                            )}
                          </span>
                        </div>
                      )}

                      {jobDetails.job_salary_period &&
                        jobDetails.job_salary && (
                          <div className="flex items-center gap-1 text-gray-600">
                            <DollarSign className="w-4 h-4" />
                            <span>
                              {formatSalary(
                                jobDetails.job_salary,
                                jobDetails.job_salary_period
                              )}
                            </span>
                          </div>
                        )}

                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {formatDate(jobDetails.job_posted_at_timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className={`w-10 h-10 p-0 ${savedJobs.includes(jobDetails.job_id) ? "text-primary" : ""}`}
                    onClick={() => toggleSaveJob(jobDetails.job_id)}
                  >
                    <BookmarkIcon className="w-5 h-5" />
                  </Button>
                </div>

                <div className="job-description mb-6">
                  <h4 className="text-lg font-medium mb-3">Job Description</h4>
                  <div className="prose max-w-none">
                    {jobDetails.job_description
                      .split("\n")
                      .map((paragraph, index) =>
                        paragraph.trim() ? (
                          <p key={index}>{paragraph}</p>
                        ) : (
                          <br key={index} />
                        )
                      )}
                  </div>
                </div>

                {jobDetails.job_highlights?.qualifications && 
                  jobDetails.job_highlights.qualifications.length > 0 && (
                  <div className="job-qualifications mb-6">
                    <h4 className="text-lg font-medium mb-3">Qualifications</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {jobDetails.job_highlights.qualifications.map(
                        (item, index) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {jobDetails.job_highlights?.responsibilities && 
                  jobDetails.job_highlights.responsibilities.length > 0 && (
                  <div className="job-responsibilities mb-6">
                    <h4 className="text-lg font-medium mb-3">
                      Responsibilities
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {jobDetails.job_highlights.responsibilities.map(
                        (item, index) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {jobDetails.job_highlights?.benefits && 
                  jobDetails.job_highlights.benefits.length > 0 && (
                  <div className="job-benefits mb-6">
                    <h4 className="text-lg font-medium mb-3">Benefits</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {jobDetails.job_highlights.benefits.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {jobDetails.job_required_skills &&
                  jobDetails.job_required_skills.length > 0 && (
                    <div className="job-skills mb-6">
                      <h4 className="text-lg font-medium mb-3">
                        Required Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {jobDetails.job_required_skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                {jobDetails.job_apply_link && (
                  <div className="job-apply mt-8 text-center">
                    <a
                      href={jobDetails.job_apply_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                      Apply Now
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </SidebarProvider>
  );

  function generatePageNumbers() {
    const pageNumbers: (number | string)[] = [];
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      pageNumbers.push(i);
    }
  
    const firstPage = pageNumbers[0];
    if (typeof firstPage === "number" && firstPage > 1) {
      pageNumbers.unshift("...");
      if (firstPage !== 2) {
        pageNumbers.unshift(1);
      }
    }
  
    const lastPage = pageNumbers[pageNumbers.length - 1];
    if (typeof lastPage === "number" && lastPage < totalPages) {
      pageNumbers.push("...");
      const secondLastPage = pageNumbers[pageNumbers.length - 2];
      if (typeof secondLastPage === "number" && secondLastPage !== totalPages - 1) {
        pageNumbers.push(totalPages);
      }
    }
  
    return pageNumbers;
  }
  
  
};

/* Placeholder Styling for Company Logo */
const CompanyPlaceholder = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-500 font-bold rounded-md text-xl">
    {name ? name.charAt(0).toUpperCase() : "?"}
  </div>
);

/* Job Card component */
const JobCard = ({ 
  job, 
  openJobDetails, 
    toggleSaveJob, 
  savedJobs 
}: { 
  job: EnhancedJobListing; 
  openJobDetails: (job: EnhancedJobListing) => void; 
  toggleSaveJob: (jobId: string) => void; 
  savedJobs: string[];
}) => {
  return (
    <div className="job-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="job-card-header p-4 flex items-start border-b">
        <div className="company-logo-container w-12 h-12 mr-3 flex-shrink-0">
          {job.employer_logo ? (
            <img
              src={job.employer_logo}
              alt={`${job.employer_name} logo`}
              className="w-full h-full object-contain"
            />
          ) : (
            <CompanyPlaceholder name={job.employer_name} />
          )}
        </div>

        <div className="job-header-details flex-1">
          <h3 className="job-title text-lg font-medium">{job.job_title}</h3>
          <div className="company-name text-gray-600">{job.employer_name}</div>
          <div className="job-location flex items-center gap-1 text-sm text-gray-500 mt-1">
            <MapPin className="w-3 h-3" />
            <span>
              {job.job_city}, {job.job_state}
            </span>
            {job.job_is_remote && (
              <Badge variant="outline" className="text-xs ml-1 px-1 py-0">
                Remote
              </Badge>
            )}
          </div>
        </div>

        <button
          className={`save-job-button w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 ${savedJobs.includes(job.job_id) ? "text-primary" : "text-gray-400"}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleSaveJob(job.job_id);
          }}
        >
          <BookmarkIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="job-card-body p-4">
        <div className="job-highlights flex flex-wrap gap-x-4 gap-y-2 mb-3">
          {job.job_employment_type && (
            <div className="highlight-item flex items-center gap-1 text-sm text-gray-600">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{formatEmploymentType(job.job_employment_type)}</span>
            </div>
          )}

          {job.job_salary_period && job.job_salary && (
            <div className="highlight-item flex items-center gap-1 text-sm text-gray-600">
              <DollarSign className="w-3.5 h-3.5" />
              <span>{formatSalary(job.job_salary, job.job_salary_period)}</span>
            </div>
          )}

          <div className="highlight-item flex items-center gap-1 text-sm text-gray-600">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(job.job_posted_at_timestamp)}</span>
          </div>
        </div>

        <div className="job-description mb-3">
          <p className="text-sm text-gray-700">
            {truncateText(job.job_description, 200)}
          </p>
        </div>

        <div className="job-skills flex flex-wrap gap-1.5 mb-4">
          {job.job_required_skills &&
            job.job_required_skills.slice(0, 5).map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="text-xs px-2 py-0.5"
              >
                {skill}
              </Badge>
            ))}
          {job.job_required_skills && job.job_required_skills.length > 5 && (
            <span className="text-xs text-gray-500">
              +{job.job_required_skills.length - 5} more
            </span>
          )}
        </div>
      </div>

      <div className="job-card-footer p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" onClick={() => openJobDetails(job)}>
          View Details
        </Button>

        <a
          href={job.job_apply_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
          onClick={(e) => e.stopPropagation()}
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

/* Skeleton loading component */
const JobCardSkeleton = () => (
  <div className="job-card border rounded-lg overflow-hidden">
    <div className="job-card-header p-4 flex items-start border-b">
      <div className="company-logo-container w-12 h-12 mr-3">
        <Skeleton className="w-full h-full rounded-md" />
      </div>
      <div className="job-header-details flex-1">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <Skeleton className="w-8 h-8 rounded-full" />
    </div>
    <div className="job-card-body p-4">
      <div className="job-highlights flex gap-4 mb-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-3/4 mb-3" />
      <div className="job-skills flex gap-1.5 mb-4">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
    <div className="job-card-footer p-4 pt-0 flex justify-between">
      <Skeleton className="h-9 w-28" />
      <Skeleton className="h-9 w-28" />
    </div>
  </div>
);

export default JobsPage;