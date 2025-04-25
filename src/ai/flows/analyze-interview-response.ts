'use server';
/**
 * @fileOverview An AI agent for analyzing interview responses.
 *
 * - analyzeInterviewResponse - A function that handles the interview response analysis process.
 * - AnalyzeInterviewResponseInput - The input type for the analyzeInterviewResponse function.
 * - AnalyzeInterviewResponseOutput - The return type for the analyzeInterviewResponse function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnalyzeInterviewResponseInputSchema = z.object({
  jobRole: z.string().describe('The job role the candidate is interviewing for.'),
  experienceLevel: z.string().describe('The experience level of the candidate (e.g., Entry-level, Mid-level, Senior-level).'),
  question: z.string().describe('The interview question asked.'),
  answer: z.string().describe('The candidate\'s answer to the interview question.'),
});
export type AnalyzeInterviewResponseInput = z.infer<typeof AnalyzeInterviewResponseInputSchema>;

const AnalyzeInterviewResponseOutputSchema = z.object({
  contentClarity: z.number().describe('A score (1-5) representing the clarity and relevance of the content.'),
  technicalAccuracy: z.number().describe('A score (1-5) representing the technical accuracy of the answer.'),
  confidence: z.number().describe('A score (1-5) representing the confidence and tone of the response.'),
  structure: z.number().describe('A score (1-5) representing the behavioral structure (STAR format compliance) of the answer.'),
  feedback: z.string().describe('Personalized, constructive feedback on how to improve the answer.'),
});
export type AnalyzeInterviewResponseOutput = z.infer<typeof AnalyzeInterviewResponseOutputSchema>;

export async function analyzeInterviewResponse(input: AnalyzeInterviewResponseInput): Promise<AnalyzeInterviewResponseOutput> {
  return analyzeInterviewResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeInterviewResponsePrompt',
  input: {
    schema: z.object({
      jobRole: z.string().describe('The job role the candidate is interviewing for.'),
      experienceLevel: z.string().describe('The experience level of the candidate (e.g., Entry-level, Mid-level, Senior-level).'),
      question: z.string().describe('The interview question asked.'),
      answer: z.string().describe('The candidate\'s answer to the interview question.'),
    }),
  },
  output: {
    schema: z.object({
      contentClarity: z.number().describe('A score (1-5) representing the clarity and relevance of the content.'),
      technicalAccuracy: z.number().describe('A score (1-5) representing the technical accuracy of the answer.'),
      confidence: z.number().describe('A score (1-5) representing the confidence and tone of the response.'),
      structure: z.number().describe('A score (1-5) representing the behavioral structure (STAR format compliance) of the answer.'),
      feedback: z.string().describe('Personalized, constructive feedback on how to improve the answer.'),
    }),
  },
  prompt: `You are an AI-powered interview coach. You will analyze the candidate's answer to the interview question and provide feedback.

  Job Role: {{{jobRole}}}
  Experience Level: {{{experienceLevel}}}
  Question: {{{question}}}
  Answer: {{{answer}}}

  Evaluate the answer based on the following dimensions:
  - Content clarity and relevance (contentClarity): How clear and relevant is the content to the question?
  - Technical accuracy (technicalAccuracy): How accurate is the technical information provided in the answer?
  - Confidence and tone (confidence): How confident and professional is the candidate's tone?
  - Behavioral structure (structure): How well does the answer follow the STAR format (Situation, Task, Action, Result)?

  Provide a numerical score (1-5) for each dimension and personalized, constructive feedback on how to improve the answer (feedback).
  `,
});

const analyzeInterviewResponseFlow = ai.defineFlow<
  typeof AnalyzeInterviewResponseInputSchema,
  typeof AnalyzeInterviewResponseOutputSchema
>(
  {
    name: 'analyzeInterviewResponseFlow',
    inputSchema: AnalyzeInterviewResponseInputSchema,
    outputSchema: AnalyzeInterviewResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
