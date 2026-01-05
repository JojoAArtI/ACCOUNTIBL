export enum StepStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  SKIPPED = 'SKIPPED',
  PENDING = 'PENDING',
}

export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  status: StepStatus;
  timestamp: string;
  metadata?: Record<string, string>;
}

export interface AccountabilityRecord {
  workflowId: string;
  outcome: 'ALLOWED' | 'BLOCKED' | 'FAILED';
  policyHash: string;
  decisionHash: string;
  timestamp: string;
  blockHeight: number;
}

export interface AnalysisResult {
  steps: WorkflowStep[];
  rootCause: string;
  explanation: string;
  policyViolation?: string;
  record: AccountabilityRecord;
}