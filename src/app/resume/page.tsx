'use client';

import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {optimizeResume} from '@/ai/flows/optimize-resume';
import {useToast} from '@/hooks/use-toast';
import {useRouter} from 'next/navigation';
import {ArrowLeft} from "lucide-react";

const ResumePage = () => {
  const [resumeDataUri, setResumeDataUri] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const {toast} = useToast();
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeDataUri(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeResume = async () => {
    if (!resumeDataUri || !jobDescription) {
      toast({
        title: 'Error',
        description: 'Please upload your resume and enter the job description.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const responseAnalysis = await optimizeResume({
        resumeDataUri,
        jobDescription,
      });
      setAnalysis(responseAnalysis);
      toast({
        title: 'Analysis Complete',
        description: 'Your resume has been analyzed.',
      });
    } catch (error: any) {
      console.error('Error analyzing resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to analyze the resume.',
        variant: 'destructive',
      });
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Resume Analysis</CardTitle>
            <Button variant="ghost" onClick={handleBackToHome}>
              <ArrowLeft className="mr-2" />
              Back to Home
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            {resumeDataUri && (
              <p className="mt-2 text-sm text-muted-foreground">
                Uploaded resume
              </p>
            )}
          </div>

          <div className="mb-4">
            <Textarea
              placeholder="Enter job description"
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
            />
          </div>

          <Button onClick={handleAnalyzeResume}>
            Analyze Resume
          </Button>

          {analysis && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p>ATS Compatibility Score: {analysis.atsCompatibilityScore}</p>
                <p>Suggestions: {analysis.suggestions.join(', ')}</p>
                <p>Tailored Summary: {analysis.tailoredSummary}</p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumePage;
