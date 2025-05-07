import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { FileText, Upload, ArrowRight, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import api from '../api/api';

export default function InputPage() {
  const [input, setInput] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
  
    setLoading(true);
    try {
      const response = await api.post("/query/full", { complaint: input });
      const { case_type } = response.data.parsed_data;
      const { graphs } = response.data.graph_data;
  
      // Save to localStorage
      localStorage.setItem('case_type', case_type);
      localStorage.setItem('input', input);
  
      const strategyNames = Object.keys(graphs);
      localStorage.setItem('strategy_names', JSON.stringify(strategyNames));
  
      // Save each graph under its strategy key
      for (const strategy of strategyNames) {
        localStorage.setItem(`graph_${strategy}`, JSON.stringify(graphs[strategy]));
      }
  
      // Optionally set a default strategy (first one)
      if (strategyNames.length > 0) {
        localStorage.setItem('graph_default', JSON.stringify(graphs[strategyNames[0]]));
      }
  
      navigate('/output');
    } catch (error) {
      console.error('Error processing the complaint:', error);
      alert('Failed to process your complaint. Please try again.');
      setLoading(false);
    }
  };
  

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setInput(reader.result);
      }
    };
    reader.readAsText(file);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-card shadow-elegant rounded-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-foreground">Legal Path Navigator</h1>
            <p className="text-muted-foreground mt-2">Enter your case details to receive expert guidance on the optimal legal pathway.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute left-4 top-4 text-muted-foreground">
                <FileText size={20} />
              </div>
              <Textarea
                className="w-full pl-12 pr-4 py-4 h-60 resize-none"
                placeholder="Enter your case details or paste your legal situation here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <div className="bg-muted rounded-lg border border-border p-4">
              <label className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-2 text-foreground font-medium whitespace-nowrap">
                  <Upload size={18} className="text-muted-foreground" />
                  <span>Or upload a text file:</span>
                </div>
                <div className="flex-grow">
                  <input
                    type="file"
                    accept=".txt,.json,.docx,.pdf"
                    onChange={handleFileUpload}
                    className="w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
                  />
                </div>
              </label>
              {fileName && (
                <div className="mt-3 text-sm text-muted-foreground flex items-center gap-2">
                  <span>Loaded:</span> 
                  <span className="font-medium text-primary">{fileName}</span>
                </div>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className={`w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium py-3 px-6 rounded-lg transition-all ${
                  input.trim() && !loading ? 'hover:bg-primary/90' : 'opacity-60 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Get Legal Recommendation</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-lg p-6">
          <h3 className="font-serif font-medium text-lg text-foreground mb-2">How It Works</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Enter your case details in the text box above or upload a file</li>
            <li>Click "Get Legal Recommendation" to analyze your case</li>
            <li>Review the recommended legal pathway tailored to your situation</li>
            <li>Explore different optimization options for cost, efficiency, risk, and time</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
}
