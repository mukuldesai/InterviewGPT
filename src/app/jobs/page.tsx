'use client';

import React, {useState, useEffect, useCallback} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {useToast} from '@/hooks/use-toast';
import {useRouter} from 'next/navigation';
import {
  ArrowLeft,
  File as FileIcon,
  ListChecks,
  MessageSquare,
  User,
  MapPin as LocationPinIcon,
  Briefcase as BriefcaseIcon,
  Calendar as CalendarIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Bookmark as BookmarkIcon,
  Money as MoneyIcon
} from "lucide-react";
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

import axios from "axios";

import './jobs.css';

interface Job {
  job_id: string;
  employer_name: string;
  job_title: string;
  job_city: string;
  job_state: string;
  job_is_remote: boolean;
  job_employment_type: string;
  job_salary_period: string;
  job_salary: number;
  job_posted_at_timestamp: string;
  job_description: string;
  job_apply_link: string;
  job_required_skills: string[];
  employer_logo: string;
}

const JobsPage = () => {
  const [jobListings, setJobListings] = useState<Job[]>([]);
  const {toast} = useToast();
  const router = useRouter();

  const [searchParams, setSearchParams] = useState({
    query: '',
    location: '',
  });
  const [filters, setFilters] = useState({
    experience: [],
    jobType: [],
    salaryRange: [0, 200000],
    datePosted: null,
  });
  const [activeFilters, setActiveFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [savedJobs, setSavedJobs] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const experienceLevels = [
    {value: 'entry', label: 'Entry Level'},
    {value: 'mid', label: 'Mid Level'},
    {value: 'senior', label: 'Senior Level'},
  ];
  const jobTypes = [
    {value: 'fulltime', label: 'Full Time'},
    {value: 'parttime', label: 'Part Time'},
    {value: 'contract', label: 'Contract'},
    {value: 'remote', label: 'Remote'},
  ];
  const datePostedOptions = [
    {value: '24h', label: 'Last 24 Hours'},
    {value: '3d', label: 'Last 3 Days'},
    {value: '7d', label: 'Last Week'},
    {value: '30d', label: 'Last Month'},
  ];

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedJobs = await getJobListings(searchParams, filters, currentPage, sortOption);
      setJobListings(fetchedJobs.results);
      setTotalPages(fetchedJobs.num_pages);
      setTotalJobs(fetchedJobs.count);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch jobs.');
      setJobListings([]);
    } finally {
      setLoading(false);
    }
  }, [searchParams, filters, currentPage, sortOption]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page on new search
    fetchJobs();
  };

  const clearSearch = () => {
    setSearchParams({query: '', location: ''});
    setFilters({
      experience: [],
      jobType: [],
      salaryRange: [0, 200000],
      datePosted: null,
    });
    setActiveFilters({});
    fetchJobs();
  };

  const toggleFilter = (filterType, value) => {
    const newFilters = {...filters};
    if (newFilters[filterType].includes(value)) {
      newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
    } else {
      newFilters[filterType] = [...newFilters[filterType], value];
    }
    setFilters(newFilters);
  };

  const applyFilters = () => {
    setActiveFilters(filters);
    setShowFilters(false);
    fetchJobs();
  };

  const resetFilters = () => {
    setFilters({
      experience: [],
      jobType: [],
      salaryRange: [0, 200000],
      datePosted: null,
    });
    setActiveFilters({});
  };

  const removeFilter = (filterType) => {
    setFilters({...filters, [filterType]: []});
    const newActiveFilters = {...activeFilters};
    delete newActiveFilters[filterType];
    setActiveFilters(newActiveFilters);
    fetchJobs();
  };

  const clearAllFilters = () => {
    resetFilters();
    setActiveFilters({});
    fetchJobs();
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  const getFilterLabel = (key, value) => {
    if (key === 'experience') {
      return `Experience: ${experienceLevels.find(e => e.value === value)?.label || value}`;
    } else if (key === 'jobType') {
      return `Job Type: ${jobTypes.find(j => j.value === value)?.label || value}`;
    } else if (key === 'salaryRange') {
      return `Salary: $${value[0]} - $${value[1]}`;
    } else if (key === 'datePosted') {
      return `Date Posted: ${datePostedOptions.find(d => d.value === value)?.label || value}`;
    }
    return `Unknown Filter: ${value}`;
  }

  const generatePageNumbers = useCallback(() => {
    const pageNumbers = [];
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pageNumbers.push(i);
    }

    if (pageNumbers[0] > 1) {
      pageNumbers.unshift('...');
      if (pageNumbers[0] !== 2) {
        pageNumbers.unshift(1);
      }
    }

    if (pageNumbers[pageNumbers.length - 1] < totalPages) {
      pageNumbers.push('...');
      if (pageNumbers[pageNumbers.length - 2] !== totalPages - 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  }, [currentPage, totalPages]);


  return (
    
      
        
          
            <SidebarMenuButton href="/" >
              Home
            </SidebarMenuButton>
          
          
            
              <MessageSquare className="w-4 h-4"/>
              Interview
            </SidebarMenuButton>
          
          
            
              <FileIcon className="w-4 h-4"/>
              Resume
            </SidebarMenuButton>
          
          
            
              <ListChecks className="w-4 h-4"/>
              Jobs
            </SidebarMenuButton>
          
          
            
              
                <path d="M3 3v18h18"/>
                <path d="M7 11V5"/>
                <path d="M11 19V8"/>
                <path d="M15 15V3"/>
                <path d="M19 10v5"/>
              
              Progress
            </SidebarMenuButton>
          
          
            
              <User className="w-4 h-4"/>
              Profile
            </SidebarMenuButton>
          
          
            
              
                <path
                  d="M12.22 2.16a8.5 8.5 0 0 1 6.36 6.36 8.5 8.5 0 0 1-1.15 2.48m-2.48 1.15a8.5 8.5 0 0 1-6.36-6.37 8.5 8.5 0 0 1 1.15-2.48m2.48-1.14a8.5 8.5 0 0 0 6.36 6.37 8.5 8.5 0 0 0-1.15 2.48m-2.48 1.15a8.5 8.5 0 0 0-6.36-6.36 8.5 8.5 0 0 0 1.15-2.48M12 14.5V17m0-5 0 5M12 6.5V9m0 8V22m6.36-6.36a8.5 8.5 0 0 1-2.48-1.15"/>
                Settings
              
            </SidebarMenuButton>
          
        
      

      
        <header className="jobs-header">
          <h1 className="text-2xl font-bold">Job Listings</h1>
          <Button variant="ghost" onClick={handleBackToHome} className="back-button">
            
            Back to Home
          </Button>
        </header>

        <Card className="job-search-container">
          <CardContent>
            {/* Main search bar */}
            <div className="primary-search">
              <div className="search-input-container">
                
                <Input
                  type="text"
                  placeholder="Job title, skills, or keywords"
                  value={searchParams.query}
                  onChange={(e) => setSearchParams({...searchParams, query: e.target.value})}
                  className="search-input"
                />
              </div>

              <div className="location-input-container">
                
                <Input
                  type="text"
                  placeholder="City, state, or remote"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                  className="location-input"
                />
              </div>

              <Button className="search-button" onClick={handleSearch} disabled={isLoading}>
                
                {isLoading ? 'Searching...' : 'Search Jobs'}
              </Button>
            </div>

            {/* Advanced filters */}
            <div className="advanced-filters-toggle" onClick={() => setShowFilters(!showFilters)}>
              
              <span>Advanced Filters</span>
              
            </div>

            {showFilters && (
              
                
                  
                    
                      
                        
                          
                          type="checkbox"
                          value={level.value}
                          checked={filters.experience.includes(level.value)}
                          onChange={() => toggleFilter('experience', level.value)}
                        />
                        {level.label}
                      
                    
                  
                

                
                  
                    
                      
                        
                          type="checkbox"
                          value={type.value}
                          checked={filters.jobType.includes(type.value)}
                          onChange={() => toggleFilter('jobType', type.value)}
                        />
                        {type.label}
                      
                    
                  
                

                
                  
                  
                    min={0}
                    max={200000}
                    step={10000}
                    defaultValue={filters.salaryRange}
                    onValueChange={(values) => setFilters({...filters, salaryRange: values})}
                  />
                  
                    ${filters.salaryRange[0].toLocaleString()} - ${filters.salaryRange[1].toLocaleString()}
                  
                

                
                  
                    
                      
                        
                          type="radio"
                          value={option.value}
                          checked={filters.datePosted === option.value}
                          onChange={() => setFilters({...filters, datePosted: option.value})}
                        />
                        {option.label}
                      
                    
                  
                

                
                  
                    Reset Filters
                  
                  
                    Apply Filters
                  
                
              
            )}

            {/* Active filters display */}
            {hasActiveFilters && (
              
                
                  Active Filters:
                
                {Object.entries(activeFilters).map(([key, value]) => (
                  
                    
                      {getFilterLabel(key, value)}
                    
                    
                      ×
                    
                  
                ))}
                
                  Clear All
                
              
            )}
          </CardContent>
        </Card>

        
          
            
              
                {totalJobs} jobs found
              
              
                
                  Sort by:
                
                
                  
                    
                  
                  
                    
                      Relevance
                    
                    
                      Most Recent
                    
                    
                      Salary (high to low)
                    
                  
                
              
            

            {isLoading ? (
              
                {Array(5).fill(0).map((_, index) => (
                  
                ))}
              
            ) : jobListings.length > 0 ? (
              
                {jobListings.map(job => (
                  
                    
                      
                        {job.employer_logo ? (
                          
                            
                              src={job.employer_logo}
                              alt={`${job.employer_name} logo`}
                              className="company-logo"
                            />
                          
                        ) : (
                          
                            
                              {name={job.employer_name}}/>
                            
                          
                        )}
                      
                      
                        
                          
                            {job.job_title}
                          
                          
                            {job.employer_name}
                          
                          
                            
                            <span>{job.job_city}, {job.job_state}</span>
                            {job.job_is_remote && <span>Remote</span>}
                          
                        
                        
                          
                        
                      
                    

                    
                      
                        {job.job_employment_type && (
                          
                            
                            {formatEmploymentType(job.job_employment_type)}
                            
                          
                        )}

                        {job.job_salary_period && job.job_salary && (
                          
                            
                            {formatSalary(job.job_salary, job.job_salary_period)}
                            
                          
                        )}

                        
                          
                          {formatDate(job.job_posted_at_timestamp)}
                          
                        
                      

                      
                        {job.job_required_skills && job.job_required_skills.slice(0, 5).map(skill => (
                          
                            {skill}
                          
                        ))}
                        {job.job_required_skills && job.job_required_skills.length > 5 && (
                          
                            +{job.job_required_skills.length - 5} more
                          
                        )}
                      
                    

                    
                      
                        View Details
                      

                      
                        Apply Now
                      
                    
                  
                ))}
              
            ) : (
              
                
                  
                
                
                  No jobs found
                
                
                  Try adjusting your search criteria or explore our recommended jobs below.
                
                
                  Clear Search
                
              
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              
                
                  
                    Previous
                    
                  

                  
                    {generatePageNumbers().map(page => (
                      
                        
                          {page}
                        
                      
                    
                  ))}
                

                
                  Next
                  
                
              
            )}
          
        
      
    
  );
};

/* Placeholder Styling for Company Logo */
const CompanyPlaceholder = ({name}) => (
  
    {name ? name.charAt(0).toUpperCase() : '?'}
  
);

/* Job Card Styling */

/* Style Adjustments to fit the code better */
const JobCard = ({job, openJobDetails, toggleSaveJob, savedJobs}) => {
  return (
    
      
        
          {job.employer_logo ? (
            
              src={job.employer_logo}
              alt={`${job.employer_name} logo`}
              className="company-logo"
            />
          ) : (
            
              {name={job.employer_name}}/>
            
          )}
        
        

          
          
            {job.job_title}
          
          
            {job.employer_name}
          
          
            
            <span>{job.job_city}, {job.job_state}</span>
            {job.job_is_remote && <span>Remote</span>}
          
        

        
          
        
      

      
        
          {job.job_employment_type && (
            
              
              {formatEmploymentType(job.job_employment_type)}
              
            
          )}

          {job.job_salary_period && job.job_salary && (
            
              
              {formatSalary(job.job_salary, job.job_salary_period)}
              
            
          )}

          
            
            {formatDate(job.job_posted_at_timestamp)}
            
          
        

        
          {job.job_required_skills && job.job_required_skills.slice(0, 5).map(skill => (
            
              {skill}
            
          ))}
          {job.job_required_skills && job.job_required_skills.length > 5 && (
            
              +{job.job_required_skills.length - 5} more
            
          )}
        
      

      
        
          View Details
        

        
          Apply Now
        
      
    
  );
};

const JobCardSkeleton = () => (
  
    
      
      
      
      
      
    
    
      
      
      
      
      
    
    
      
      
      
    
  
);

// Implement the JSearch API function to fetch and cache jobs daily
async function getJobListings(searchParams, filters, page = 1, sort = 'relevance') {
  const API_KEY = 'a1669c566bmshb8c4ee08d9ea3dfp1c36a3jsn0e4929007baa'; // Replace with your actual API key
  const BASE_URL = 'https://jsearch.p.rapidapi.com';

  try {
    const options = {
      method: 'GET',
      url: `${BASE_URL}/search`,
      params: {
        query: `${searchParams.query} in ${searchParams.location}`,
        page: page.toString(),
        num_pages: '1',
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    
    if (response.status !== 200 && response.status !== 201 ) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    const data = response.data;
    return data;

  } catch (error) {
    console.error('Error fetching job listings:', error);
    throw new Error('Failed to fetch job listings.');
  }
}

function truncateText(text, maxLength) {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

function formatEmploymentType(type) {
  return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function formatSalary(salary, period) {
  return `$${salary}/${period}`;
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
}
const openJobDetails = (job) => {
  // Implement logic to display full job details (modal, separate page, etc.)
  console.log('Opening job details for:', job);
  // For now, just logging to console
};

const toggleSaveJob = (jobId) => {
  // Implement logic to save jobs for logged-in users
  console.log('Toggling saved job for:', jobId);
  // For now, just logging to console
};

export default JobsPage;


function CircularProgress({value}) {
  const color =
    value <= 50 ? '#FF4D4F' :
      value <= 70 ? '#FA8C16' :
        value <= 85 ? '#FAAD14' :
          '#52C41A';

  return (
    
      
        
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="#f0f2f5"
          strokeWidth="12"
        />
        
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray="339.292" // Circumference = 2 * pi * radius
          strokeDashoffset={`${339.292 * (1 - (value / 100))}`}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
        
          x="60"
          y="68"
          textAnchor="middle"
          fontSize="24"
          fontWeight="bold"
          fill={color}
        >{value}%</text>
      
    
  );
};
