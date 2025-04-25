'use client';

import React, {useState, useCallback, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {optimizeResume} from '@/ai/flows/optimize-resume';
import {useToast} from '@/hooks/use-toast';
import {useRouter} from 'next/navigation';
import {
  ArrowLeft,
  File,
  FileText,
  Upload,
  CheckCircle,
  Download,
  MessageSquare,
  ListChecks,
  User,
  Lightbulb,
  RotateCw,
} from "lucide-react";
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
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';
import {cn} from "@/lib/utils";

const resumeFormSchema = z.object({
  resumeFile: z.any(),
  jobDescription: z.string().min(10, {
    message: "Job description must be at least 10 characters.",
  }),
});

type ResumeFormValues = z.infer<typeof resumeFormSchema>;

const ResumePage = () => {
  const [resumeDataUri, setResumeDataUri] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const {toast} = useToast();
  const router = useRouter();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: {
      resumeFile: null,
      jobDescription: "",
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFileName(file.name);
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
    setUploadedFileName(null);
  };

  const jobDescriptionExamples = [
    "Software Engineer with 3+ years of experience in React and Node.js.",
    "Data Scientist proficient in Python, machine learning, and data visualization.",
    "Marketing Manager with a proven track record in digital marketing and SEO."
  ];

    const getScoreColor = (score: number) => {
    if (score <= 50) return '#FF4D4F';
    if (score <= 70) return '#FA8C16';
    if (score <= 85) return '#FAAD14';
    return '#52C41A';
  };


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

      <div className="resume-analysis-container">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="analysis-header">
            <div className="flex items-center justify-between">
              <CardTitle className="analysis-title">Resume Analysis</CardTitle>
              <Button variant="ghost" onClick={handleBackToHome} className="back-button">
                <ArrowLeft className="mr-2"/>
                Back to Home
              </Button>
            </div>
            <CardDescription className="analysis-subtitle">
              Upload your resume and provide a job description to get detailed feedback.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="upload-container">
              <motion.div
                {...getRootProps()}
                className={cn("upload-area", isDragActive ? 'drag-over' : '')}
                whileHover={{scale: 1.05}}
                transition={{duration: 0.3}}
              >
                <input {...getInputProps()} />
                <Upload className="upload-icon"/>
                <p>
                  {isDragActive
                    ? 'Drop the files here ...'
                    : 'Drag and drop your resume here, or click to select files'}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Supported formats: PDF, DOCX, TXT
                </p>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <Progress value={uploadProgress} className="mt-4 w-full"/>
                )}
                {uploadedFileName && (
                  <div className="mt-2 flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>{uploadedFileName} Uploaded</span>
                  </div>
                )}
              </motion.div>

              <div className="job-description-area">
                <label htmlFor="jobDescription" className="job-description-label">
                  Enter Job Description
                </label>
                <Textarea
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={e => setJobDescription(e.target.value)}
                  id="jobDescription"
                />
              </div>
            </div>

            <div className="action-container">
              <Button
                className={cn("analyze-button", isAnalyzing ? 'loading' : '')}
                onClick={handleAnalyzeResume}
                disabled={isAnalyzing || !resumeDataUri || !jobDescription}
              >
                {isAnalyzing ? (
                  <>
                    Analyzing...
                    <RotateCw className="animate-spin"/>
                  </>
                ) : (
                  <>
                    Analyze Resume
                    <CheckCircle className="ml-2"/>
                  </>
                )}
              </Button>
            </div>

            {analysis && (
              <section>
                <h2 className="text-xl font-semibold mb-2">Analysis Results</h2>
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Analysis Results</CardTitle>
                    <CardDescription>Review the analysis and suggestions to improve your resume.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {analysis ? (
                      <>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full md:w-1/2">
                                <div className="ats-score-circle" style={{'--score-value': analysis.atsCompatibilityScore, '--score-color': getScoreColor(analysis.atsCompatibilityScore)}}>
                                    <div className="score-value">{analysis.atsCompatibilityScore}%</div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div>
                                    <h3>Section Scores</h3>
                                    
                                </div>
                            </div>
                        </div>

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
                        <Button className="mt-4" onClick={resetAnalysis}>Analyze New Resume</Button>
                      </>
                    ) : (
                      <p>No analysis available.</p>
                    )}
                  </CardContent>
                </Card>
              </section>
            )}
          </CardContent>
        </Card>
        <div className="resume-tips">
  <div className="tips-header">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
    <h3>Resume Pro Tips</h3>
  </div>
  
  <div className="tip-card">
    <div className="tip-title">📊 Quantify Your Achievements</div>
    <div className="tip-content">Use numbers to quantify your impact. Instead of "Improved sales", try "Increased sales by 27% in 6 months".</div>
  </div>
  
  <div className="tip-card">
    <div className="tip-title">🔍 Tailor Your Keywords</div>
    <div className="tip-content">Mirror the language from the job description to improve ATS compatibility and show your relevance.</div>
  </div>
  
  <div className="tip-card">
    <div className="tip-title">✂️ Be Concise</div>
    <div className="tip-content">Keep your resume to 1-2 pages. Recruiters spend an average of just 7.4 seconds scanning a resume.</div>
  </div>
  
  <div className="tip-card">
    <div className="tip-title">🔤 Use Action Verbs</div>
    <div className="tip-content">Start bullet points with power verbs like "Achieved," "Implemented," or "Transformed" to create impact.</div>
  </div>
</div>
         
      </div>
      <div className="loading-overlay" style={{ display: isAnalyzing ? 'flex' : 'none' }}>
        <div className="loading-spinner"></div>
        <div className="loading-text">Analyzing Resume...</div>
      </div>
    </SidebarProvider>
  );
};

export default ResumePage;
