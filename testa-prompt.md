# Testa — Claude Code Build Prompt (React)

Build a React application called **Testa** — a loan origination system triage and training tool that simulates the internal environment used by a Technical Product Analyst at an AI-native LOS called Vesta. This is an interview portfolio project.

---

## Setup

```bash
npm create vite@latest testa -- --template react
cd testa
npm install
npm run dev
```

All source code goes in `src/`. Place `testa.png` in the `public/` directory and reference it in JSX as `<img src="/testa.png" alt="Testa" />`.

---

## What Testa Is

Testa simulates the internal environment of Vesta, an AI-native Loan Origination System. Vesta blends deterministic rules, configurable workflow automation, and autonomous AI agents to process mortgage loans. When a loan is created, the system kicks off automations — ordering credit, running compliance monitoring, pulling closing costs. AI agents then run tasks in parallel: linking liabilities to properties, calculating qualified income from pay stubs, reviewing bank statements for large deposits, making initial underwriting evaluations. Every action is logged. Documents are auto-classified by Doc Intelligence. Third-party integrations (Equifax, Argyle, AUS, appraisal, flood, title) are ordered automatically.

A Technical Product Analyst lives inside this system. When something breaks — an agent task fails, a document is not classified, a service times out, a condition does not auto-satisfy, a rule fires incorrectly — they are the first responders. They investigate using audit trails, agent logs, loan data, and system state. They distinguish between borrower data problems, rule configuration issues, agent logic failures, and infrastructure errors. They resolve what they can and escalate what they cannot.

Testa simulates that environment with real scenarios to investigate and resolve.

---

## Visual Design

Match Vesta's real UI language precisely:

- **Background:** White `#ffffff` for content areas. Light gray `#f5f5f5` for sidebar and page ground.
- **Primary accent:** Indigo `#4F46E5` for links, active nav states, primary buttons, stage pills, highlighted metric values. Not blue, not teal — specifically this indigo-purple.
- **Status colors:** Red `#dc2626` for failures/errors. Amber `#d97706` for warnings. Green `#16a34a` for success/completed. Use sparingly — only for actual status signals.
- **Typography:** Inter from Google Fonts. Body text 13px, tight line-height.
- **Left sidebar:** 48px wide, icon-only, light gray background. `testa.png` logo at top (from `public/`). Three nav icons below it: Pipeline, Triage Queue, Loan File.
- **Loan file header bar:** Dense single line at the top of every open loan. Shows loan ID (monospace, indigo), borrower name, address, then inline: LTV, DTI (indigo if over 40%, red if over 45%), FICO, stage pill, UW decision.
- **Stage pills:** Indigo text on `#EEF2FF` background. Rounded, compact.
- **Tables:** No heavy borders. Row hover `#f9fafb`. Column headers small-caps, gray, 11px.
- **Cards:** Subtle shadow `box-shadow: 0 1px 3px rgba(0,0,0,0.08)`. White background.
- **Monospace font** (Courier New): loan IDs, timestamps, raw field values, JSON content only.
- **No decorative elements.** No gradients, no illustrations, no unnecessary chrome.

---

## Component Structure

```
src/
  App.jsx                        -- holds all state, renders sidebar + active view
  data/
    loans.js                     -- loansData object keyed by loanId
    issues.js                    -- issuesData array
  components/
    Sidebar.jsx                  -- icon-only nav, logo
    Pipeline.jsx                 -- loans table
    TriageQueue.jsx              -- issue list (left) + investigation panel (right)
    InvestigationPanel.jsx       -- per-issue context, diagnosis textarea, actions
    EscalationModal.jsx          -- structured escalation form modal
    LoanFile.jsx                 -- loan header bar + tab bar + active tab
    tabs/
      Overview.jsx
      Liabilities.jsx
      Income.jsx
      Assets.jsx
      Conditions.jsx
      Documents.jsx
      AgentTasks.jsx
      AuditTrail.jsx
      LoanJSON.jsx
```

---

## State Management

Hold all state in `App.jsx` using `useState`. Pass state and setters as props. Do not use Context or Redux.

State shape:

```js
{
  currentView: 'pipeline',     // 'pipeline' | 'triage' | 'loan'
  currentLoanId: null,         // loanId of currently open loan file
  currentTab: 'overview',      // active tab in loan file
  selectedIssueId: null,       // active issue in triage queue
  issueStatuses: {},           // { [issueId]: 'open' | 'investigating' | 'resolved' | 'escalated' }
  loanMutations: {}            // { [loanId]: mutation object (see below) }
}
```

**loanMutations shape per loan:**

```js
{
  grossUpApplied: false,           // boolean -- SS income gross-up applied
  satisfiedConditions: [],         // string[] -- condition IDs manually satisfied by analyst
  createdConditions: [],           // object[] -- new condition objects created by analyst
  auditAppends: [],                // { id, timestamp, event, actor } objects appended by analyst actions
  docClassificationRetried: [],    // string[] -- doc IDs where retry was triggered
  ausTriggered: false,             // boolean -- AUS manually triggered
  issueNotes: {}                   // { [issueId]: string } -- diagnosis text per issue
}
```

**Critical:** When rendering any loan tab, always merge the base loan data from `loansData[loanId]` with `loanMutations[loanId]` before rendering. A mutation applied in the triage queue must be immediately visible when the analyst navigates to that loan's file tab.

---

## Data Layer

### src/data/issues.js

```js
export const issuesData = [
  {
    id: 'ISSUE-001',
    type: 'AGENT_TASK_FAILURE',
    severity: 'High',
    loanId: 'APP-1041',
    borrower: 'Marcus Webb',
    openSince: '47 minutes',
    title: 'Liability linking agent failed -- no mortgage statement found',
    status: 'open'
  },
  {
    id: 'ISSUE-002',
    type: 'RULE_MISFIRE',
    severity: 'High',
    loanId: 'APP-1042',
    borrower: 'Diana Chen',
    openSince: '2 hours 14 minutes',
    title: 'Social security income not grossed up -- qualified income understated',
    status: 'open'
  },
  {
    id: 'ISSUE-003',
    type: 'CONDITION_NOT_SATISFIED',
    severity: 'Medium',
    loanId: 'APP-1043',
    borrower: 'James Okafor',
    openSince: '31 minutes',
    title: 'Employment LOE uploaded but condition remains open',
    status: 'open'
  },
  {
    id: 'ISSUE-004',
    type: 'DOC_INTELLIGENCE_FAILURE',
    severity: 'Medium',
    loanId: 'APP-1043',
    borrower: 'James Okafor',
    openSince: '2 hours 3 minutes',
    title: 'Bank statement uploaded 2 hours ago -- still unclassified',
    status: 'open'
  },
  {
    id: 'ISSUE-005',
    type: 'MISSING_CONDITION',
    severity: 'Medium',
    loanId: 'APP-1044',
    borrower: 'Sofia Reyes',
    openSince: '58 minutes',
    title: 'Agent missed $12,500 deposit -- condition never created',
    status: 'open'
  },
  {
    id: 'ISSUE-006',
    type: 'INTEGRATION_TIMEOUT',
    severity: 'High',
    loanId: 'APP-1046',
    borrower: 'Priya Nair',
    openSince: '4 hours 22 minutes',
    title: 'AUS did not run after intent to proceed recorded',
    status: 'open'
  }
];
```

Note: APP-1043 (James Okafor) has two active issues -- ISSUE-003 and ISSUE-004. This is intentional. The pipeline issue badge for APP-1043 must show 2. The triage queue must handle multiple issues per loan correctly.

---

### src/data/loans.js

Export a `loansData` object keyed by loanId. Each entry is the full loan data object for that borrower. The data model below is complete for APP-1041. Build equivalent realistic data for the other 5 loans matching their borrower names, amounts, stages, and active issues. Key notes per loan:

- **APP-1042 Diana Chen:** Income tab shows SS gross-up not applied. `grossUpRequired: true`, `grossUpApplied: false` on SS income source.
- **APP-1043 James Okafor:** Has a stuck document (bank_stmt_march_2026.pdf, classificationStatus PROCESSING) and an employment LOE uploaded but condition not satisfied.
- **APP-1044 Sofia Reyes:** Asset review agent ran but missed a $12,500 ACH deposit. Transaction is in the data with `agentMissed: true`.
- **APP-1045 Trevor Holt:** Clean healthy loan. All conditions satisfied, all documents classified, no agent errors.
- **APP-1046 Priya Nair:** AUS was never triggered after intent to proceed. Audit trail shows intent to proceed event followed by silence. TASK-006 (AUS trigger) lives in THIS loan's agentTasks with status NOT_TRIGGERED. Income and asset tasks are blocked.

---

**APP-1041 -- Marcus Webb -- Full Data:**

```js
{
  loanId: 'APP-1041',
  stage: 'PROCESSING',
  uwDecision: 'PENDING',

  borrower: {
    id: 'BRW-8821',
    firstName: 'Marcus',
    lastName: 'Webb',
    email: 'marcus.webb@email.com',
    phone: '404-555-0182',
    ssn: '***-**-6842'
  },

  property: {
    address: '1842 Oakwood Dr',
    city: 'Atlanta',
    state: 'GA',
    zip: '30301',
    county: 'Fulton',
    estimatedValue: 538000,
    propertyType: 'SINGLE_FAMILY',
    occupancy: 'PRIMARY_RESIDENCE'
  },

  loan: {
    amount: 420000,
    purpose: 'PURCHASE',
    program: '30_YEAR_FIXED',
    interestRate: 6.875,
    lienType: 'FIRST_LIEN',
    closingDate: '2026-06-15',
    originationChannel: 'RETAIL'
  },

  metrics: {
    ltv: 0.78,
    dti: 0.42,
    fico: 710,
    qualifiedIncome: 67200,
    qualifiedIncomeCorrected: 69600,
    cashToClose: 124800,
    reservesMonths: 3.2
  },

  liabilities: [
    {
      id: 'LIAB-001',
      type: 'MORTGAGE',
      creditor: 'Chase Home Lending',
      monthlyPayment: 1840,
      balance: 287000,
      propertyAddress: '456 Maple Ave, Decatur GA 30030',
      linkedPropertyId: 'PROP-002',
      linkedAt: '2026-05-01T09:14:00Z',
      linkedBy: 'agent',
      warning: null
    },
    {
      id: 'LIAB-002',
      type: 'MORTGAGE',
      creditor: 'Wells Fargo Home Mortgage',
      monthlyPayment: 1240,
      balance: 198000,
      propertyAddress: '123 Birchwood Ln, Marietta GA 30060',
      linkedPropertyId: null,
      linkedAt: null,
      linkedBy: null,
      warning: 'NOT_LINKED_TO_OWNED_PROPERTY'
    }
  ],

  income: [
    {
      id: 'INC-001',
      type: 'W2_EMPLOYMENT',
      employer: 'ABC Corporation',
      monthlyAmount: 4800,
      annualAmount: 57600,
      verificationStatus: 'VERIFIED',
      verifiedBy: 'agent',
      verifiedAt: '2026-05-01T10:02:00Z',
      grossUpApplied: false,
      grossUpRequired: false,
      grossUpFactor: null,
      source: 'pay_stubs'
    },
    {
      id: 'INC-002',
      type: 'SOCIAL_SECURITY',
      employer: null,
      monthlyAmount: 800,
      annualAmount: 9600,
      annualAmountCorrected: 12000,
      verificationStatus: 'VERIFIED',
      verifiedBy: 'agent',
      verifiedAt: '2026-05-01T10:02:00Z',
      grossUpApplied: false,
      grossUpRequired: true,
      grossUpFactor: 1.25,
      grossUpNote: 'Fannie Mae B3-3.1-09: Non-taxable SS income may be grossed up 25%. Borrower does not file taxes on SS income. Gross-up not applied by agent.',
      source: 'ss_award_letter'
    }
  ],

  assets: {
    bankAccounts: [
      {
        id: 'ACCT-001',
        institution: 'Bank of America',
        accountType: 'CHECKING',
        accountNumberMasked: '****4821',
        balance: 34200,
        transactions: [
          {
            date: '2026-03-02',
            description: 'Direct Deposit - ABC Corporation',
            amount: 4200,
            type: 'CREDIT',
            flagged: false,
            conditionId: null,
            agentMissed: false
          },
          {
            date: '2026-03-08',
            description: 'ACH Deposit - External Transfer',
            amount: 12500,
            type: 'CREDIT',
            flagged: false,
            conditionId: null,
            agentMissed: true
          },
          {
            date: '2026-03-15',
            description: 'Direct Deposit - ABC Corporation',
            amount: 4200,
            type: 'CREDIT',
            flagged: false,
            conditionId: null,
            agentMissed: false
          },
          {
            date: '2026-03-22',
            description: 'Incoming Wire Transfer',
            amount: 20000,
            type: 'CREDIT',
            flagged: true,
            flagReason: 'Single deposit exceeds $10,000. Fannie Mae guidelines require letter of explanation.',
            conditionId: 'COND-008',
            agentMissed: false
          }
        ]
      }
    ]
  },

  conditions: [
    {
      id: 'COND-001',
      description: 'Provide signed purchase agreement',
      assignedTo: 'BORROWER',
      status: 'SATISFIED',
      createdAt: '2026-05-01T08:45:00Z',
      satisfiedAt: '2026-05-02T14:22:00Z',
      satisfiedBy: 'agent',
      documentId: 'DOC-003'
    },
    {
      id: 'COND-002',
      description: 'Provide 2 months pay stubs',
      assignedTo: 'BORROWER',
      status: 'SATISFIED',
      createdAt: '2026-05-01T08:45:00Z',
      satisfiedAt: '2026-05-03T09:10:00Z',
      satisfiedBy: 'agent',
      documentId: 'DOC-005'
    },
    {
      id: 'COND-003',
      description: 'Provide 2024 and 2025 W-2s',
      assignedTo: 'BORROWER',
      status: 'SATISFIED',
      createdAt: '2026-05-01T08:45:00Z',
      satisfiedAt: '2026-05-03T09:11:00Z',
      satisfiedBy: 'agent',
      documentId: 'DOC-006'
    },
    {
      id: 'COND-004',
      description: 'Provide 3 months bank statements',
      assignedTo: 'BORROWER',
      status: 'SATISFIED',
      createdAt: '2026-05-01T08:45:00Z',
      satisfiedAt: '2026-05-04T11:00:00Z',
      satisfiedBy: 'agent',
      documentId: 'DOC-008'
    },
    {
      id: 'COND-007',
      description: 'Provide letter of explanation for employment gap (June-September 2024)',
      assignedTo: 'BORROWER',
      status: 'PENDING_BORROWER',
      createdAt: '2026-05-06T14:30:00Z',
      satisfiedAt: null,
      satisfiedBy: null,
      documentId: null,
      documentUploaded: 'DOC-011',
      documentUploadedAt: '2026-05-13T11:16:00Z',
      note: 'Document uploaded but condition not auto-satisfied. Agent queried by conditionId linkage -- DOC-011 conditionId is null.'
    },
    {
      id: 'COND-008',
      description: 'Provide letter of explanation for $20,000 wire transfer received 03/22/2026',
      assignedTo: 'BORROWER',
      status: 'OPEN',
      createdAt: '2026-05-01T10:18:00Z',
      satisfiedAt: null,
      satisfiedBy: null,
      documentId: null
    }
  ],

  documents: [
    {
      id: 'DOC-001',
      filename: 'drivers_license_front.pdf',
      type: 'GOVERNMENT_ID',
      uploadedAt: '2026-05-01T08:40:00Z',
      uploadedBy: 'borrower',
      classificationStatus: 'CLASSIFIED',
      classifiedAt: '2026-05-01T08:41:28Z',
      classificationTime: '88s',
      classifiedBy: 'doc_intelligence',
      linkedTo: 'BRW-8821'
    },
    {
      id: 'DOC-003',
      filename: 'purchase_agreement_signed.pdf',
      type: 'PURCHASE_AGREEMENT',
      uploadedAt: '2026-05-01T09:30:00Z',
      uploadedBy: 'loan_officer',
      classificationStatus: 'CLASSIFIED',
      classifiedAt: '2026-05-01T09:31:44Z',
      classificationTime: '104s',
      classifiedBy: 'doc_intelligence',
      linkedTo: 'APP-1041'
    },
    {
      id: 'DOC-005',
      filename: 'paystubs_april_may_2026.pdf',
      type: 'PAY_STUB',
      uploadedAt: '2026-05-02T10:15:00Z',
      uploadedBy: 'borrower',
      classificationStatus: 'CLASSIFIED',
      classifiedAt: '2026-05-02T10:16:12Z',
      classificationTime: '72s',
      classifiedBy: 'doc_intelligence',
      linkedTo: 'INC-001'
    },
    {
      id: 'DOC-008',
      filename: 'bank_stmt_jan_feb_2026.pdf',
      type: 'BANK_STATEMENT',
      uploadedAt: '2026-05-04T10:50:00Z',
      uploadedBy: 'borrower',
      classificationStatus: 'CLASSIFIED',
      classifiedAt: '2026-05-04T10:51:33Z',
      classificationTime: '43s',
      classifiedBy: 'doc_intelligence',
      linkedTo: 'ACCT-001'
    },
    {
      id: 'DOC-010',
      filename: 'bank_stmt_march_2026.pdf',
      type: null,
      uploadedAt: '2026-05-13T10:14:00Z',
      uploadedBy: 'borrower',
      classificationStatus: 'PROCESSING',
      classifiedAt: null,
      classificationTime: '2h 3m+',
      classifiedBy: null,
      linkedTo: null,
      processingNote: 'Classification job started at 10:14:03Z. No completion event. All other documents on this loan classified in under 90 seconds.'
    },
    {
      id: 'DOC-011',
      filename: 'employment_gap_loe.pdf',
      type: 'LETTER_OF_EXPLANATION_EMPLOYMENT',
      uploadedAt: '2026-05-13T11:16:00Z',
      uploadedBy: 'borrower',
      classificationStatus: 'CLASSIFIED',
      classifiedAt: '2026-05-13T11:17:08Z',
      classificationTime: '68s',
      classifiedBy: 'doc_intelligence',
      linkedTo: 'BRW-8821',
      conditionSatisfiedAt: null,
      note: 'Classified correctly but COND-007 not satisfied. conditionId field is null -- agent queried by conditionId linkage and found no match.'
    }
  ],

  agentTasks: [
    {
      id: 'TASK-001',
      name: 'Order credit and initialize automations',
      objective: 'Pull credit report for all borrowers, enable compliance monitoring, order closing costs',
      status: 'COMPLETED',
      startedAt: '2026-05-01T08:33:00Z',
      completedAt: '2026-05-01T08:41:00Z',
      chainOfThought: [
        'Identified 1 borrower on file: Marcus Webb (BRW-8821)',
        'Submitted credit pull request to Equifax',
        'Credit returned: Classic FICO 710, VantageScore 724. 2 mortgage tradelines, 4 open tradelines, 0 derogatory',
        'Compliance monitoring enabled -- RESPA, TRID timelines initialized',
        'Closing cost estimate pulled from Lodestar: $11,240'
      ],
      output: 'Credit pulled. FICO 710. Compliance monitoring active. Closing costs estimated.',
      warning: null,
      error: null
    },
    {
      id: 'TASK-002',
      name: 'Link mortgage liabilities to owned properties',
      objective: 'Review mortgage liabilities pulled from credit and link each to the correct owned property using mortgage statements on file',
      status: 'FAILED',
      startedAt: '2026-05-01T09:15:00Z',
      completedAt: '2026-05-01T09:16:44Z',
      chainOfThought: [
        'Found 2 mortgage liabilities on credit report: Chase (456 Maple Ave) and Wells Fargo (123 Birchwood Ln)',
        'Searching documents on file for mortgage statements...',
        'Found mortgage_stmt_456maple.pdf -- matched to Chase liability at 456 Maple Ave. Linked successfully.',
        'Searching for mortgage statement for 123 Birchwood Ln -- no document found matching this address',
        'Cannot link Wells Fargo liability -- no statement available. Task failed for this liability.'
      ],
      output: 'LIAB-001 linked to PROP-002. LIAB-002 could not be linked -- no mortgage statement on file.',
      warning: null,
      error: 'MISSING_DOCUMENT: No mortgage statement found for 123 Birchwood Ln'
    },
    {
      id: 'TASK-003',
      name: 'Calculate qualified income',
      objective: 'Calculate total qualified income from all income documents using Fannie Mae guidelines. Annualize pay stub income. Apply gross-up to non-taxable income sources where applicable.',
      status: 'COMPLETED_WITH_ERRORS',
      startedAt: '2026-05-01T10:00:00Z',
      completedAt: '2026-05-01T10:03:22Z',
      chainOfThought: [
        'Found 2 income sources: W-2 employment (ABC Corp) and Social Security',
        'W-2: most recent pay stub shows $4,800/month gross. Annualized: $57,600. Verified against 2 months pay stubs.',
        'Social Security: SS award letter shows $800/month. Annualized: $9,600. Applied standard annualization.',
        'Total qualified income: $67,200. Added loan note with income breakdown.'
      ],
      output: 'Qualified income: $67,200. W-2: $57,600. SS: $9,600.',
      warning: 'GROSS_UP_NOT_APPLIED: SS income annualized at face value. Fannie Mae B3-3.1-09 permits 25% gross-up for non-taxable SS income. Corrected figure: $12,000 SS / $69,600 total.',
      error: null
    },
    {
      id: 'TASK-004',
      name: 'Review assets and flag large deposits',
      objective: 'Review all bank statements on file. Flag any single deposit or withdrawal exceeding $10,000. Create LOE conditions for flagged items.',
      status: 'COMPLETED_WITH_ERRORS',
      startedAt: '2026-05-01T10:10:00Z',
      completedAt: '2026-05-01T10:22:00Z',
      chainOfThought: [
        'Statements on file: Jan 2026, Feb 2026. March 2026 still processing -- skipped.',
        'Jan statement: 8 transactions. No deposits exceeding $10,000.',
        'Feb statement: 6 transactions. No deposits exceeding $10,000.',
        'March statement classification pending -- skipped.',
        'Found 1 flagged item: $20,000 wire on 03/22. Created COND-008.',
        'Asset calculator run. Balance $34,200. Reserves 3.2 months.'
      ],
      output: '1 large deposit flagged. COND-008 created for $20,000 wire.',
      warning: 'INCOMPLETE_REVIEW: March 2026 statement skipped -- classification pending. $12,500 ACH on 03/08 not reviewed or flagged.',
      error: null
    },
    {
      id: 'TASK-005',
      name: 'Review conditions and satisfy where possible',
      objective: 'Check all PENDING_BORROWER conditions for matching uploaded documents. Satisfy condition if requirements are met.',
      status: 'COMPLETED_WITH_ERRORS',
      startedAt: '2026-05-13T11:19:00Z',
      completedAt: '2026-05-13T11:21:14Z',
      chainOfThought: [
        'Found 2 open conditions: COND-007 and COND-008',
        'COND-008: No document uploaded. Skipping.',
        'COND-007: Status PENDING_BORROWER. Checking for uploaded LOE documents linked to this condition...',
        'Query returned 0 documents linked to COND-007 by conditionId.',
        'No matching document found for COND-007. Skipping.'
      ],
      output: '0 conditions satisfied.',
      warning: 'CONDITION_MATCH_FAILURE: DOC-011 uploaded and classified as LETTER_OF_EXPLANATION_EMPLOYMENT but not linked to COND-007. Agent queries by conditionId linkage -- DOC-011 conditionId is null.',
      error: null
    },
    {
      id: 'TASK-007',
      name: 'Doc Intelligence batch classification',
      objective: 'Classify and link all unprocessed documents uploaded in the last 24 hours',
      status: 'STUCK',
      startedAt: '2026-05-13T10:14:03Z',
      completedAt: null,
      chainOfThought: [
        'Batch job started. 1 document queued: bank_stmt_march_2026.pdf (DOC-010)',
        'Submitted DOC-010 to classification pipeline...',
        'Awaiting classification result...'
      ],
      output: null,
      warning: null,
      error: 'PROCESSING_TIMEOUT: Classification job running 2h 3m with no completion event. Job appears stuck.'
    }
  ],

  auditTrail: [
    { id: 'EVT-001', timestamp: '2026-05-01T08:32:00Z', event: 'Loan file created -- APP-1041', actor: 'system' },
    { id: 'EVT-002', timestamp: '2026-05-01T08:33:00Z', event: 'Credit order automation triggered', actor: 'system' },
    { id: 'EVT-003', timestamp: '2026-05-01T08:41:00Z', event: 'Credit pulled -- FICO 710, VantageScore 724', actor: 'agent' },
    { id: 'EVT-004', timestamp: '2026-05-01T08:41:00Z', event: '2 mortgage liabilities imported from credit report', actor: 'system' },
    { id: 'EVT-005', timestamp: '2026-05-01T09:15:00Z', event: 'Agent task started -- LIABILITY_LINK', actor: 'agent' },
    { id: 'EVT-006', timestamp: '2026-05-01T09:16:44Z', event: 'LIAB-001 linked to 456 Maple Ave (PROP-002)', actor: 'agent' },
    { id: 'EVT-007', timestamp: '2026-05-01T09:16:44Z', event: 'Agent task FAILED -- LIABILITY_LINK -- MISSING_DOCUMENT: no statement for 123 Birchwood Ln', actor: 'agent' },
    { id: 'EVT-008', timestamp: '2026-05-01T10:00:00Z', event: 'Agent task started -- INCOME_CALCULATION', actor: 'agent' },
    { id: 'EVT-009', timestamp: '2026-05-01T10:03:22Z', event: 'Qualified income set to $67,200. Warning: SS gross-up not applied.', actor: 'agent' },
    { id: 'EVT-010', timestamp: '2026-05-01T10:10:00Z', event: 'Agent task started -- ASSET_REVIEW', actor: 'agent' },
    { id: 'EVT-011', timestamp: '2026-05-01T10:18:00Z', event: 'Large deposit flagged -- $20,000 wire 03/22. COND-008 created.', actor: 'agent' },
    { id: 'EVT-012', timestamp: '2026-05-01T10:22:00Z', event: 'Asset review complete. March statement skipped -- classification pending.', actor: 'agent' },
    { id: 'EVT-013', timestamp: '2026-05-13T10:14:03Z', event: 'Document uploaded -- bank_stmt_march_2026.pdf (DOC-010)', actor: 'borrower' },
    { id: 'EVT-014', timestamp: '2026-05-13T10:14:03Z', event: 'Doc Intelligence classification started -- DOC-010', actor: 'system' },
    { id: 'EVT-015', timestamp: '2026-05-13T11:16:00Z', event: 'Document uploaded -- employment_gap_loe.pdf (DOC-011)', actor: 'borrower' },
    { id: 'EVT-016', timestamp: '2026-05-13T11:17:08Z', event: 'DOC-011 classified as LETTER_OF_EXPLANATION_EMPLOYMENT', actor: 'system' },
    { id: 'EVT-017', timestamp: '2026-05-13T11:19:00Z', event: 'Agent task started -- CONDITION_REVIEW', actor: 'agent' },
    { id: 'EVT-018', timestamp: '2026-05-13T11:21:14Z', event: 'Condition review complete. 0 conditions satisfied. DOC-011 not matched to COND-007 -- conditionId null.', actor: 'agent' }
  ]
}
```

---

**APP-1046 -- Priya Nair -- agentTasks must include TASK-006:**

TASK-006 belongs exclusively in APP-1046's data, not APP-1041's. This task represents the AUS trigger failure on Priya Nair's loan.

```js
{
  id: 'TASK-006',
  name: 'Trigger AUS after intent to proceed',
  objective: 'After intent to proceed is recorded, run AUS via Fannie Mae Desktop Underwriter and update loan with findings',
  status: 'NOT_TRIGGERED',
  startedAt: null,
  completedAt: null,
  chainOfThought: [],
  output: null,
  warning: null,
  error: 'WORKFLOW_TRIGGER_FAILURE: Intent to proceed recorded at 08:47 AM. AUS trigger automation did not fire. No task created, no error logged. Downstream income and asset tasks are blocked pending AUS findings.'
}
```

APP-1046's audit trail must include the intent to proceed event followed by silence -- no subsequent AUS order event:

```js
{ id: 'EVT-046-001', timestamp: '2026-05-13T08:45:00Z', event: 'Disclosures sent to borrower', actor: 'system' },
{ id: 'EVT-046-002', timestamp: '2026-05-13T08:47:03Z', event: 'Borrower signed disclosures. Intent to proceed recorded.', actor: 'system' },
{ id: 'EVT-046-003', timestamp: '2026-05-13T08:47:04Z', event: 'Expected: AUS trigger automation. Actual: no event fired.', actor: 'system' }
```

---

## VIEW 1 -- PIPELINE

A clean table:

| Column | Notes |
|--------|-------|
| Loan | Monospace indigo link |
| Borrower | Plain text |
| Stage | Indigo stage pill |
| Amount | Right-aligned |
| Closing | Monospace |
| Tasks | Indigo text link showing count |
| Issues | Red badge if > 0, dash if 0 |

Loans to render:

| Loan | Borrower | Stage | Amount | Closing | Tasks | Issues |
|------|----------|-------|--------|---------|-------|--------|
| APP-1041 | Marcus Webb | Processing | $420,000 | 06/15/2026 | 4 | 1 |
| APP-1042 | Diana Chen | Underwriting | $275,000 | 07/01/2026 | 2 | 1 |
| APP-1043 | James Okafor | Processing | $550,000 | 06/28/2026 | 6 | 2 |
| APP-1044 | Sofia Reyes | Underwriting | $310,000 | 07/15/2026 | 3 | 1 |
| APP-1045 | Trevor Holt | Pre-closing | $189,000 | 06/01/2026 | 1 | 0 |
| APP-1046 | Priya Nair | Application | $640,000 | 08/01/2026 | 2 | 1 |

Clicking any row calls `openLoan(loanId)` which sets `currentLoanId` to that specific loan's ID and switches view to 'loan'. Every loan must open its own correct data.

---

## VIEW 2 -- TRIAGE QUEUE

Email-client layout. Issue list on the left (320px fixed width). Investigation panel on the right (flex: 1). Clicking an issue loads the right panel without collapsing the list.

Issues sorted: High severity first, then Medium. Within same severity, sorted by time open descending.

Each issue list item shows: title, type badge, severity badge, loan ID + borrower name, time open, current status tag if not 'open'.

Clicking an issue sets `issueStatuses[issueId]` to 'investigating' if it was 'open'.

### Investigation Panel -- Per Issue

**ISSUE-001 (APP-1041 -- Marcus Webb)**

Show:
- Agent task log for TASK-002 with full chain of thought
- LIAB-002 record: creditor, property address, `linkedPropertyId: null`, warning field
- Documents on file: list of all documents, highlighting that none are a mortgage statement for 123 Birchwood Ln

Resolution actions:
- "Mark as doc gap -- create borrower task" -> sets issue resolved, appends audit entry
- "Re-run agent with manual doc link" -> sets issue investigating, appends audit entry
- "Escalate to Engineering" -> opens EscalationModal

---

**ISSUE-002 (APP-1042 -- Diana Chen)**

Show:
- TASK-003 agent log with chain of thought and warning text
- Income breakdown: W-2 $57,600, SS $9,600 (current), SS $12,000 (corrected), Total current vs corrected
- Fannie Mae B3-3.1-09 guideline note in a highlighted info block
- If grossUpApplied is false in loanMutations: show "Apply gross-up correction" button
- If grossUpApplied is true: show green confirmation, corrected figures

Resolution actions:
- "Apply gross-up correction" -> sets `loanMutations['APP-1042'].grossUpApplied = true`, appends audit entry, marks issue resolved
- "Escalate to Engineering" -> opens EscalationModal

---

**ISSUE-003 (APP-1043 -- James Okafor)**

Show:
- DOC-011 document record: filename, classificationStatus CLASSIFIED, classifiedAt, `conditionId: null`
- COND-007 condition record: description, status PENDING_BORROWER, documentUploaded DOC-011, satisfiedAt null
- TASK-005 agent log: chain of thought showing it queried by conditionId and found 0 results
- Root cause callout: "Agent queries by conditionId linkage. DOC-011 conditionId is null -- it was never linked to COND-007 during classification."

Resolution actions:
- "Manually satisfy condition" -> adds COND-007 to `loanMutations['APP-1043'].satisfiedConditions`, appends audit entry, marks issue resolved
- "Re-trigger condition review agent" -> appends audit entry noting retry queued
- "Escalate to Engineering" -> opens EscalationModal

---

**ISSUE-004 (APP-1043 -- James Okafor)**

Show:
- DOC-010 record: filename, classificationStatus PROCESSING, uploadedAt, classifiedAt null, duration 2h 3m
- Comparison table: other documents with their classification times (all under 90 seconds)
- Downstream impact: TASK-004 asset review skipped March statement, ISSUE-005 on APP-1044 is a downstream consequence

Resolution actions:
- "Retry Doc Intelligence classification" -> adds DOC-010 to `loanMutations['APP-1043'].docClassificationRetried`, appends audit entry
- "Manually classify document" -> updates document status in mutations, appends audit entry, marks issue resolved
- "Escalate to Engineering" -> opens EscalationModal

---

**ISSUE-005 (APP-1044 -- Sofia Reyes)**

Show:
- TASK-004 agent log: chain of thought showing March statement skipped, warning about incomplete review
- Transaction list: all 4 transactions, with $12,500 row highlighted amber (agentMissed: true, no conditionId) and $20,000 row highlighted red (flagged: true, conditionId: COND-008)
- Existing condition COND-008 shown for reference
- Missing condition callout: "$12,500 ACH on 03/08 exceeds $10,000 threshold. No condition was created."

Resolution actions:
- "Create missing condition" -> adds new condition object to `loanMutations['APP-1044'].createdConditions`, appends audit entry, marks issue resolved
- "Escalate to Engineering" -> opens EscalationModal

---

**ISSUE-006 (APP-1046 -- Priya Nair)**

Show:
- Audit trail entries around intent to proceed: the disclosure signing event, the intent to proceed event, and then the gap (no AUS event follows)
- Expected automation sequence (numbered list): 1. Intent to proceed fires trigger, 2. AUS submitted to Fannie Mae DU, 3. DU findings returned, 4. Income and asset tasks proceed
- Current blocked state: AUS not ordered, DU findings null, income calculation blocked, asset review blocked
- TASK-006 agent task record: status NOT_TRIGGERED, no chain of thought, error message

Resolution actions:
- "Manually trigger AUS" -> sets `loanMutations['APP-1046'].ausTriggered = true`, appends audit entry, marks issue investigating
- "Escalate to Engineering" -> opens EscalationModal

---

### All Investigation Panels Include

After the issue-specific context:

1. **Your Diagnosis** -- `<textarea>` with placeholder "Describe what you found and why..." Saves text to `loanMutations[loanId].issueNotes[issueId]` on change.

2. **After any action:** Show an inline green confirmation message. Append a timestamped audit entry to `loanMutations[loanId].auditAppends` with: timestamp (new Date().toISOString()), event (description of action taken + diagnosis text if present), actor 'analyst', actorId 'S. Ewers'.

---

## EscalationModal Component

Opens as a centered modal overlay. Fields:

- Issue Type (pre-filled, read-only)
- Affected Loan ID (pre-filled, read-only)
- Summary of Investigation (pre-filled from diagnosis textarea if present, editable)
- Steps to Reproduce (empty textarea)
- Relevant Data Snapshot (pre-filled with JSON.stringify of key fields, monospace textarea)
- Recommended Action (empty input)
- Severity (dropdown: P1 Critical, P2 High, P3 Medium -- pre-selected based on issue severity)

On submit: sets `issueStatuses[issueId]` to 'escalated', appends audit entry "Escalated to Engineering: [issue type] on [loanId]. Severity: [P1/P2]. [summary]", closes modal.

---

## VIEW 3 -- LOAN FILE

### Header Bar

Single dense line. Always visible at top of loan file view. Renders from `loansData[currentLoanId]` merged with `loanMutations[currentLoanId]`.

```
#APP-1041  Marcus Webb  |  1842 Oakwood Dr, Atlanta GA 30301  |  LTV: 78%  DTI: 42% [flag]  FICO: 710  Program: Conv 30yr Fixed  Stage: PROCESSING  UW: PENDING
```

DTI flag: indigo triangle if DTI > 0.40, red if DTI > 0.45.

### Tab Bar

9 tabs: Overview, Liabilities, Income, Assets, Conditions, Documents, Agent Tasks, Audit Trail, Loan JSON

Active tab has indigo bottom border and indigo text.

---

### Overview Tab

Two-column layout:

Left column:
- 4 snapshot cards: Stage, Closing Date, Open Tasks count, Open Issues count (red if > 0)
- Open tasks table: task name (indigo link), assigned to, due date, Assign button if unassigned

Right column:
- Key Dates card: Application date, Credit pull date, Intent to proceed, Estimated closing
- Loan Summary card: Amount, Property value, Cash to close, Reserves, Rate

---

### Liabilities Tab

Table showing all liabilities. For each:
- ID (monospace)
- Creditor
- Property address
- Monthly payment (monospace)
- Balance (monospace)
- Link status: green checkmark + "Linked to [propertyId]" if linked, amber warning + "Not linked to owned property" if `linkedPropertyId` is null, plus agent task failure note

---

### Income Tab

Table showing all income sources. Columns: Source, Type, Monthly, Annual, Status, Notes.

For any income source where `grossUpRequired: true`:
- If `grossUpApplied` is false in base data AND not overridden in loanMutations: show amber flag with gross-up note and corrected value
- If gross-up has been applied via loanMutations: show green confirmation, use corrected annualAmountCorrected value

Below table: Qualified Income totals card showing current total, corrected total if applicable, and "Apply correction" button if not yet applied.

---

### Assets Tab

For each bank account: account summary header, then transaction table. Columns: Date, Description, Amount, Status.

Row styling:
- `flagged: true` rows: red background tint, flag icon, condition ID shown
- `agentMissed: true` rows: amber background tint, warning "Exceeds $10,000 threshold. No condition created." -- or green confirmation if condition was created via loanMutations
- Normal rows: no highlight

---

### Conditions Tab

Table. Columns: ID, Description, Assigned To, Status, Created, Satisfied.

Status rendering:
- SATISFIED: green text
- PENDING_BORROWER: amber text
- OPEN: red text

If a condition ID is in `loanMutations[loanId].satisfiedConditions`: override status to SATISFIED with satisfiedAt timestamp and "analyst" as satisfiedBy.

Append any conditions from `loanMutations[loanId].createdConditions` to the bottom of the list.

For COND-007 specifically: show the documentUploaded note and the conditionId null note as a sub-row below the condition.

---

### Documents Tab

Table. Columns: Filename, Type, Uploaded, Classification Status, Time to Classify, Linked To.

For documents where classificationStatus is PROCESSING: amber status text, show duration and "no completion event" note.

For DOC-011: show classification as CLASSIFIED but add amber note "conditionId: null -- COND-007 not satisfied".

If a doc ID is in `loanMutations[loanId].docClassificationRetried`: show "Retry queued" badge next to status.

---

### Agent Tasks Tab

List of expandable task cards. Each card:
- Header (always visible): task name, status badge, timestamp
- Expanded body: objective text, chain of thought as numbered steps, output box if present, warning box (amber) if present, error box (red) if present

Status badge colors:
- COMPLETED: green
- FAILED: red
- COMPLETED_WITH_ERRORS: amber
- STUCK: orange
- NOT_TRIGGERED: gray

Click header to expand/collapse.

---

### Audit Trail Tab

Chronological list, most recent first. Merge base `auditTrail` with `loanMutations[loanId].auditAppends`, sort by timestamp descending.

Each entry: colored dot by actor type, timestamp (monospace), event text, actor label.

Actor dot colors:
- system: gray `#9ca3af`
- agent: indigo `#4F46E5`
- rules_engine: purple `#9333ea`
- loan_officer: blue `#3b82f6`
- borrower: green `#16a34a`
- analyst: amber `#f59e0b`

---

### Loan JSON Tab

Display the full merged loan object (base data + loanMutations applied) as syntax-highlighted JSON.

Code block styling:
- Background: `#1e1e2e`
- Keys: indigo `#89b4fa`
- String values: green `#a6e3a1`
- Numbers: amber `#fab387`
- Booleans: purple `#cba6f7`
- Null values: red `#f38ba8`
- Font: Courier New, 12px, line-height 1.7

This tab is for interview demos -- being able to point at `grossUpApplied: false`, `linkedPropertyId: null`, or `conditionSatisfiedAt: null` and explain what those fields mean is a core part of the demo script.

---

## Interview Demo Flow

The app must support this exact sequence without anything breaking:

1. Open Testa -- pipeline shows all 6 loans, APP-1043 shows issue badge of 2
2. Click APP-1042 -- opens Diana Chen's loan file with correct header (DTI, FICO, stage)
3. Navigate to Income tab -- shows SS gross-up warning
4. Navigate to Triage Queue -- 6 issues, High severity sorted first
5. Click ISSUE-002 -- Diana Chen's SS gross-up investigation panel loads
6. Write a diagnosis in the textarea, click "Apply gross-up correction"
7. Inline confirmation appears, issue marked resolved in list
8. Navigate to APP-1042 loan file, Income tab -- corrected $69,600 now shows, gross-up applied
9. Audit Trail tab -- analyst action appended at top with timestamp
10. Click ISSUE-006 -- Priya Nair's AUS timeout loads with audit trail gap visible
11. Click "Escalate to Engineering" -- modal opens pre-filled, submit escalation
12. Navigate to APP-1041 loan file -- click through all 9 tabs, each renders Marcus Webb's data correctly
13. Open Loan JSON tab -- point to `grossUpApplied: false` on INC-002, `linkedPropertyId: null` on LIAB-002, `conditionSatisfiedAt: null` on COND-007

---

## Technical Notes

- Use Vite + React. No other libraries required. Tailwind is optional if preferred for styling.
- All state in App.jsx via useState. No Context, no Redux, no external state libraries.
- No backend, no API calls, no localStorage. All state is in-memory for the session.
- Always derive rendered data as: `const loan = merge(loansData[currentLoanId], loanMutations[currentLoanId])` before passing to any tab component.
- Never hardcode a specific loanId anywhere in a component. Always read from `currentLoanId` in state.
- Use `public/testa.png` for the logo. Reference as `<img src="/testa.png" alt="Testa" />`.
- No en-dashes in any string literals. Use regular hyphens only.
- All string data uses straight quotes and standard ASCII characters throughout to prevent encoding issues.
