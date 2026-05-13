import { loansData } from '../data/loans'
import InvestigationPanel from './InvestigationPanel'

const SORTED_ISSUES = (issues) => {
  const order = { High: 0, Medium: 1, Low: 2 }
  return [...issues].sort((a, b) => order[a.severity] - order[b.severity])
}

export default function TriageQueue({
  issues, issueStatuses, loanMutations, selectedIssueId,
  onSelectIssue, onOpenLoan, onOpenEscModal, actions
}) {
  const open = issues.filter(i => (issueStatuses[i.id] || i.status) !== 'resolved')
  const sorted = SORTED_ISSUES(issues)

  const selectedIssue = selectedIssueId ? issues.find(i => i.id === selectedIssueId) : null
  const selectedLoan = selectedIssue ? loansData[selectedIssue.loanId] : null
  const selectedMuts = selectedIssue
    ? (loanMutations[selectedIssue.loanId] || { grossUpApplied: false, satisfiedConditions: [], createdConditions: [], auditAppends: [], docClassificationRetried: [], ausTriggered: false, issueNotes: {} })
    : null

  return (
    <>
      <div id="triage-list">
        <div className="triage-header">
          Triage Queue{' '}
          <span style={{ fontWeight: 400, color: '#6b7280', fontSize: '12px' }}>{open.length} active</span>
        </div>
        <div>
          {sorted.map(iss => {
            const st = issueStatuses[iss.id] || iss.status
            const isActive = selectedIssueId === iss.id
            return (
              <div
                key={iss.id}
                className={`issue-item${isActive ? ' active' : ''}`}
                onClick={() => onSelectIssue(iss.id)}
              >
                <div className="issue-item-title">{iss.title}</div>
                <div className="issue-item-meta">
                  <span className={`type-badge ${iss.typeCls}`}>{iss.type}</span>
                  <span className={`type-badge ${iss.sevCls}`}>{iss.severity}</span>
                  {st !== 'open' && (
                    <span className="type-badge" style={{ background: '#F3F4F6', color: '#6b7280' }}>
                      {st.toUpperCase()}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="issue-item-loan">{iss.loanId} · {iss.borrower}</span>
                  <span style={{ fontSize: '11px', color: '#9ca3af' }}>{iss.openSince}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div id="investigation-panel">
        {!selectedIssue ? (
          <div className="inv-empty">Select an issue to investigate</div>
        ) : (
          <InvestigationPanel
            issue={selectedIssue}
            loan={selectedLoan}
            mutations={selectedMuts}
            issueStatus={issueStatuses[selectedIssue.id] || selectedIssue.status}
            onOpenLoan={onOpenLoan}
            onOpenEscModal={onOpenEscModal}
            actions={actions}
          />
        )}
      </div>
    </>
  )
}
