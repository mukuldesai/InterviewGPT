// This file analyzes voice input, transcribing it and providing feedback on confidence levels and filler word usage.
'use server';
/**
 * @fileOverview Analyzes voice input for interview practice, providing transcription,
 * confidence level analysis, and filler word detection.
 *
 * - analyzeVoiceInput - A function that analyzes voice input.
 * - AnalyzeVoiceInputInput - The input type for the analyzeVoiceInput function.
 * - AnalyzeVoiceInputOutput - The return type for the analyzeVoiceInput function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnalyzeVoiceInputInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "A audio file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeVoiceInputInput = z.infer<typeof AnalyzeVoiceInputInputSchema>;

const AnalyzeVoiceInputOutputSchema = z.object({
  transcription: z.string().describe('The transcription of the audio input.'),
  confidenceLevel: z
    .number()
    .describe('A score (0-1) indicating the confidence level in the speech.'),
  fillerWordCount: z
    .number()
    .describe('The number of filler words (e.g., um, ah) used in the speech.'),
  feedback: z.string().describe('Feedback on the voice input.'),
});
export type AnalyzeVoiceInputOutput = z.infer<typeof AnalyzeVoiceInputOutputSchema>;

export async function analyzeVoiceInput(input: AnalyzeVoiceInputInput): Promise<AnalyzeVoiceInputOutput> {
  return analyzeVoiceInputFlow(input);
}

const analyzeVoiceInputPrompt = ai.definePrompt({
  name: 'analyzeVoiceInputPrompt',
  input: {
    schema: z.object({
      audioDataUri: z
        .string()
        .describe(
          "A audio file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
        ),
    }),
  },
  output: {
    schema: z.object({
      transcription: z.string().describe('The transcription of the audio input.'),
      confidenceLevel: z
        .number()
        .describe('A score (0-1) indicating the confidence level in the speech.'),
      fillerWordCount: z
        .number()
        .describe('The number of filler words (e.g., um, ah) used in the speech.'),
      feedback: z.string().describe('Feedback on the voice input.'),
    }),
  },
  prompt: `You are an AI voice analyst specializing in interview preparation.

You will be given an audio recording of a user's speech during a mock interview.
Your task is to transcribe the speech, assess the speaker's confidence level, count the number of filler words used, and provide constructive feedback.

Analyze the following audio:

{{media url=audioDataUri}}

Transcription:
{{output.transcription}}

Confidence Level (0-1):
{{output.confidenceLevel}}

Filler Word Count:
{{output.fillerWordCount}}

Feedback:
{{output.feedback}}`,
});

const analyzeVoiceInputFlow = ai.defineFlow<
  typeof AnalyzeVoiceInputInputSchema,
  typeof AnalyzeVoiceInputOutputSchema
>(
  {
    name: 'analyzeVoiceInputFlow',
    inputSchema: AnalyzeVoiceInputInputSchema,
    outputSchema: AnalyzeVoiceInputOutputSchema,
  },
  async input => {
    const {output} = await analyzeVoiceInputPrompt(input);
    return output!;
  }
);
