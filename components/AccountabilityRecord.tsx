import React from 'react';
import { Fingerprint, Lock, Link, Clock } from 'lucide-react';
import { AccountabilityRecord as RecordType } from '../types';

interface AccountabilityRecordProps {
  record: RecordType | undefined;
  isLoading?: boolean;
}

export const AccountabilityRecord: React.FC<AccountabilityRecordProps> = ({ record, isLoading }) => {
  if (isLoading || !record) return null;

  return (
    <div className="mt-6 border border-zinc-800 rounded-lg overflow-hidden bg-black relative">
       {/* Decorative top bar */}
       <div className="h-1 w-full bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800 opacity-20"></div>

       <div className="p-6">
          <div className="flex justify-between items-start mb-6">
             <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Lock size={14} />
                  On-Chain Accountability Record
                </h3>
                <span className="text-xs text-zinc-600">Immutable commitment stored on Ethereum Mainnet</span>
             </div>
             <div className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-400 font-mono">
                Block #{record.blockHeight}
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <RecordField 
                label="Workflow ID" 
                value={record.workflowId} 
                icon={<Fingerprint size={14} />} 
             />
             <RecordField 
                label="Outcome" 
                value={record.outcome} 
                valueClass={record.outcome === 'BLOCKED' ? 'text-red-500' : 'text-emerald-500'}
             />
             <RecordField 
                label="Policy Version Hash" 
                value={record.policyHash} 
                isHash 
                icon={<Link size={14} />}
             />
             <RecordField 
                label="Agent Decision Hash" 
                value={record.decisionHash} 
                isHash 
                icon={<Link size={14} />}
             />
             <RecordField 
                label="Timestamp" 
                value={record.timestamp} 
                icon={<Clock size={14} />}
             />
          </div>
       </div>

       {/* Watermark effect */}
       <div className="absolute -bottom-6 -right-6 opacity-5 pointer-events-none">
          <Fingerprint size={150} />
       </div>
    </div>
  );
};

const RecordField: React.FC<{ label: string; value: string; isHash?: boolean; valueClass?: string; icon?: React.ReactNode }> = ({ 
  label, value, isHash, valueClass = "text-zinc-200", icon 
}) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs text-zinc-500 font-medium uppercase flex items-center gap-1.5">
       {icon} {label}
    </span>
    <span className={`font-mono text-sm break-all ${valueClass} ${isHash ? 'text-xs' : ''}`}>
      {value}
    </span>
  </div>
);