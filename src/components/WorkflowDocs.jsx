const STAGES = [
  {
    name: 'Stage 1 — Application Received',
    trigger: 'Borrower or loan officer submits application via portal or API',
    rules: [
      'Required fields validation (borrower name, SSN, property address, loan amount, purpose)',
      'Duplicate application check'
    ],
    failures: ['Missing required fields', 'Duplicate detected'],
    success: 'All required fields present, no duplicate found, loan ID assigned',
    next: 'Identity Verified'
  },
  {
    name: 'Stage 2 — Identity Verified',
    trigger: 'Automatic on successful application receipt',
    rules: [
      'Credit pull via Equifax, FICO minimum threshold (620)',
      'Fraud flag check',
      'Mortgage liability import'
    ],
    failures: [
      'FICO below threshold',
      'Fraud flag triggered',
      'Credit bureau timeout',
      'Liability linking failure if no mortgage statements on file'
    ],
    success: 'FICO at or above 620, no fraud flags, credit tradelines imported, liabilities linked or flagged for manual review',
    next: 'Income Validated'
  },
  {
    name: 'Stage 3 — Income Validated',
    trigger: 'Automatic on identity verification completion',
    rules: [
      'Qualified income calculation from all income sources',
      'Gross-up applied to non-taxable income per Fannie Mae B3-3.1-09',
      'DTI ratio calculation',
      'Maximum DTI threshold check (45%)'
    ],
    failures: [
      'DTI exceeds threshold',
      'SS income gross-up not applied',
      'Employment verification timeout',
      'Income documents not yet classified'
    ],
    success: 'All income sources calculated and verified, gross-up applied where required, DTI within acceptable range',
    next: 'Underwriting Review'
  },
  {
    name: 'Stage 4 — Underwriting Review',
    trigger: 'Automatic on income validation completion plus AUS findings received',
    rules: [
      'AUS submission to Fannie Mae Desktop Underwriter',
      'DU findings evaluation',
      'Investor guideline compliance check',
      'Condition generation for outstanding items'
    ],
    failures: [
      'AUS trigger failure after intent to proceed',
      'DU returns ineligible finding',
      'Open conditions blocking advancement',
      'Asset review incomplete due to unclassified documents'
    ],
    success: 'AUS returns APPROVE/ELIGIBLE, all conditions addressed, no open eligibility exceptions',
    next: 'Approved / Denied'
  },
  {
    name: 'Stage 5 — Approved / Denied',
    trigger: 'Underwriter review complete',
    rules: [
      'Final condition review',
      'Clear to close checklist',
      'Disclosure compliance check'
    ],
    failures: ['Outstanding conditions not satisfied', 'Title issues', 'Appraisal gaps'],
    success: 'All conditions satisfied, clear to close issued, loan approved or denial notice generated per ECOA requirements',
    next: 'Pre-closing (if approved)'
  }
]

const AGENT_TASKS = [
  { name: 'LIABILITY_LINK',       stage: 'Identity Verified',    desc: 'Links mortgage liabilities on the loan to owned properties using credit and document data' },
  { name: 'INCOME_CALCULATION',   stage: 'Income Validated',     desc: 'Calculates total qualified income from all income sources, applying gross-up rules where required' },
  { name: 'ASSET_REVIEW',         stage: 'Underwriting Review',  desc: 'Reviews bank statements for large deposits and flags any requiring a letter of explanation' },
  { name: 'CONDITION_REVIEW',     stage: 'Underwriting Review',  desc: 'Matches uploaded borrower documents to open conditions and auto-satisfies conditions when criteria are met' },
  { name: 'AUS_TRIGGER',          stage: 'Underwriting Review',  desc: 'Submits the loan to Fannie Mae Desktop Underwriter and stores DU findings on the loan record' },
  { name: 'DOC_INTELLIGENCE',     stage: 'All stages',           desc: 'Classifies uploaded documents by type and links them to the correct loan record, condition, or account' },
  { name: 'CREDIT_ORDER',         stage: 'Identity Verified',    desc: 'Pulls credit report from Equifax, imports FICO score, fraud flags, and mortgage tradelines to the loan' }
]

const labelStyle = {
  fontSize: 10, fontWeight: 600, color: '#9ca3af',
  textTransform: 'uppercase', letterSpacing: '.06em',
  marginBottom: 4, marginTop: 12
}

const bodyStyle = { fontSize: 13, color: '#374151', lineHeight: 1.65 }

function DocSection({ label, children }) {
  return (
    <div style={{ marginBottom: 2 }}>
      <div style={labelStyle}>{label}</div>
      {children}
    </div>
  )
}

export default function WorkflowDocs() {
  return (
    <>
      <div className="view-header">
        Workflow Docs
        <span style={{ fontWeight: 400, color: '#6b7280', fontSize: '12px', marginLeft: '8px' }}>
          Internal reference
        </span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', maxWidth: '820px' }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#111827', marginBottom: 4 }}>
            Loan Origination Pipeline — Workflow Specification
          </div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>
            Internal reference document — Testa simulation environment
          </div>
        </div>

        {STAGES.map((stage, i) => (
          <div key={stage.name} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: i < STAGES.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#4F46E5', marginBottom: 14 }}>
              {stage.name}
            </div>

            <DocSection label="Trigger">
              <p style={bodyStyle}>{stage.trigger}</p>
            </DocSection>

            <DocSection label="Rules">
              <ul style={{ ...bodyStyle, paddingLeft: 18, marginTop: 2 }}>
                {stage.rules.map((r, j) => <li key={j} style={{ marginBottom: 3 }}>{r}</li>)}
              </ul>
            </DocSection>

            <DocSection label="Failure Modes">
              <ul style={{ ...bodyStyle, paddingLeft: 18, marginTop: 2, color: '#dc2626' }}>
                {stage.failures.map((f, j) => <li key={j} style={{ marginBottom: 3 }}>{f}</li>)}
              </ul>
            </DocSection>

            <DocSection label="Success Criteria">
              <p style={bodyStyle}>{stage.success}</p>
            </DocSection>

            <DocSection label="Next Stage">
              <p style={{ ...bodyStyle, color: '#4F46E5', fontWeight: 500 }}>{stage.next}</p>
            </DocSection>
          </div>
        ))}

        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #e5e7eb' }}>
            Agent Task Reference
          </div>
          {AGENT_TASKS.map(task => (
            <div key={task.name} style={{ marginBottom: 14, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{
                fontFamily: "'Courier New',monospace", fontSize: 11, fontWeight: 700,
                color: '#4F46E5', background: '#EEF2FF', padding: '2px 8px',
                borderRadius: 4, whiteSpace: 'nowrap', flexShrink: 0, marginTop: 1
              }}>
                {task.name}
              </span>
              <div>
                <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500 }}>{task.stage} — </span>
                <span style={{ fontSize: 13, color: '#374151' }}>{task.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
