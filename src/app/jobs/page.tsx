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

import {initializeApp} from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import axios from "axios";
import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from "@/app/config";

import './jobs.css';

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

const JobsPage = () => {
  const [jobListings, setJobListings] = useState<any[]>([]);
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
    
      
        
          
            
              Home
            
          
          
            
              <MessageSquare className="w-4 h-4"/>
              Interview
            
          
          
            
              <FileIcon className="w-4 h-4"/>
              Resume
            
          
          
            
              <ListChecks className="w-4 h-4"/>
              Jobs
            
          
          
            
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
            
          
          
            
              <User className="w-4 h-4"/>
              Profile
            
          
          
            
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
            
          
        
      

      
        <header className="jobs-header">
          <h1 className="text-2xl font-bold">Job Listings</h1>
          <Button variant="ghost" onClick={handleBackToHome} className="back-button">
            <ArrowLeft className="mr-2"/>
            Back to Home
          </Button>
        </header>

        <Card className="job-search-container">
          <CardContent>
            {/* Main search bar */}
            <div className="primary-search">
              <div className="search-input-container">
                <SearchIcon className="search-icon"/>
                <Input
                  type="text"
                  placeholder="Job title, skills, or keywords"
                  value={searchParams.query}
                  onChange={(e) => setSearchParams({...searchParams, query: e.target.value})}
                  className="search-input"
                />
              </div>

              <div className="location-input-container">
                <LocationPinIcon className="location-icon"/>
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
              <FilterIcon/>
              <span>Advanced Filters</span>
              <ChevronDown className={showFilters ? 'rotated' : ''}/>
            </div>

            {showFilters && (
              <div className="advanced-filters-panel">
                <div className="filter-group">
                  <label>Experience Level</label>
                  <div className="checkbox-group">
                    {experienceLevels.map(level => (
                      
                        
                          type="checkbox"
                          value={level.value}
                          checked={filters.experience.includes(level.value)}
                          onChange={() => toggleFilter('experience', level.value)}
                        />
                        {level.label}
                      
                    ))}
                  </div>
                </div>

                <div className="filter-group">
                  <label>Job Type</label>
                  <div className="checkbox-group">
                    {jobTypes.map(type => (
                      
                        
                          type="checkbox"
                          value={type.value}
                          checked={filters.jobType.includes(type.value)}
                          onChange={() => toggleFilter('jobType', type.value)}
                        />
                        {type.label}
                      
                    ))}
                  </div>
                </div>

                <div className="filter-group">
                  <Label>Salary Range</Label>
                  <Slider
                    min={0}
                    max={200000}
                    step={10000}
                    defaultValue={filters.salaryRange}
                    onValueChange={(values) => setFilters({...filters, salaryRange: values})}
                  />
                  <div className="salary-range-label">
                    ${filters.salaryRange[0].toLocaleString()} - ${filters.salaryRange[1].toLocaleString()}
                  </div>
                </div>

                <div className="filter-group">
                  <label>Date Posted</label>
                  <div className="radio-group">
                    {datePostedOptions.map(option => (
                      
                        
                          type="radio"
                          value={option.value}
                          checked={filters.datePosted === option.value}
                          onChange={() => setFilters({...filters, datePosted: option.value})}
                        />
                        {option.label}
                      
                    ))}
                  </div>
                </div>

                <div className="filter-actions">
                  <Button variant="secondary" onClick={resetFilters}>Reset Filters</Button>
                  <Button onClick={applyFilters}>Apply Filters</Button>
                </div>
              </div>
            )}

            {/* Active filters display */}
            {hasActiveFilters && (
              <div className="active-filters">
                <span className="active-filters-label">Active Filters:</span>
                {Object.entries(activeFilters).map(([key, value]) => (
                  
                    <span>{getFilterLabel(key, value)}</span>
                    <button onClick={() => removeFilter(key)} className="remove-filter">
                      ×
                    </button>
                  
                ))}
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear All
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="job-results-container">
          <CardContent>
            <div className="results-header">
              <h3 className="results-count">{totalJobs} jobs found</h3>
              <div className="sort-options">
                <label>Sort by:</label>
                <Select onValueChange={setSortOption} defaultValue={sortOption}>
                  <SelectTrigger className="sort-select">
                    
                  </SelectTrigger>
                  <SelectContent>
                    
                      Relevance
                    
                    
                      Most Recent
                    
                    
                      Salary (high to low)
                    
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoading ? (
              <div className="loading-jobs">
                {Array(5).fill(0).map((_, index) => (
                  <JobCardSkeleton key={index}/>
                ))}
              </div>
            ) : jobListings.length > 0 ? (
              <div className="job-cards">
                {jobListings.map(job => (
                  <JobCard key={job.job_id} job={job} openJobDetails={openJobDetails}
                           toggleSaveJob={toggleSaveJob} savedJobs={savedJobs}/>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <SearchIcon className="no-results-icon"/>
                <h3>No jobs found</h3>
                <p>Try adjusting your search criteria or explore our recommended jobs below.</p>
                <Button onClick={clearSearch} variant="outline">
                  Clear Search
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                
                  <ChevronLeft/>
                  Previous
                

                
                  {generatePageNumbers().map(page => (
                    
                      
                        {page}
                      
                    
                  ))}
                

                
                  Next
                  <ChevronRight/>
                
              </div>
            )}
          </CardContent>
        </Card>
      
    
  );
};

/* Placeholder Styling for Company Logo */
const CompanyPlaceholder = ({name}) => (
  
    {name ? name.charAt(0).toUpperCase() : '?'}
  
);

/* Circular Progress Indicator */
const CircularProgress = ({value}) => {
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
          
          
            <LocationPinIcon/>
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
    
    if (response.status !== 200) {
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

