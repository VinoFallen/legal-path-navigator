//Footer.tsx
import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              &copy; {currentYear} Legal Path Navigator Pro. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
