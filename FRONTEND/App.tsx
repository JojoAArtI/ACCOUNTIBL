import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Activity } from 'lucide-react';
import { Header } from './components/Header';
import { Timeline } from './components/Timeline';
import { ExplanationPanel } from './components/ExplanationPanel';
import { AccountabilityRecord } from './components/AccountabilityRecord';
import { MOCK_ANALYSIS, INITIAL_QUERY } from './constants';
import { AnalysisResult } from './types';

export default function App() {
  const [query, setQuery] = useState(INITIAL_QUERY);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // Simulate initial load to show the "Analysis" feeling
  useEffect(() => {
    handleAnalysis();
  }, []);

  const handleAnalysis = () => {
    if (!query) return;
    
    setIsAnalyzing(true);
    setResult(null);

    // Simulate network/agent delay
    setTimeout(() => {
      setResult(MOCK_ANALYSIS);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAnalysis();
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-zinc-800">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Intro / Query Section */}
        <div className="mb-12 max-w-3xl">
          <h1 className="text-4xl font-light tracking-tight text-white mb-4">
            Workflow Intelligence & Accountability
          </h1>
          <p className="text-zinc-400 mb-8">
            Query the decentralized ledger to analyze agent behavior, verify policy adherence, and audit workflow failures.
          </p>

          <div className="relative group">
             <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="text-zinc-500 group-focus-within:text-white transition-colors" size={20} />
             </div>
             <input
               type="text"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               onKeyDown={handleKeyDown}
               placeholder="Describe the workflow issue (e.g., 'Why did payment #X fail?')"
               className="w-full bg-zinc-900 border border-zinc-800 text-white pl-12 pr-12 py-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-all text-lg shadow-2xl placeholder:text-zinc-600"
             />
             <button 
               onClick={handleAnalysis}
               disabled={isAnalyzing}
               className="absolute right-3 top-3 bg-zinc-800 hover:bg-zinc-700 p-2 rounded text-white transition-colors disabled:opacity-50"
             >
                {isAnalyzing ? <Activity className="animate-spin" size={20} /> : <ArrowRight size={20} />}
             </button>
          </div>
          <div className="mt-3 flex gap-4 text-xs text-zinc-500 font-mono">
             <span>PROMPT: NATURAL LANGUAGE</span>
             <span className="text-zinc-700">|</span>
             <span>MODEL: GEMINI-PRO-AUDIT-V2</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Timeline */}
          <div className="lg:col-span-5">
             <Timeline steps={result?.steps || []} isLoading={isAnalyzing} />
          </div>

          {/* Right Column: Analysis & Record */}
          <div className="lg:col-span-7 space-y-6">
             <ExplanationPanel data={result} isLoading={isAnalyzing} />
             
             {!isAnalyzing && result && (
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards">
                 <AccountabilityRecord record={result.record} />
               </div>
             )}
          </div>

        </div>
      </main>
      
      {/* Footer / Legal */}
      <footer className="border-t border-zinc-900 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-xs text-zinc-600">
           <div>&copy; 2024 Enterprise Accountability Layer. All rights reserved.</div>
           <div className="font-mono">SYSTEM STATUS: OPERATIONAL</div>
        </div>
      </footer>
    </div>
  );
}