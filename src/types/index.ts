export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Profile {
  user_id: string;
  bench_max: number;
  training_days: string[];
  goals: string;
  current_program?: string;
  subscription_status: 'active' | 'inactive' | 'trial';
}

export interface Program {
  id: string;
  title: string;
  duration_weeks: number;
  pdf_url: string;
  description: string;
}

export interface TrainingLog {
  id: string;
  user_id: string;
  date: string;
  bench_weight: number;
  reps: number;
  rpe: number;
  notes?: string;
}