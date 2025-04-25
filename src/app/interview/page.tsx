'use client';

import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {generateInterviewQuestions} from '@/ai/flows/generate-interview-questions';
import {AnalyzeInterviewResponseInput, analyzeInterviewResponse} from '@/ai/flows/analyze-interview-response';
import {AnalyzeVoiceInputInput, analyzeVoiceInput} from '@/ai/flows/analyze-voice-input';
import {useToast} from '@/hooks/use-toast';

const InterviewPage = () => {
  const [jobRole, setJobRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [voiceAnalysis, setVoiceAnalysis] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const {toast} = useToast();

  const handleGenerateQuestions = async () => {
    if (!jobRole || !experienceLevel) {
      toast({
        title: 'Error',
        description: 'Please select a job role and experience level.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const questions = await generateInterviewQuestions({
        jobRole,
        experienceLevel,
        numQuestions: 5, // You can adjust the number of questions
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

  const startRecording = () => {
    setIsRecording(true);
    setAudioDataUri(null);
    // Implement audio recording logic here (using MediaRecorder or similar)
    // For simplicity, let's assume it records and sets audioDataUri
    // This is a placeholder, replace with actual recording implementation
    setTimeout(() => {
      const dummyAudioDataUri = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAwF0AAIBRAHAAFEF0YWQAAQAQAgACFEF0YXRhAgAA'; // Dummy audio data URI
      setAudioDataUri(dummyAudioDataUri);
      setIsRecording(false);
      toast({
        title: 'Recording Complete',
        description: 'Audio recording finished.',
      });
    }, 5000); // Simulating recording for 5 seconds
  };

  const handleAnalyzeVoice = async () => {
    if (!audioDataUri) {
      toast({
        title: 'Error',
        description: 'No audio recorded. Please record your answer first.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const input: AnalyzeVoiceInputInput = {
        audioDataUri,
      };
      const voiceAnalysisResult = await analyzeVoiceInput(input);
      setVoiceAnalysis(voiceAnalysisResult);
      toast({
        title: 'Voice Analysis Complete',
        description: 'Your voice input has been analyzed.',
      });
    } catch (error: any) {
      console.error('Error analyzing voice input:', error);
      toast({
        title: 'Error',
        description: 'Failed to analyze voice input.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Interview Practice</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Select onValueChange={setJobRole}>
          <SelectTrigger>
            <SelectValue placeholder="Select Job Role"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Software Engineer">Software Engineer</SelectItem>
            <SelectItem value="Data Scientist">Data Scientist</SelectItem>
            <SelectItem value="Product Manager">Product Manager</SelectItem>
            <SelectItem value="Project Manager">Project Manager</SelectItem>
          </SelectContent>
        </Select>

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

      <Button onClick={handleGenerateQuestions} className="mb-4">
        Generate Interview Questions
      </Button>

      {generatedQuestions.length > 0 && (
        <Card className="mb-4">
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
        </Card>
      )}

      {analysis && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Content Clarity: {analysis.contentClarity}</p>
            <p>Technical Accuracy: {analysis.technicalAccuracy}</p>
            <p>Confidence: {analysis.confidence}</p>
            <p>Structure: {analysis.structure}</p>
            <p>Feedback: {analysis.feedback}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Voice Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={startRecording} disabled={isRecording} className="mb-2">
            {isRecording ? 'Recording...' : 'Record Answer'}
          </Button>
          {audioDataUri && (
            <Button onClick={handleAnalyzeVoice}>Analyze Voice</Button>
          )}
          {voiceAnalysis && (
            <>
              <p>Transcription: {voiceAnalysis.transcription}</p>
              <p>Confidence Level: {voiceAnalysis.confidenceLevel}</p>
              <p>Filler Word Count: {voiceAnalysis.fillerWordCount}</p>
              <p>Feedback: {voiceAnalysis.feedback}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewPage;
