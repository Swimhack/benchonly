import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import type { Profile } from '../types';

const TRAINING_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function Profile() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    user_id: '',
    bench_max: 0,
    training_days: [],
    goals: '',
    subscription_status: 'inactive',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    async function loadProfile() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        if (data) {
          setProfile({
            ...data,
            user_id: user.id,
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          bench_max: profile.bench_max,
          training_days: profile.training_days,
          goals: profile.goals,
        })
        .eq('id', user.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const toggleTrainingDay = (day: string) => {
    setProfile((prev) => ({
      ...prev,
      training_days: prev.training_days.includes(day)
        ? prev.training_days.filter((d) => d !== day)
        : [...prev.training_days, day],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">Profile Settings</h1>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Bench Max */}
            <div>
              <label htmlFor="bench_max" className="block text-sm font-medium text-gray-700">
                Current Bench Max (lbs)
              </label>
              <input
                type="number"
                id="bench_max"
                value={profile.bench_max}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, bench_max: parseInt(e.target.value) || 0 }))
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            {/* Training Days */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Training Days
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {TRAINING_DAYS.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleTrainingDay(day)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      profile.training_days.includes(day)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Goals */}
            <div>
              <label htmlFor="goals" className="block text-sm font-medium text-gray-700">
                Training Goals
              </label>
              <textarea
                id="goals"
                rows={4}
                value={profile.goals}
                onChange={(e) => setProfile((prev) => ({ ...prev, goals: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="What are your bench press goals?"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}