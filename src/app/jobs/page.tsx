'use client';

import React, {useState, useEffect} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {JobListing} from '@/services/job-listings';
import {useToast} from '@/hooks/use-toast';

const adzunaAppId = '4cc9f61bcf7dd24c36d8bc59a8f56805';
const adzunaAppKey = '67a5043d';

const JobsPage = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const {toast} = useToast();

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

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>

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
    </div>
  );
};

export default JobsPage;
