'use client';

import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
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

const InterviewPage = () => {
  const [jobRole, setJobRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast();
  const router = useRouter();

  const handleGenerateQuestions = async () => {
    if (!jobRole || !experienceLevel) {
      toast({
        title: 'Error',
        description: 'Please enter a job role and select an experience level.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const questions = await generateInterviewQuestions({
        jobRole,
        experienceLevel,
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
    if (!jobRole || !experienceLevel || !generatedQuestions[currentQuestionIndex] || !answer) {
      toast({
        title: 'Error',
        description: 'Please ensure job role, experience level, question, and answer are provided.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const input: AnalyzeInterviewResponseInput = {
        jobRole,
        experienceLevel,
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              type="text"
              placeholder="Enter Job Role"
              value={jobRole}
              onChange={e => setJobRole(e.target.value)}
            />

            <Select onValueChange={setExperienceLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select Experience Level"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Entry-level">Entry-level</SelectItem>
                <SelectItem value="Mid-level">Mid-level</SelectItem>
                <SelectItem value="Senior-level">Senior-level</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleGenerateQuestions} disabled={isLoading} className="mb-4">
            {isLoading ? (
              <>
                <RotateCw className="mr-2 h-4 w-4 animate-spin"/>
                Generating Questions...
              </>
            ) : (
              'Generate Interview Questions'
            )}
          </Button>

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
                    <AccordionTrigger>Feedback</AccordionTrigger>
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
  );
};

export default InterviewPage;
