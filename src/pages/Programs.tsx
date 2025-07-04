import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Lock } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import type { Program } from '../types';

export default function Programs() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    async function loadPrograms() {
      try {
        const [programsData, subscriptionData] = await Promise.all([
          supabase.from('programs').select('*').order('duration_weeks'),
          supabase
            .from('subscriptions')
            .select('status')
            .eq('user_id', user.id)
            .single(),
        ]);

        if (programsData.data) {
          setPrograms(programsData.data);
        }

        setHasSubscription(subscriptionData.data?.status === 'active');
      } catch (error) {
        console.error('Error loading programs:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPrograms();
  }, [user, navigate]);

  const handleDownload = (program: Program) => {
    if (!hasSubscription) {
      navigate('/login?subscribe=true');
      return;
    }
    window.open(program.pdf_url, '_blank');
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Training Programs</h1>
          <p className="mt-4 text-lg text-gray-600">
            Choose from our proven bench press programs designed for maximum strength gains
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{program.title}</h3>
                <p className="mt-2 text-gray-600">{program.description}</p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <span className="font-medium">{program.duration_weeks} weeks</span>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={() => handleDownload(program)}
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {hasSubscription ? (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Subscribe to Access
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}