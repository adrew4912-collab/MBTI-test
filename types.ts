export enum Dimension {
  EI = 'Extraversion vs Introversion',
  SN = 'Sensing vs Intuition',
  TF = 'Thinking vs Feeling',
  JP = 'Judging vs Perceiving',
}

export type DimensionKey = 'EI' | 'SN' | 'TF' | 'JP';

export interface Question {
  id: number;
  text: string;
  dimension: DimensionKey;
  optionA: string; // Corresponds to E, S, T, J
  optionB: string; // Corresponds to I, N, F, P
}

export interface UserResponse {
  questionId: number;
  answer: 'A' | 'B';
}

export interface MBTIScore {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

export interface FinalResult {
  type: string;
  scores: MBTIScore;
  report: string; // Markdown content from Gemini
}
