import React from 'react';
import { Check, X, Circle, Minus } from 'lucide-react';
import { WorkflowStep, StepStatus } from '../types';

interface TimelineProps {
  steps: WorkflowStep[];
  isLoading?: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({ steps, isLoading }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 h-full">
      <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-6">Execution Timeline</h3>
      
      {isLoading ? (
        <div className="space-y-4 animate-pulse">
           {[1, 2, 3].map(i => (
             <div key={i} className="h-12 bg-zinc-800/50 rounded w-full"></div>
           ))}
        </div>
      ) : (
        <div className="relative pl-2">
          {/* Vertical Line */}
          <div className="absolute left-[19px] top-2 bottom-6 w-px bg-zinc-800 z-0"></div>

          <div className="space-y-8 relative z-10">
            {steps.map((step, index) => {
              let Icon = Circle;
              let colorClass = "text-zinc-600 bg-zinc-900 border-zinc-700";
              let textClass = "text-zinc-500";
              
              if (step.status === StepStatus.SUCCESS) {
                Icon = Check;
                colorClass = "text-black bg-white border-white";
                textClass = "text-white";
              } else if (step.status === StepStatus.FAILED) {
                Icon = X;
                colorClass = "text-white bg-red-600 border-red-600";
                textClass = "text-red-500";
              } else if (step.status === StepStatus.SKIPPED) {
                Icon = Minus;
                colorClass = "text-zinc-600 bg-zinc-900 border-zinc-800";
                textClass = "text-zinc-600";
              }

              return (
                <div key={step.id} className="flex gap-4 group">
                  <div className={`
                    w-10 h-10 rounded-full border-2 flex-shrink-0 flex items-center justify-center 
                    transition-all duration-300 ${colorClass}
                  `}>
                    <Icon size={16} strokeWidth={3} />
                  </div>
                  
                  <div className="flex-1 pt-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className={`font-medium text-base ${step.status === StepStatus.FAILED ? 'text-white' : 'text-zinc-300'}`}>
                          {step.name}
                        </h4>
                        <p className="text-sm text-zinc-500 mt-1 max-w-sm">{step.description}</p>
                        
                        {/* Specific metadata for failure context */}
                        {step.status === StepStatus.FAILED && step.metadata && (
                           <div className="mt-3 bg-red-500/10 border border-red-500/20 rounded p-3 font-mono text-xs text-red-200">
                              {Object.entries(step.metadata).map(([key, val]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="opacity-70">{key}:</span>
                                  <span>{val}</span>
                                </div>
                              ))}
                           </div>
                        )}
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-bold px-2 py-1 rounded border ${
                          step.status === StepStatus.FAILED 
                            ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                            : step.status === StepStatus.SUCCESS
                              ? 'bg-zinc-800 text-zinc-400 border-zinc-700'
                              : 'bg-transparent text-zinc-700 border-transparent'
                        }`}>
                          {step.status}
                        </span>
                        {step.timestamp !== '-' && (
                          <div className="text-xs text-zinc-600 font-mono mt-2">{step.timestamp.split('T')[1].replace('Z','')}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};