'use client';

import React, {useState, useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {optimizeResume} from '@/ai/flows/optimize-resume';
import {useToast} from '@/hooks/use-toast';
import {useRouter} from 'next/navigation';
import {ArrowLeft, File, FileText, Upload, CheckCircle, Download} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";
import {motion} from 'framer-motion';
import {Progress} from "@/components/ui/progress";
import {SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton} from "@/components/ui/sidebar";

const ResumePage = () => {
  const [resumeDataUri, setResumeDataUri] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const {toast} = useToast();
  const router = useRouter();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [analysisStep, setAnalysisStep] = useState<'upload' | 'analyze' | 'results'>('upload');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadstart = () => setUploadProgress(10);
      reader.onprogress = (progressEvent) => {
        if (progressEvent.lengthComputable) {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 90) + 10;
          setUploadProgress(progress);
        }
      };
      reader.onloadend = () => {
        setResumeDataUri(reader.result as string);
        setUploadProgress(100);
        setAnalysisStep('analyze'); // Move to the next step after upload
      };
      reader.readAsDataURL(file);
    }
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: '.pdf,.doc,.docx,.txt'});

  const handleAnalyzeResume = async () => {
    if (!resumeDataUri || !jobDescription) {
      toast({
        title: 'Error',
        description: 'Please upload your resume and enter the job description.',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
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
      setAnalysisStep('results'); // Move to the results step
    } catch (error: any) {
      console.error('Error analyzing resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to analyze the resume.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const resetAnalysis = () => {
    setResumeDataUri(null);
    setJobDescription('');
    setAnalysis(null);
    setAnalysisStep('upload');
  };

  const getAnalysisStepLabel = () => {
    switch (analysisStep) {
      case 'upload':
        return '1. Upload Resume';
      case 'analyze':
        return '2. Analyze Resume';
      case 'results':
        return '3. View Results';
      default:
        return '';
    }
  };

  const renderUploadArea = () => (
    <div {...getRootProps()} className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-md cursor-pointer bg-muted hover:bg-accent">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-lg text-muted-foreground">Drop the files here ...</p>
      ) : (
        <div className="flex flex-col items-center">
          <Upload className="w-6 h-6 text-muted-foreground mb-2"/>
          <p className="text-lg text-muted-foreground">Drag 'n' drop some files here, or click to select files</p>
          <p className="text-sm text-muted-foreground mt-2">Supported formats: PDF, DOCX, TXT</p>
        </div>
      )}
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="w-full mt-4">
          <Progress value={uploadProgress}/>
        </div>
      )}
    </div>
  );

  const renderJobDescriptionArea = () => (
    <div className="mt-4">
      <Textarea
        placeholder="Enter job description"
        value={jobDescription}
        onChange={e => setJobDescription(e.target.value)}
      />
    </div>
  );

  const renderResults = () => (
    <>
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
      <Button className="mt-4" onClick={resetAnalysis}>Analyze New Resume</Button>
    </>
  );

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
                Interview
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/resume">
                Resume
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/jobs">
                Jobs
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/progress">
                Progress
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/profile">
                Profile
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/settings">
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
              <CardTitle className="text-2xl font-bold">Resume Analysis</CardTitle>
              <Button variant="ghost" onClick={handleBackToHome}>
                <ArrowLeft className="mr-2"/>
                Back to Home
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{getAnalysisStepLabel()}</p>
          </CardHeader>
          <CardContent>
            {analysisStep === 'upload' && renderUploadArea()}
            {analysisStep === 'analyze' && (
              <>
                {renderJobDescriptionArea()}
                <Button onClick={handleAnalyzeResume} disabled={isAnalyzing} className="mt-4">
                  {isAnalyzing ? (
                    <>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4"/>
                      Analyze Resume
                    </>
                  )}
                </Button>
              </>
            )}
            {analysisStep === 'results' && analysis && renderResults()}
          </CardContent>
        </Card>
      </div>
    </SidebarProvider>
  );
};

export default ResumePage;
