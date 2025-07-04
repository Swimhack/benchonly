import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Trophy, Users, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-600">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Master the Bench Press
            </h1>
            <p className="mt-3 max-w-md mx-auto text-xl text-blue-100 sm:text-2xl md:mt-5 md:max-w-3xl">
              Join the elite community of bench press specialists and unlock your true strength potential.
            </p>
            <div className="mt-10">
              <Link
                to="/login"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                Start Your Journey
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mb-4">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Expert Programs</h3>
            <p className="mt-2 text-gray-600">
              Access proven 8, 16, and 24-week programs designed for maximum strength gains.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mb-4">
              <Trophy className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Progress Tracking</h3>
            <p className="mt-2 text-gray-600">
              Track your lifts, PRs, and body weight with our intuitive dashboard.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Community</h3>
            <p className="mt-2 text-gray-600">
              Join a community of dedicated lifters and share your journey to strength.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-lg text-gray-600">
              One plan, unlimited gains. Cancel anytime.
            </p>
          </div>

          <div className="mt-12 max-w-lg mx-auto">
            <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <h3 className="text-center text-2xl font-medium text-gray-900">Premium Membership</h3>
                <div className="mt-4 flex justify-center">
                  <span className="px-3 py-1 text-xl leading-6 font-medium text-gray-500">$</span>
                  <span className="text-5xl font-extrabold text-gray-900">50</span>
                  <span className="px-3 py-1 text-xl leading-6 font-medium text-gray-500">/month</span>
                </div>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-center">
                    <Dumbbell className="h-5 w-5 text-blue-600" />
                    <span className="ml-3 text-gray-600">All training programs included</span>
                  </li>
                  <li className="flex items-center">
                    <Trophy className="h-5 w-5 text-blue-600" />
                    <span className="ml-3 text-gray-600">Progress tracking tools</span>
                  </li>
                  <li className="flex items-center">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="ml-3 text-gray-600">Community access</span>
                  </li>
                </ul>
              </div>
              <div className="px-6 py-8 bg-gray-50">
                <Link
                  to="/login"
                  className="block w-full bg-blue-600 text-white text-center px-4 py-3 rounded-md font-medium hover:bg-blue-700"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}