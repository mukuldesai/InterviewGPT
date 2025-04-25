'use client';

import React, {useState, useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {optimizeResume} from '@/ai/flows/optimize-resume';
import {useToast} from '@/hooks/use-toast';
import {useRouter} from 'next/navigation';
import {ArrowLeft, File, FileText, Upload, CheckCircle, Download} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";
import {motion} from 'framer-motion';
import {Progress} from "@/components/ui/progress";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

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
    <motion.div
      {...getRootProps()}
      className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-md cursor-pointer bg-muted hover:bg-accent transition-colors duration-300"
      whileHover={{scale: 1.05}}
    >
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
    </motion.div>
  );

  const renderJobDescriptionArea = () => (
    <motion.div className="mt-4" initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}>
      <Textarea
        placeholder="Enter job description"
        value={jobDescription}
        onChange={e => setJobDescription(e.target.value)}
      />
    </motion.div>
  );

  const renderResults = () => (
    <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Analysis Results</CardTitle>
          <CardDescription>Review the analysis and suggestions to improve your resume.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="atsCompatibility">
              <AccordionTrigger>ATS Compatibility Score: {analysis.atsCompatibilityScore}</AccordionTrigger>
              <AccordionContent>
                This score reflects how well your resume is likely to be parsed by Applicant Tracking Systems.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="suggestions">
              <AccordionTrigger>Suggestions</AccordionTrigger>
              <AccordionContent>
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="list-disc ml-4">{suggestion}</li>
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="tailoredSummary">
              <AccordionTrigger>Tailored Summary</AccordionTrigger>
              <AccordionContent>
                {analysis.tailoredSummary}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      <Button className="mt-4" onClick={resetAnalysis}>Analyze New Resume</Button>
    </motion.div>
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
                <MessageSquare className="w-4 h-4"/>
                Interview
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/resume">
                <File className="w-4 h-4"/>
                Resume
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/jobs">
                <ListChecks className="w-4 h-4"/>
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
                  <path d="M3 3v18h18"/>
                  <path d="M7 11V5"/>
                  <path d="M11 19V8"/>
                  <path d="M15 15V3"/>
                  <path d="M19 10v5"/>
                </svg>
                Progress
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/profile">
                <User className="w-4 h-4"/>
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
                  <path
                    d="M12.22 2.16a8.5 8.5 0 0 1 6.36 6.36 8.5 8.5 0 0 1-1.15 2.48m-2.48 1.15a8.5 8.5 0 0 1-6.36-6.37 8.5 8.5 0 0 1 1.15-2.48m2.48-1.14a8.5 8.5 0 0 0 6.36 6.37 8.5 8.5 0 0 0-1.15 2.48m-2.48 1.15a8.5 8.5 0 0 0-6.36-6.36 8.5 8.5 0 0 0 1.15-2.48M12 14.5V17m0-5 0 5M12 6.5V9m0 8V22m6.36-6.36a8.5 8.5 0 0 1-2.48-1.15"/>
                </svg>
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
