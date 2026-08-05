export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user?: User;
}

export interface DashboardStats {
  totalInterviews: number;
  completedInterviews: number;
  ongoingInterviews: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  recentScores: { date: string; score: number }[];
}

export interface InterviewSession {
  id: string;
  status: 'ongoing' | 'completed';
  createdAt: string;
  jobDescription?: string;
  resumeMatchScore?: number;
  overallScore?: number;
}

export interface InterviewQuestion {
  id: string;
  sessionId: string;
  questionText: string;
  order: number;
}

export interface InterviewAnswer {
  questionId: string;
  answerText: string;
  aiScore: number;
  aiFeedback: string;
  strengths: string[];
  weaknesses: string[];
}

export interface InterviewReport {
  sessionId: string;
  overallScore: number;
  feedback: string;
  strengths: string[];
  weaknesses: string[];
  qna: {
    question: InterviewQuestion;
    answer: InterviewAnswer;
    idealAnswer: string;
  }[];
}
