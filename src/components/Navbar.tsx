import React from 'react';
import { Link } from 'react-router-dom';
import { User, Menu } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import logoImage from '../assets/images/logo.png';

export default function Navbar() {
  const { user, signOut } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20"> {/* Increased height */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src={logoImage}
                alt="BenchOnly.com" 
                className="h-16 w-auto py-1" // Increased height to 4rem (64px)
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6"> {/* Increased spacing */}
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">
                  Dashboard
                </Link>
                <Link to="/programs" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">
                  Programs
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">
                  Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-medium transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-medium transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-2 pb-3 space-y-2 border-t border-gray-200">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                >
                  Dashboard
                </Link>
                <Link
                  to="/programs"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                >
                  Programs
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                >
                  Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}