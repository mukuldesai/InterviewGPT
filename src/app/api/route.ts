import { NextResponse } from 'next/server';
import { filterJobs, mockJobListings } from '../mockdata/jobData';

export interface JobListing {
  job_id: string;
  employer_name: string;
  employer_logo?: string | null;
  job_employment_type: string;
  job_title: string;
  job_description: string;
  job_apply_link: string;
  job_city: string;
  job_country: string;
  job_state?: string;
  job_posted_at_timestamp: number;
  job_min_salary?: number;
  job_max_salary?: number;
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    console.log('API Route received request with params:', Object.fromEntries(searchParams.entries()));

    // Flag to control which data source to use
    const useRealApi = false; // Set to true when RapidAPI is working

    if (useRealApi) {
      const rapidApiKey = process.env.RAPID_API_KEY;
      const rapidApiHost = process.env.RAPID_API_HOST || 'active-jobs-db.p.rapidapi.com';

      if (!rapidApiKey) {
        console.error('RapidAPI key is missing');
        return NextResponse.json({ message: 'API configuration error' }, { status: 500 });
      }

      // Build the query parameters for the RapidAPI endpoint
      const query = searchParams.get('query') || '';
      const location = searchParams.get('location') || '';
      const page = Number(searchParams.get('page')) || 1;
      const limit = 10;
      const offset = (page - 1) * limit;

      // Format query parameters according to the API's expected format
      let queryFilter = query ? `&title_filter="${encodeURIComponent(query)}"` : '';
      let locationFilter = location ? `&location_filter="${encodeURIComponent(location)}"` : '';

      // Construct the API URL
      const apiUrl = `https://${rapidApiHost}/active-ats-24h?limit=${limit}&offset=${offset}&description_type=text${queryFilter}${locationFilter}`;
      
      console.log('Fetching from API URL:', apiUrl);

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': rapidApiHost,
          },
          next: { revalidate: 300 }, // Cache for 5 minutes
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error:', response.status, errorText);
          throw new Error(`API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        
        // Map the API response to our JobListing interface
        const jobListings: JobListing[] = (Array.isArray(data) ? data : []).map((job: any) => ({
          job_id: job.id || `job-${Math.random().toString(36).substring(2, 10)}`,
          employer_name: job.organization || job.employer_name || 'Unknown Company',
          employer_logo: job.organization_logo || job.employer_logo || null,
          job_employment_type: job.employment_type?.[0] || 'Full-Time',
          job_title: job.title || job.job_title || 'Job Position',
          job_description: job.description_text || job.job_description || 'No description provided.',
          job_apply_link: job.url || job.job_apply_link || '#',
          job_city: job.locations_derived?.[0]?.split(',')?.[0] || 'Remote',
          job_country: job.countries_derived?.[0] || 'United States',
          job_state: job.regions_derived?.[0] || '',
          job_posted_at_timestamp: job.date_posted ? new Date(job.date_posted).getTime() / 1000 : Math.floor(Date.now() / 1000),
          job_min_salary: job.salary_raw?.value?.minValue,
          job_max_salary: job.salary_raw?.value?.maxValue,
        }));

        return NextResponse.json(jobListings);
      } catch (apiError) {
        console.error('API request failed, falling back to mock data:', apiError);
        // Fall back to mock data if the API call fails
        return getMockJobResponse(searchParams);
      }
    } else {
      // Use mock data 
      return getMockJobResponse(searchParams);
    }
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ 
      message: 'Server Error', 
      error: String(error)
    }, { status: 500 });
  }
}

// Helper function to get mock job data with filtering
function getMockJobResponse(searchParams: URLSearchParams): NextResponse {
  console.log('Using mock data for jobs');
  
  // Filter the mock data based on the search parameters
  const filteredJobs = filterJobs({
    query: searchParams.get('query') || undefined,
    location: searchParams.get('location') || undefined,
    experience: searchParams.get('experience') || undefined,
    jobType: searchParams.getAll('jobType').length > 0 ? searchParams.getAll('jobType') : undefined,
    datePosted: searchParams.get('datePosted') || undefined,
    minSalary: searchParams.get('minSalary') ? Number(searchParams.get('minSalary')) : undefined,
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1
  });
  
  // Apply sorting if specified
  const sortOption = searchParams.get('sortBy');
  let sortedJobs = [...filteredJobs];
  
  if (sortOption === 'date') {
    sortedJobs.sort((a, b) => b.job_posted_at_timestamp - a.job_posted_at_timestamp);
  } else if (sortOption === 'salary') {
    sortedJobs.sort((a, b) => {
      const aMaxSalary = a.job_max_salary || a.job_min_salary || 0;
      const bMaxSalary = b.job_max_salary || b.job_min_salary || 0;
      return bMaxSalary - aMaxSalary;
    });
  }
  
  // Simulate pagination
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedJobs = sortedJobs.slice(start, end);
  
  // Calculate total pages for the metadata
  const totalJobs = filteredJobs.length;
  const totalPages = Math.ceil(totalJobs / pageSize);
  
  console.log(`Returning ${paginatedJobs.length} mock jobs (filtered from ${totalJobs} total)`);
  
  // Return both the paginated jobs and metadata
  return NextResponse.json({
    jobs: paginatedJobs,
    metadata: {
      totalJobs,
      totalPages,
      currentPage: page,
      pageSize
    }
  });
}