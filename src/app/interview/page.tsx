'use client';

import React, {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {generateInterviewQuestions} from '@/ai/flows/generate-interview-questions';
import {AnalyzeInterviewResponseInput, analyzeInterviewResponse} from '@/ai/flows/analyze-interview-response';
import {useToast} from '@/hooks/use-toast';
import {useRouter} from 'next/navigation';
import {ArrowLeft, RotateCw} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {motion} from 'framer-motion';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import {Slider} from '@/components/ui/slider';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {CheckCircle2, HelpCircle, Lightbulb, BookOpen, Calendar, Settings} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";

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
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Preparation Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center"><BookOpen className="mr-2 h-4 w-4"/>Recommended Reading</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4">
                    <li>"Cracking the Coding Interview"</li>
                    <li>"Clean Code"</li>
                    <li>"The Pragmatic Programmer"</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center"><Calendar className="mr-2 h-4 w-4"/>Interview Scheduling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Schedule a mock interview to practice with others.</p>
                  <Button variant="secondary">Schedule Now</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center"><Settings className="mr-2 h-4 w-4"/>Personalized Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Adjust settings to match your interview style.</p>
                  <Button variant="secondary">Adjust Settings</Button>
                </CardContent>
              </Card>
            </div>
          </section>

        </CardContent>
      </motion.div>
    </div>
  );
};

export default InterviewPage;
