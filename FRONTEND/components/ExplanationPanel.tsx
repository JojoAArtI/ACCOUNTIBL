import React from 'react';
import { Bot, AlertTriangle, FileText } from 'lucide-react';
import { AnalysisResult } from '../types';

interface ExplanationPanelProps {
  data: AnalysisResult | null;
  isLoading?: boolean;
}

export const ExplanationPanel: React.FC<ExplanationPanelProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 h-64 flex items-center justify-center">
         <div className="flex items-center gap-3 text-zinc-500">
            <Bot className="animate-bounce" />
            <span className="animate-pulse">Agent is analyzing accountability ledger...</span>
         </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-zinc-800 flex items-center gap-3 bg-zinc-900">
        <Bot className="text-zinc-100" size={20} />
        <h3 className="font-semibold text-white">Agent Root-Cause Analysis</h3>
      </div>
      
      <div className="p-6 space-y-6">
        <div>
           <div className="flex items-center gap-2 text-red-400 mb-2">
             <AlertTriangle size={16} />
             <span className="text-sm font-semibold tracking-wide uppercase">Primary Failure Reason</span>
           </div>
           <p className="text-lg text-white font-medium leading-relaxed">
             {data.rootCause}
           </p>
        </div>

        <div className="prose prose-invert prose-sm max-w-none text-zinc-400 border-l-2 border-zinc-700 pl-4">
           <p>{data.explanation}</p>
        </div>

        {data.policyViolation && (
          <div className="flex items-center gap-3 bg-zinc-950 p-3 rounded border border-zinc-800">
            <FileText size={16} className="text-zinc-500" />
            <div className="flex flex-col">
               <span className="text-xs text-zinc-500 uppercase">Blocking Policy</span>
               <span className="text-sm text-zinc-300 font-mono">{data.policyViolation}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};