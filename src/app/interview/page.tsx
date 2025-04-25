'use client';

import React, {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {generateInterviewQuestions} from '@/ai/flows/generate-interview-questions';
import {AnalyzeInterviewResponseInput, analyzeInterviewResponse} from '@/ai/flows/analyze-interview-response';
import {useToast} from '@/hooks/use-toast';
import {useRouter} from 'next/navigation';
import {ArrowLeft, RotateCw, Lightbulb, CheckCircle2, HelpCircle} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {motion} from 'framer-motion';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import {Slider} from '@/components/ui/slider';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Separator} from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {File, ListChecks, MessageSquare, User} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

const InterviewPage = () => {
  const [jobRole, setJobRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<number>(2); // Use number for slider
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast();
  const router = useRouter();
  const [difficultyLevel, setDifficultyLevel] = useState('Medium'); // Easy, Medium, Hard, Expert

  const experienceLevels = [
    {value: 1, label: 'Entry-level', description: 'Basic understanding, limited experience.'},
    {value: 2, label: 'Junior', description: 'Some experience, capable of handling simple tasks.'},
    {value: 3, label: 'Mid-level', description: 'Solid experience, can work independently.'},
    {value: 4, label: 'Senior', description: 'Extensive experience, leads projects, mentors others.'},
    {value: 5, label: 'Lead', description: 'Expert, guides strategy, manages teams.'},
  ];

  const handleGenerateQuestions = async () => {
    if (!jobRole) {
      toast({
        title: 'Error',
        description: 'Please enter a job role.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const questions = await generateInterviewQuestions({
        jobRole,
        experienceLevel: experienceLevels[experienceLevel - 1].label,
        numQuestions: 5,
      });
      setGeneratedQuestions(questions.questions);
      setCurrentQuestionIndex(0);
      setAnswer('');
      setAnalysis(null);
    } catch (error: any) {
      console.error('Error generating questions:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate interview questions.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < generatedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswer('');
      setAnalysis(null);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswer('');
      setAnalysis(null);
    }
  };

  const handleAnalyzeAnswer = async () => {
    if (!jobRole || !generatedQuestions[currentQuestionIndex] || !answer) {
      toast({
        title: 'Error',
        description: 'Please ensure job role, question, and answer are provided.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const input: AnalyzeInterviewResponseInput = {
        jobRole,
        experienceLevel: experienceLevels[experienceLevel - 1].label,
        question: generatedQuestions[currentQuestionIndex],
        answer,
      };
      const responseAnalysis = await analyzeInterviewResponse(input);
      setAnalysis(responseAnalysis);
      toast({
        title: 'Analysis Complete',
        description: 'Your answer has been analyzed.',
      });
    } catch (error: any) {
      console.error('Error analyzing answer:', error);
      toast({
        title: 'Error',
        description: 'Failed to analyze the answer.',
        variant: 'destructive',
      });
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const fadeInVariants = {
    initial: {opacity: 0, y: 10},
    animate: {opacity: 1, y: 0, transition: {duration: 0.5}},
  };

  const jobRoles = [
    {label: 'Software Engineer', icon: '💻'},
    {label: 'Data Scientist', icon: '📊'},
    {label: 'Product Manager', icon: '💡'},
    {label: 'UX Designer', icon: '🎨'},
    {label: 'Accountant', icon: '💰'},
  ];

  const difficultyLevels = [
    {value: 'Easy', description: 'Basic questions.'},
    {value: 'Medium', description: 'Intermediate questions.'},
    {value: 'Hard', description: 'Advanced questions.'},
    {value: 'Expert', description: 'Very challenging questions.'},
  ];

  const [suggestedSkills, setSuggestedSkills] = useState([
    "Problem-solving", "Communication", "Teamwork", "Leadership", "Adaptability"
  ]);

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
        <motion.div
          className="w-full max-w-4xl mx-auto"
          variants={fadeInVariants}
          initial="initial"
          animate="animate"
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Interview Practice</CardTitle>
              <Button variant="ghost" onClick={handleBackToHome}>
                <ArrowLeft className="mr-2"/>
                Back to Home
              </Button>
            </div>
          </CardHeader>
          <CardContent>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Customize Your Practice</h2>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Job Role</h3>
                <div className="flex flex-wrap gap-2">
                  {jobRoles.map(role => (
                    <Button
                      key={role.label}
                      variant={jobRole === role.label ? 'primary' : 'secondary'}
                      onClick={() => setJobRole(role.label)}
                    >
                      {role.icon} {role.label}
                    </Button>
                  ))}
                  <Input
                    type="text"
                    placeholder="Enter Job Role"
                    value={jobRole}
                    onChange={e => setJobRole(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Experience Level</h3>
                <Slider
                  defaultValue={[2]}
                  max={5}
                  min={1}
                  step={1}
                  onValueChange={value => setExperienceLevel(value[0])}
                />
                <p className="text-sm mt-2">
                  Selected Experience Level: {experienceLevels[experienceLevel - 1].label}
                  <Badge variant="secondary" className="ml-2">{experienceLevels[experienceLevel - 1].description}</Badge>
                </p>

              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Difficulty Level</h3>
                <Select onValueChange={setDifficultyLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Difficulty Level"/>
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyLevels.map(level => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-2">
                  {
                    difficultyLevels.find(level => level.value === difficultyLevel)?.description
                  }
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Suggested Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {suggestedSkills.map((skill, index) => (
                    <Badge key={index} variant="outline">{skill}</Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Develop these skills to excel in your interview.
                </p>
              </div>

              <Button onClick={handleGenerateQuestions} disabled={isLoading} className="mt-4">
                {isLoading ? (
                  <>
                    <RotateCw className="mr-2 h-4 w-4 animate-spin"/>
                    Generating Questions...
                  </>
                ) : (
                  <>
                    <Lightbulb className="mr-2 h-4 w-4"/>
                    Generate Interview Questions
                  </>
                )}
              </Button>
            </section>
            <Separator className="mb-4"/>

            {generatedQuestions.length > 0 && (
              <motion.div
                className="mb-4"
                variants={fadeInVariants}
                initial="initial"
                animate="animate"
              >
                <CardHeader>
                  <CardTitle>Question {currentQuestionIndex + 1}/{generatedQuestions.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">{generatedQuestions[currentQuestionIndex]}</p>
                  <Textarea
                    placeholder="Your answer"
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    className="mb-2"
                  />
                  <div className="flex justify-between">
                    <Button
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                      variant="outline"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleNextQuestion}
                      disabled={currentQuestionIndex === generatedQuestions.length - 1}
                      variant="outline"
                    >
                      Next
                    </Button>
                  </div>
                  <Button onClick={handleAnalyzeAnswer} className="mt-4">
                    <CheckCircle2 className="mr-2 h-4 w-4"/>
                    Analyze Answer
                  </Button>
                </CardContent>
              </motion.div>
            )}

            {analysis && (
              <motion.div
                className="mb-4"
                variants={fadeInVariants}
                initial="initial"
                animate="animate"
              >
                <CardHeader>
                  <CardTitle>Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="contentClarity">
                      <AccordionTrigger>Content Clarity: {analysis.contentClarity}</AccordionTrigger>
                      <AccordionContent>
                        This score reflects how clear and relevant your answer was to the question.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="technicalAccuracy">
                      <AccordionTrigger>Technical Accuracy: {analysis.technicalAccuracy}</AccordionTrigger>
                      <AccordionContent>
                        This score indicates the accuracy of the technical information you provided.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="confidence">
                      <AccordionTrigger>Confidence: {analysis.confidence}</AccordionTrigger>
                      <AccordionContent>
                        This score represents the confidence and tone conveyed in your response.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="structure">
                      <AccordionTrigger>Structure: {analysis.structure}</AccordionTrigger>
                      <AccordionContent>
                        This score assesses how well your answer followed the STAR format (Situation, Task, Action, Result).
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="feedback">
                      <AccordionTrigger>Feedback <HelpCircle className="ml-2 h-4 w-4"/></AccordionTrigger>
                      <AccordionContent>
                        {analysis.feedback}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </motion.div>
            )}

          </CardContent>
        </motion.div>
      </div>
    </SidebarProvider>
  );
};

export default InterviewPage;
