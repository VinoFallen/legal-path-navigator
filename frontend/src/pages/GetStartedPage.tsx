//path: src/pages/GetStartedPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Scale, ArrowRight, Book, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GetStartedPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 shadow-elegant rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-shrink-0">
              <Scale className="h-24 w-24 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-serif font-bold text-gray-800 dark:text-gray-100 mb-4">Legal Path Navigator</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                Your AI-powered guide through complex legal situations, optimized for the best possible outcomes.
              </p>
              <Link to="/input">
                <Button className="flex items-center gap-2">
                  Start Using Now <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full w-fit">
              <Book className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-serif font-medium text-gray-800 dark:text-gray-100 mb-2">Expert Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our system analyzes your legal situation using advanced AI technology to identify the most optimal pathway.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full w-fit">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-serif font-medium text-gray-800 dark:text-gray-100 mb-2">Risk Assessment</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get detailed risk assessments for different legal approaches and make informed decisions.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full w-fit">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-serif font-medium text-gray-800 dark:text-gray-100 mb-2">Time Optimization</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Save time with our optimized pathways that help you navigate legal processes efficiently.
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-elegant rounded-xl p-8">
          <h2 className="text-2xl font-serif font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">How to Get Started</h2>
          
          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-shrink-0 bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-1">Enter your case details</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Provide as much information as possible about your legal situation on the input page.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-1">Review analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our system will analyze your case and provide recommendations based on different optimization goals.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-1">Choose your pathway</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Select from various optimization options such as cost-efficiency, risk minimization, or time-saving routes.
                </p>
              </div>
            </div>
            
            <div className="pt-6 text-center">
              <Link to="/input">
                <Button size="lg" className="gap-2">
                  Begin Your Legal Analysis <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
