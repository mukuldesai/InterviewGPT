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

/**
 * Asynchronously retrieves job listings based on search criteria.
 *
 * @param jobTitle The title of the job to search for.
 * @param location The location where the job is.
 * @returns A promise that resolves to an array of JobListing objects.
 */
export async function getJobListings(
  jobTitle: string,
  location: string
): Promise<JobListing[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      title: 'Software Engineer',
      company: 'Google',
      description: 'Software Engineer position at Google.',
      applyUrl: 'https://www.google.com/careers'
    },
    {
      title: 'Data Scientist',
      company: 'Microsoft',
      description: 'Data Scientist position at Microsoft.',
      applyUrl: 'https://www.microsoft.com/careers'
    }
  ];
}
