'use server';
/**
 * @fileOverview Generates role-specific interview questions based on user-selected job role and experience level.
 *
 * - generateInterviewQuestions - A function that generates interview questions.
 * - GenerateInterviewQuestionsInput - The input type for the generateInterviewQuestions function.
 * - GenerateInterviewQuestionsOutput - The return type for the GenerateInterviewQuestions function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateInterviewQuestionsInputSchema = z.object({
  jobRole: z.string().describe('The job role for which to generate interview questions.'),
  experienceLevel: z.string().describe('The experience level of the candidate (e.g., Entry-level, Mid-level, Senior-level).'),
  numQuestions: z.number().default(5).describe('The number of interview questions to generate.'),
});
export type GenerateInterviewQuestionsInput = z.infer<typeof GenerateInterviewQuestionsInputSchema>;

const GenerateInterviewQuestionsOutputSchema = z.object({
  questions: z.array(z.string()).describe('An array of generated interview questions.'),
});
export type GenerateInterviewQuestionsOutput = z.infer<typeof GenerateInterviewQuestionsOutputSchema>;

export async function generateInterviewQuestions(input: GenerateInterviewQuestionsInput): Promise<GenerateInterviewQuestionsOutput> {
  return generateInterviewQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInterviewQuestionsPrompt',
  input: {
    schema: z.object({
      jobRole: z.string().describe('The job role for which to generate interview questions.'),
      experienceLevel: z.string().describe('The experience level of the candidate (e.g., Entry-level, Mid-level, Senior-level).'),
      numQuestions: z.number().default(5).describe('The number of interview questions to generate.'),
      questions: z.array(z.string()).describe('An array of interview questions.'),
    }),
  },
  output: {
    schema: z.object({
      questions: z.array(z.string()).describe('An array of generated interview questions.'),
    }),
  },
  prompt: `You are an AI-powered interview question generator. You will generate {{numQuestions}} interview questions for the job role of {{jobRole}} and the experience level of {{experienceLevel}}. The generated questions should be role-specific and tailored to the experience level. Make sure not to give the same question twice.

Here are the interview questions:
{{#each questions}}
{{@index}}. {{this}}
{{/each}}`,
});

const generateInterviewQuestionsFlow = ai.defineFlow<
  typeof GenerateInterviewQuestionsInputSchema,
  typeof GenerateInterviewQuestionsOutputSchema
>({
  name: 'generateInterviewQuestionsFlow',
  inputSchema: GenerateInterviewQuestionsInputSchema,
  outputSchema: GenerateInterviewQuestionsOutputSchema,
}, async input => {
  const numQuestions = input.numQuestions;
  const questions = Array.from({ length: numQuestions }, (_, i) => `Question ${i + 1}`);

  const {output} = await prompt({
    ...input,
    numQuestions: numQuestions,
    questions: questions,
  });

  return {
    questions: output!.questions,
  };
});
