const TEST_CASES = [
  {
    id: 'TC-001', area: 'Liability Linking',
    desc: 'Agent receives loan with 2 mortgage liabilities and matching statements on file',
    expected: 'Both liabilities linked to correct owned properties within 90 seconds',
    status: 'Pass', issueId: null
  },
  {
    id: 'TC-002', area: 'Liability Linking',
    desc: 'Agent receives loan where one mortgage statement is missing from file',
    expected: 'Agent links available liability, flags missing statement, task status set to FAILED with MISSING_DOCUMENT error',
    status: 'Fail', issueId: 'ISSUE-001'
  },
  {
    id: 'TC-003', area: 'Income Calculation',
    desc: 'Agent calculates qualified income for borrower with W-2 and non-taxable SS income',
    expected: 'SS income grossed up 25% per Fannie Mae B3-3.1-09. Total qualified income reflects corrected figure',
    status: 'Fail', issueId: 'ISSUE-002'
  },
  {
    id: 'TC-004', area: 'Income Calculation',
    desc: 'Agent calculates qualified income for borrower with W-2 only',
    expected: 'W-2 income annualized correctly. No gross-up applied. Qualified income matches pay stub data',
    status: 'Pass', issueId: null
  },
  {
    id: 'TC-005', area: 'Condition Satisfaction',
    desc: 'Borrower uploads correct document type matching an open PENDING_BORROWER condition',
    expected: 'Doc Intelligence classifies document, links it to condition by conditionId, condition auto-satisfied within 2 minutes',
    status: 'Fail', issueId: 'ISSUE-003'
  },
  {
    id: 'TC-006', area: 'Doc Intelligence',
    desc: 'Borrower uploads standard bank statement PDF under 10MB',
    expected: 'Document classified as BANK_STATEMENT and linked to correct account within 90 seconds',
    status: 'Fail', issueId: 'ISSUE-004'
  },
  {
    id: 'TC-007', area: 'Asset Review',
    desc: 'Agent reviews bank statements containing a deposit exceeding $10,000',
    expected: 'All deposits over $10,000 flagged. LOE condition created for each. No deposits missed.',
    status: 'Fail', issueId: 'ISSUE-005'
  },
  {
    id: 'TC-008', area: 'AUS Trigger',
    desc: 'Borrower signs disclosures and intent to proceed is recorded',
    expected: 'AUS submission to Fannie Mae DU fires automatically within 60 seconds. Findings returned and stored on loan.',
    status: 'Fail', issueId: 'ISSUE-006'
  },
  {
    id: 'TC-009', area: 'End to End',
    desc: 'Clean loan with no data issues moves through all 5 pipeline stages',
    expected: 'All agent tasks complete with no errors. All conditions satisfied. AUS returns APPROVE/ELIGIBLE. Loan reaches decision stage.',
    status: 'Pass — APP-1045', issueId: null
  },
  {
    id: 'TC-010', area: 'Integration Mapping',
    desc: 'Third party service returns a response payload with non-standard field names',
    expected: 'Field mapping layer correctly translates external schema to Vesta internal data model. No fields dropped or misrouted.',
    status: 'In Review', issueId: null
  }
]

function StatusBadge({ status, issueId, onOpenIssue }) {
  const isPass = status.startsWith('Pass')
  const isFail = status.startsWith('Fail')
  const bg = isPass ? '#F0FDF4' : isFail ? '#FEF2F2' : '#FFFBEB'
  const color = isPass ? '#16a34a' : isFail ? '#dc2626' : '#d97706'
  const baseStyle = {
    display: 'inline-flex', alignItems: 'center', gap: 3,
    background: bg, color, fontSize: 11, fontWeight: 600,
    padding: '2px 8px', borderRadius: 4, whiteSpace: 'nowrap'
  }

  if (isFail && issueId && onOpenIssue) {
    return (
      <span style={baseStyle}>
        Fail —{' '}
        <span
          onClick={() => onOpenIssue(issueId)}
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          {issueId}
        </span>
      </span>
    )
  }

  return <span style={baseStyle}>{status}</span>
}

export default function TestCases({ onOpenIssue }) {
  return (
    <>
      <div className="view-header">
        Test Case Registry{' '}
        <span style={{ fontWeight: 400, color: '#6b7280', fontSize: '12px', marginLeft: '8px' }}>
          Loan pipeline workflow coverage — 10 test cases
        </span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        <div className="table-wrapper">
          <table className="data-table" style={{ tableLayout: 'fixed', width: '100%' }}>
            <colgroup>
              <col style={{ width: '70px' }} />
              <col style={{ width: '130px' }} />
              <col style={{ width: '28%' }} />
              <col style={{ width: '32%' }} />
              <col style={{ width: '130px' }} />
            </colgroup>
            <thead>
              <tr>
                <th>ID</th>
                <th>Workflow Area</th>
                <th>Test Description</th>
                <th>Expected Behavior</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {TEST_CASES.map(tc => (
                <tr key={tc.id}>
                  <td>
                    <span style={{ fontFamily: "'Courier New',monospace", fontSize: 12, color: '#4F46E5', fontWeight: 600 }}>
                      {tc.id}
                    </span>
                  </td>
                  <td style={{ fontSize: 12, color: '#374151' }}>{tc.area}</td>
                  <td style={{ fontSize: 12, color: '#374151', lineHeight: 1.5 }}>{tc.desc}</td>
                  <td style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5 }}>{tc.expected}</td>
                  <td>
                    <StatusBadge status={tc.status} issueId={tc.issueId} onOpenIssue={onOpenIssue} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
