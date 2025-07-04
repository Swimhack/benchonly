/*
  # Initial Schema for BenchOnly.com Platform

  1. New Tables
    - `profiles`
      - User profile information including bench max, goals, and subscription status
    - `programs`
      - Training programs available to members
    - `training_logs`
      - User's training history and progress
    - `subscriptions`
      - User subscription status and payment info

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Add policies for public access to program information
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  bench_max integer,
  training_days text[] DEFAULT ARRAY[]::text[],
  goals text,
  current_program uuid,
  subscription_status text DEFAULT 'inactive',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Programs table
CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  duration_weeks integer NOT NULL,
  pdf_url text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active programs"
  ON programs FOR SELECT
  USING (is_active = true);

-- Training logs table
CREATE TABLE IF NOT EXISTS training_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  date date DEFAULT CURRENT_DATE,
  bench_weight integer NOT NULL,
  reps integer NOT NULL,
  rpe integer,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE training_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own training logs"
  ON training_logs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own training logs"
  ON training_logs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text DEFAULT 'inactive',
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Functions and Triggers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();