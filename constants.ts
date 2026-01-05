import { AnalysisResult, StepStatus } from './types';

export const INITIAL_QUERY = "Why did invoice payment #456 fail?";

export const MOCK_ANALYSIS: AnalysisResult = {
  steps: [
    {
      id: 'step-1',
      name: 'Invoice Data Extraction',
      description: 'Extracting amount, vendor, and date from PDF.',
      status: StepStatus.SUCCESS,
      timestamp: '2023-10-27T10:15:00Z',
    },
    {
      id: 'step-2',
      name: 'Vendor Verification',
      description: 'Checking vendor ID against approved list.',
      status: StepStatus.SUCCESS,
      timestamp: '2023-10-27T10:15:02Z',
    },
    {
      id: 'step-3',
      name: 'Compliance Check',
      description: 'Validating spending limits and localized tax policies.',
      status: StepStatus.FAILED,
      timestamp: '2023-10-27T10:15:05Z',
      metadata: {
        'Limit': '$5,000.00',
        'Requested': '$7,500.00'
      }
    },
    {
      id: 'step-4',
      name: 'Payment Execution',
      description: 'Initiating SWIFT transfer via Banking API.',
      status: StepStatus.SKIPPED,
      timestamp: '-',
    },
    {
      id: 'step-5',
      name: 'Ledger Update',
      description: 'Recording transaction in SAP.',
      status: StepStatus.SKIPPED,
      timestamp: '-',
    },
  ],
  rootCause: "Policy Violation: Spending Limit Exceeded",
  explanation: "The agentic workflow was halted at Step 3 (Compliance Check). The extracted invoice amount of $7,500.00 exceeds the pre-configured auto-approval limit of $5,000.00 for this vendor category. No manual override token was found in the context.",
  policyViolation: "policy_v4_spending_limits.json",
  record: {
    workflowId: "wf_892349812_inv_456",
    outcome: "BLOCKED",
    policyHash: "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    decisionHash: "0x12a9f82b7c6d9e0f345a1c2b3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e",
    timestamp: "2023-10-27T10:15:06Z",
    blockHeight: 18459201
  }
};