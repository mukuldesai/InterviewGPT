'use server';

// Import the type definition from the API route
import { JobListing } from '../api/route';

interface JobsResponse {
  jobs: JobListing[];
  metadata: {
    totalJobs: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

// Server action to fetch job listings
export async function getJobListings(params: {
  query: string;
  location: string;
  experience?: string;
  jobType?: string[];
  datePosted?: string;
  minSalary?: number;
  page?: number;
  sortBy?: string;
}): Promise<{ jobs: JobListing[], metadata: any }> {
  try {
    console.log('Server action called with params:', params);
    
    // Build the URL search parameters
    const searchParams = new URLSearchParams();
    
    if (params.query) searchParams.append('query', params.query);
    if (params.location) searchParams.append('location', params.location);
    if (params.experience) searchParams.append('experience', params.experience);
    if (params.jobType && params.jobType.length > 0) {
      params.jobType.forEach(type => searchParams.append('jobType', type));
    }
    if (params.datePosted) searchParams.append('datePosted', params.datePosted);
    if (params.minSalary) searchParams.append('minSalary', params.minSalary.toString());
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.sortBy) searchParams.append('sortBy', params.sortBy);

    // Use a relative URL for better compatibility
    const apiUrl = `/api?${searchParams.toString()}`;
    
    console.log('Fetching jobs from API route:', apiUrl);

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        
        // Throw error to trigger fallback
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json() as JobsResponse;
      return data;
    } catch (error) {
      console.error('API request failed, falling back to direct mock data:', error);
      // Fall back to importing and using mock data directly
      const { filterJobs, mockJobListings } = await import('../mockdata/jobData');
      
      // Filter the mock data based on the search parameters
      const filteredJobs = filterJobs({
        query: params.query,
        location: params.location,
        experience: params.experience,
        jobType: params.jobType,
        datePosted: params.datePosted,
        minSalary: params.minSalary,
        page: params.page
      });
      
      // Apply sorting if specified
      let sortedJobs = [...filteredJobs];
      if (params.sortBy === 'date') {
        sortedJobs.sort((a, b) => b.job_posted_at_timestamp - a.job_posted_at_timestamp);
      } else if (params.sortBy === 'salary') {
        sortedJobs.sort((a, b) => {
          const aMaxSalary = a.job_max_salary || a.job_min_salary || 0;
          const bMaxSalary = b.job_max_salary || b.job_min_salary || 0;
          return bMaxSalary - aMaxSalary;
        });
      }
      
      // Simulate pagination
      const page = params.page || 1;
      const pageSize = 10;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedJobs = sortedJobs.slice(start, end);
      
      // Calculate total pages for the metadata
      const totalJobs = filteredJobs.length;
      const totalPages = Math.ceil(totalJobs / pageSize);
      
      console.log(`Direct mock data: returning ${paginatedJobs.length} mock jobs (filtered from ${totalJobs} total)`);
      
      // Return the mock data in the same format as the API
      return {
        jobs: paginatedJobs,
        metadata: {
          totalJobs,
          totalPages,
          currentPage: page,
          pageSize
        }
      };
    }
  } catch (error) {
    console.error('Error in getJobListings:', error);
    // Return empty data structure in case of any error
    return { 
      jobs: [], 
      metadata: {
        totalJobs: 0,
        totalPages: 1,
        currentPage: 1,
        pageSize: 10
      }
    };
  }
}

// Export the JobListing type for use in other files
export type { JobListing };