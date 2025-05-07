//Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';
import ThemeToggle from './theme/ThemeToggle';

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/get-started" className="flex items-center gap-2">
              <Scale className="h-8 w-8 text-primary" />
              <span className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100">Legal Path Navigator</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link 
              to="/input" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Enter Case Details
            </Link>
            <Link 
              to="/get-started" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Get Started
            </Link>
            <a 
              href="#" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              About
            </a>
            <a 
              href="#" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Contact
            </a>
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
