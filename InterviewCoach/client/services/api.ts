import api from '../lib/axios';
import {
  AuthResponse,
  DashboardStats,
  InterviewSession,
  InterviewQuestion,
  InterviewAnswer,
  InterviewReport,
} from '../types';

export const authService = {
  register: async (data: any): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  login: async (data: any): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  getMe: async (): Promise<any> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const sessionService = {
  createSession: async (data: { resume: File; jobDescription: string }): Promise<InterviewSession> => {
    // 1. Upload Resume
    const formData = new FormData();
    formData.append('file', data.resume);
    const resumeResponse = await api.post('/upload-resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const resumeData = resumeResponse.data.resume_data;

    // 2. Analyze Job Description
    const jobResponse = await api.post('/analyze-job', { job_description: data.jobDescription });
    const jobData = jobResponse.data.job_data;

    // 3. Create Session
    const sessionResponse = await api.post('/create-session', {
      resume_data: resumeData,
      job_data: jobData
    });

    return {
      id: sessionResponse.data.session_id,
      status: 'ongoing',
      createdAt: new Date().toISOString()
    };
  },
  getQuestion: async (id: string): Promise<InterviewQuestion> => {
    const response = await api.get(`/session/${id}/question`);
    return response.data;
  },
  submitAnswer: async (id: string, answer: string): Promise<InterviewAnswer> => {
    const response = await api.post(`/session/${id}/answer`, { answer });
    return response.data;
  },
  getReport: async (id: string): Promise<InterviewReport> => {
    const response = await api.get(`/session/${id}/report`);
    const data = response.data;
    return {
      sessionId: id,
      overallScore: data.overall_score || 0,
      feedback: data.recommendation || "", // backend uses recommendation
      strengths: data.strengths || [],
      weaknesses: data.weaknesses || [],
      qna: data.qna || []
    };
  },
  getPdf: async (id: string): Promise<Blob> => {
    const response = await api.get(`/session/${id}/pdf`, { responseType: 'blob' });
    return response.data;
  },
};

export const dataService = {
  getDashboard: async (): Promise<DashboardStats> => {
    const response = await api.get('/dashboard');
    const data = response.data;
    return {
      totalInterviews: data.total_interviews || 0,
      completedInterviews: data.completed_interviews || 0,
      ongoingInterviews: data.ongoing_interviews || 0,
      averageScore: data.average_score || 0,
      highestScore: data.highest_score || 0,
      lowestScore: data.lowest_score || 0,
      recentScores: data.recent_scores || []
    };
  },
  getHistory: async (): Promise<InterviewSession[]> => {
    const response = await api.get('/history');
    return response.data.history.map((session: any) => ({
      id: session.session_id,
      status: session.status,
      createdAt: session.created_at,
      overallScore: session.overall_score
    }));
  },
};
