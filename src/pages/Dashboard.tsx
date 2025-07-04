import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Calendar, ChevronRight, Dumbbell } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import type { Profile, TrainingLog } from '../types';

export default function Dashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [recentLogs, setRecentLogs] = useState<TrainingLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    async function loadDashboardData() {
      try {
        const [profileData, logsData] = await Promise.all([
          supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single(),
          supabase
            .from('training_logs')
            .select('*')
            .eq('user_id', user.id)
            .order('date', { ascending: false })
            .limit(5)
        ]);

        if (profileData.data) {
          setProfile(profileData.data);
        }
        if (logsData.data) {
          setRecentLogs(logsData.data);
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {profile?.full_name || 'Lifter'}
          </h1>
          <p className="mt-2 text-gray-600">
            Current Bench Max: {profile?.bench_max || 'Not set'} lbs
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/programs')}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <Dumbbell className="h-5 w-5 text-blue-600 mr-3" />
                  <span>View Training Programs</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                  <span>Update Training Schedule</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            {recentLogs.length > 0 ? (
              <div className="space-y-4">
                {recentLogs.map((log) => (
                  <div key={log.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <Activity className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {log.bench_weight} lbs × {log.reps} reps
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(log.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}