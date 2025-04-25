'use server';
/**
 * @fileOverview A resume optimization AI agent.
 *
 * - optimizeResume - A function that handles the resume optimization process.
 * - OptimizeResumeInput - The input type for the optimizeResume function.
 * - OptimizeResumeOutput - The return type for the optimizeResume function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const OptimizeResumeInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "A resume file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  jobDescription: z.string().describe('The job description to tailor the resume to.'),
});
export type OptimizeResumeInput = z.infer<typeof OptimizeResumeInputSchema>;

const OptimizeResumeOutputSchema = z.object({
  atsCompatibilityScore: z
    .number()
    .describe('The overall ATS compatibility score (0-100).'),
  suggestions: z.array(z.string()).describe('Suggestions for improvement.'),
  tailoredSummary: z.string().describe('A tailored professional summary.'),
});
export type OptimizeResumeOutput = z.infer<typeof OptimizeResumeOutputSchema>;

export async function optimizeResume(
  input: OptimizeResumeInput
): Promise<OptimizeResumeOutput> {
  return optimizeResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeResumePrompt',
  input: {
    schema: z.object({
      resumeDataUri: z
        .string()
        .describe(
          "A resume file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
        ),
      jobDescription: z.string().describe('The job description to tailor the resume to.'),
    }),
  },
  output: {
    schema: z.object({
      atsCompatibilityScore: z
        .number()
        .describe('The overall ATS compatibility score (0-100).'),
      suggestions: z.array(z.string()).describe('Suggestions for improvement.'),
      tailoredSummary: z.string().describe('A tailored professional summary.'),
    }),
  },
  prompt: `You are an expert resume optimizer specializing in ATS optimization.

You will use this information to optimize the resume for ATS compatibility, and to suggest a tailored professional summary.

Analyze the resume to identify areas for improvement in ATS compatibility, including keyword matching, formatting, and section headers.

Resume: {{media url=resumeDataUri}}
Job Description: {{{jobDescription}}}

Provide an overall ATS compatibility score (0-100), suggestions for improvement, and a tailored professional summary.

Format suggestions as a list.
`,
});

const optimizeResumeFlow = ai.defineFlow<
  typeof OptimizeResumeInputSchema,
  typeof OptimizeResumeOutputSchema
>(
  {
    name: 'optimizeResumeFlow',
    inputSchema: OptimizeResumeInputSchema,
    outputSchema: OptimizeResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
