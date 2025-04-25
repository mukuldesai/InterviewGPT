'use server'
/**
 * @fileOverview Defines the JobListing interface and getJobListings service.
 */

/**
 * Represents a job listing.
 */
export interface JobListing {
  /**
   * The title of the job.
   */
  title: string;
  /**
   * The company offering the job.
   */
  company: string;
  /**
   * A brief description of the job.
   */
  description: string;
  /**
   * The URL to apply for the job.
   */
  applyUrl: string;
}

const adzunaAppId = '4cc9f61bcf7dd24c36d8bc59a8f56805';
const adzunaAppKey = '67a5043d';

/**
 * Asynchronously retrieves job listings based on search criteria.
 */
export async function getJobListings(
  jobTitle: string,
  location: string,
  experienceLevel?: string,
  salaryRange?: string
): Promise<JobListing[]> {
  try {
    let apiUrl = `https://api.adzuna.com/v1/api/jobs/${location.toLowerCase().replace(' ', '_')}/search/1?app_id=${adzunaAppId}&app_key=${adzunaAppKey}&what=${jobTitle}&content-type=application/json`;

    // Add salary filter if specified
    if (salaryRange) {
      apiUrl += `&salary_min=${salaryRange}`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.results) {
      let formattedListings: JobListing[] = data.results.map((job: any) => ({
        title: job.title,
        company: job.company.display_name,
        description: job.description,
        applyUrl: job.redirect_url,
      }));

      // Filter job listings based on experience level
      if (experienceLevel) {
        formattedListings = formattedListings.filter(listing =>
          listing.description.toLowerCase().includes(experienceLevel.toLowerCase())
        );
      }

      return formattedListings;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching job listings:', error);
    throw new Error('Failed to fetch job listings.');
  }
}
