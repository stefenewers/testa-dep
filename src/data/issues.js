export const issuesData = [
  {
    id: 'ISSUE-001',
    type: 'AGENT_TASK_FAILURE',
    typeCls: 'type-agent',
    severity: 'High',
    sevCls: 'sev-high',
    loanId: 'APP-1041',
    borrower: 'Marcus Webb',
    openSince: '47 minutes',
    title: 'Liability linking agent failed - no mortgage statement found',
    status: 'open'
  },
  {
    id: 'ISSUE-002',
    type: 'RULE_MISFIRE',
    typeCls: 'type-rule',
    severity: 'High',
    sevCls: 'sev-high',
    loanId: 'APP-1042',
    borrower: 'Diana Chen',
    openSince: '2 hours 14 minutes',
    title: 'Social security income not grossed up - qualified income understated',
    status: 'open'
  },
  {
    id: 'ISSUE-003',
    type: 'CONDITION_NOT_SATISFIED',
    typeCls: 'type-cond',
    severity: 'Medium',
    sevCls: 'sev-med',
    loanId: 'APP-1043',
    borrower: 'James Okafor',
    openSince: '31 minutes',
    title: 'Employment LOE uploaded but condition remains open',
    status: 'open'
  },
  {
    id: 'ISSUE-004',
    type: 'DOC_INTELLIGENCE_FAILURE',
    typeCls: 'type-doc',
    severity: 'Medium',
    sevCls: 'sev-med',
    loanId: 'APP-1043',
    borrower: 'James Okafor',
    openSince: '2 hours 3 minutes',
    title: 'Bank statement uploaded 2 hours ago - still unclassified',
    status: 'open'
  },
  {
    id: 'ISSUE-005',
    type: 'MISSING_CONDITION',
    typeCls: 'type-miss',
    severity: 'Medium',
    sevCls: 'sev-med',
    loanId: 'APP-1044',
    borrower: 'Sofia Reyes',
    openSince: '58 minutes',
    title: 'Agent missed $12,500 deposit - condition never created',
    status: 'open'
  },
  {
    id: 'ISSUE-006',
    type: 'INTEGRATION_TIMEOUT',
    typeCls: 'type-int',
    severity: 'High',
    sevCls: 'sev-high',
    loanId: 'APP-1046',
    borrower: 'Priya Nair',
    openSince: '4 hours 22 minutes',
    title: 'AUS did not run after intent to proceed recorded',
    status: 'open'
  }
];

export const pipelineLoans = [
  { id: 'APP-1041', borrower: 'Marcus Webb', stage: 'Processing', amount: '$420,000', closing: '06/15/2026', tasks: 4, issues: 1 },
  { id: 'APP-1042', borrower: 'Diana Chen', stage: 'Underwriting', amount: '$275,000', closing: '07/01/2026', tasks: 2, issues: 1 },
  { id: 'APP-1043', borrower: 'James Okafor', stage: 'Processing', amount: '$550,000', closing: '06/28/2026', tasks: 6, issues: 2 },
  { id: 'APP-1044', borrower: 'Sofia Reyes', stage: 'Underwriting', amount: '$310,000', closing: '07/15/2026', tasks: 3, issues: 1 },
  { id: 'APP-1045', borrower: 'Trevor Holt', stage: 'Pre-closing', amount: '$189,000', closing: '06/01/2026', tasks: 1, issues: 0 },
  { id: 'APP-1046', borrower: 'Priya Nair', stage: 'Application', amount: '$640,000', closing: '08/01/2026', tasks: 2, issues: 1 }
];
