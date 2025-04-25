'use client';

import React, {useState, useEffect, useRef} from 'react';
import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {generateInterviewQuestions} from '@/ai/flows/generate-interview-questions';
import {AnalyzeInterviewResponseInput, analyzeInterviewResponse} from '@/ai/flows/analyze-interview-response';
import {AnalyzeVoiceInputInput, analyzeVoiceInput} from '@/ai/flows/analyze-voice-input';
import {useToast} from '@/hooks/use-toast';
import {useRouter} from 'next/navigation';
import {ArrowLeft} from "lucide-react";
import {Input} from "@/components/ui/input";


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
  const [transcription, setTranscription] = useState<string>('');
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);


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

  const startRecording = async () => {
    setRecordingError(null);
    setTranscription('');
    setIsRecording(true);
    setAudioDataUri(null);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio: true});
      if (!stream) {
        setRecordingError('No audio stream available.');
        setIsRecording(false);
        return;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {type: 'audio/wav'});
        const audioDataUrl = URL.createObjectURL(audioBlob);
        setAudioDataUri(audioDataUrl);
        setIsRecording(false);
      };

      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder Error: ', event);
        setRecordingError('Error recording audio.');
        setIsRecording(false);
      };

      mediaRecorder.start();
      toast({
        title: 'Recording Started',
        description: 'Recording in progress...',
      });
    } catch (error: any) {
      console.error('Error accessing microphone:', error);
      setRecordingError('Microphone access denied. Please allow microphone access in your browser settings.');
      setIsRecording(false);
      toast({
        title: 'Microphone Access Denied',
        description: 'Please enable microphone permissions in your browser settings to use this feature.',
        variant: 'destructive',
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      toast({
        title: 'Recording Stopped',
        description: 'Audio recording finished.',
      });
    }
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
      setTranscription(voiceAnalysisResult.transcription);
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

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto">
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
              {recordingError && (
                <p className="text-red-500">{recordingError}</p>
              )}

              <Button onClick={stopRecording} disabled={!isRecording} className="mb-2">
                Stop Recording
              </Button>

              {audioDataUri && (
                <Button onClick={handleAnalyzeVoice}>Analyze Voice</Button>
              )}

              {voiceAnalysis && (
                <>
                  <p>Transcription: {transcription}</p>
                  <p>Confidence Level: {voiceAnalysis.confidenceLevel}</p>
                  <p>Filler Word Count: {voiceAnalysis.fillerWordCount}</p>
                  <p>Feedback: {voiceAnalysis.feedback}</p>
                </>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewPage;
