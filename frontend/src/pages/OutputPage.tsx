// path: src/pages/OutputPage.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { MermaidDiagram } from '@lightenna/react-mermaid-diagram';

type PathwayOption = 'cost' | 'efficiency' | 'risk' | 'time';

const storageKeyMap: Record<PathwayOption, string> = {
  cost: 'graph_low_cost',
  efficiency: 'graph_high_efficiency',
  risk: 'graph_low_risk',
  time: 'graph_fast_resolution'
};

export default function OutputPage(): JSX.Element {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState<PathwayOption>('efficiency');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [caseType, setCaseType] = useState('');
  const [summary, setSummary] = useState('');
  const [graphData, setGraphData] = useState<any>(null);

  useEffect(() => {
    const inp = state?.input || localStorage.getItem('input') || '';
    const ct = localStorage.getItem('case_type') || '';
    const sm = localStorage.getItem('summary') || '';
    setInputText(inp);
    setCaseType(ct);
    setSummary(sm);

    const raw = localStorage.getItem(storageKeyMap[selectedOption]);
    setGraphData(raw ? JSON.parse(raw) : null);
  }, [state, selectedOption]);

  if (!inputText) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">No Case Data Found</h2>
          <p className="mb-6">Please return to the home page and submit your case details.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary/90"
          >
            Return Home
          </button>
        </div>
      </Layout>
    );
  }

  const buildDiagram = () => {
    if (!graphData || !graphData.nodes || !graphData.edges) return 'flowchart TD; A[No data]';
    const lines = ['flowchart TD'];

    const nodeIds: Record<string, string> = {};
    graphData.nodes.forEach((label, index) => {
      const id = `N${index}`;
      nodeIds[label] = id;
      lines.push(`  ${id}["${label}"]`);
    });

    graphData.edges.forEach((e: { from: string; to: string; cost_rupees: number; time_days: number }) => {
      const fromId = nodeIds[e.from] || e.from.replace(/\s+/g, '_');
      const toId = nodeIds[e.to] || e.to.replace(/\s+/g, '_');
      const label = `${e.time_days}d, ₹${e.cost_rupees}`;
      lines.push(`  ${fromId} -->|${label}| ${toId}`);
    });

    return lines.join('\n');
  };

  const diagram = buildDiagram();
  const pathwayOptions: PathwayOption[] = ['cost', 'efficiency', 'risk', 'time'];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white shadow-elegant rounded-xl p-8">
          {/* Header & dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold text-gray-800">Your Legal Pathway</h2>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(o => !o)}
                className="flex items-center justify-between w-full sm:w-56 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-800"
              >
                {selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)} Optimization
                {isDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-1 w-full sm:w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {pathwayOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSelectedOption(opt);
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left hover:bg-gray-50 ${
                        selectedOption === opt ? 'bg-blue-50 text-primary' : 'text-gray-700'
                      }`}
                    >
                      {opt.charAt(0).toUpperCase() + opt.slice(1)} Optimization
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Case Info */}
          <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Showing optimized legal pathway based on: {selectedOption}
          </h3>
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 mb-6">
            <h4 className="text-xs uppercase text-gray-500 mb-1">Case Type</h4>
            <p className="text-sm text-gray-700 mb-4">{caseType}</p>
            <h4 className="text-xs uppercase text-gray-500 mb-1">Input Summary</h4>
            <pre className="whitespace-pre-wrap text-gray-700 text-sm mb-4">{inputText}</pre>
            <h4 className="text-xs uppercase text-gray-500 mb-1">Generated Case Summary</h4>
            <p className="text-sm text-gray-700">{summary}</p>
          </div>

          {/* Mermaid Diagram */}
          <div className="flex items-center justify-center mb-6">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white p-4 border border-gray-200 rounded-lg w-full overflow-auto">
              <MermaidDiagram>{diagram}</MermaidDiagram>
            </div>
          </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-gray-100 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-200"
            >
              Go Back
            </button>
            <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
              Save Recommendation
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-2 bg-gray-100 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-200"
            >
              Print Report
            </button>
          </div>
        </div>

        {/* Next Steps & Resources */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-blue-950 border rounded-lg shadow-sm">
            <h3 className="font-serif text-lg mb-2 text-white">Next Steps</h3>
            <ul className="list-disc list-inside text-sm space-y-2 text-white">
              <li>Schedule a consultation with a specialized attorney</li>
              <li>Gather supporting documentation for your case</li>
              <li>Review potential timeline and cost estimates</li>
              <li>Prepare for initial legal proceedings</li>
            </ul>
          </div>
          <div className="p-6 bg-blue-950 border rounded-lg shadow-sm">
            <h3 className="font-serif text-lg mb-2 text-white">Legal Resources</h3>
            <ul className="space-y-2 text-sm text-white">
              <li><a href="#" className="text-primary hover:underline">Download Legal Analysis PDF</a></li>
              <li><a href="#" className="text-primary hover:underline">Case Precedent References</a></li>
              <li><a href="#" className="text-primary hover:underline">Applicable Statutes & Regulations</a></li>
              <li><a href="#" className="text-primary hover:underline">Find an Attorney Near You</a></li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
