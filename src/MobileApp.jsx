import { loansData } from './data/loans'
import { issuesData, pipelineLoans } from './data/issues'
import InvestigationPanel from './components/InvestigationPanel'
import Overview from './components/tabs/Overview'
import Liabilities from './components/tabs/Liabilities'
import Income from './components/tabs/Income'
import Assets from './components/tabs/Assets'
import Conditions from './components/tabs/Conditions'
import Documents from './components/tabs/Documents'
import AgentTasks from './components/tabs/AgentTasks'
import AuditTrail from './components/tabs/AuditTrail'
import LoanJSON from './components/tabs/LoanJSON'

const LOAN_TABS = [
  { key: 'overview',     label: 'Overview' },
  { key: 'liabilities',  label: 'Liabilities' },
  { key: 'income',       label: 'Income' },
  { key: 'assets',       label: 'Assets' },
  { key: 'conditions',   label: 'Conditions' },
  { key: 'documents',    label: 'Documents' },
  { key: 'agent-tasks',  label: 'Agent Tasks' },
  { key: 'audit-trail',  label: 'Audit Trail' },
  { key: 'loan-json',    label: 'Loan JSON' }
]

const DEFAULT_MUTATIONS = {
  grossUpApplied: false,
  satisfiedConditions: [],
  createdConditions: [],
  auditAppends: [],
  docClassificationRetried: [],
  ausTriggered: false,
  issueNotes: {}
}

function getMuts(loanMutations, loanId) {
  return loanMutations[loanId] || DEFAULT_MUTATIONS
}

function MobileTabBar({ currentView, onNavigate }) {
  const tabs = [
    {
      id: 'pipeline',
      label: 'Pipeline',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 20, height: 20 }}>
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
        </svg>
      )
    },
    {
      id: 'triage',
      label: 'Triage',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 20, height: 20 }}>
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      )
    },
    {
      id: 'loan',
      label: 'Loan File',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 20, height: 20 }}>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      )
    }
  ]
  return (
    <>
      {tabs.map(tab => (
        <div
          key={tab.id}
          onClick={() => onNavigate(tab.id)}
          style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 3,
            cursor: 'pointer',
            color: currentView === tab.id ? '#4F46E5' : '#9ca3af'
          }}
        >
          {tab.icon}
          <span style={{ fontSize: 10, fontWeight: 500 }}>{tab.label}</span>
        </div>
      ))}
    </>
  )
}

function MobilePipeline({ loans, onOpenLoan }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid #e5e7eb', fontSize: 15, fontWeight: 600, flexShrink: 0 }}>
        Pipeline <span style={{ fontWeight: 400, color: '#9ca3af', fontSize: 13 }}>6 loans</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {loans.map(loan => (
          <div
            key={loan.id}
            onClick={() => onOpenLoan(loan.id)}
            style={{
              padding: '14px 16px',
              borderBottom: '1px solid #f3f4f6',
              cursor: 'pointer',
              background: '#fff'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontFamily: "'Courier New',monospace", fontSize: 12, color: '#4F46E5', fontWeight: 600 }}>
                {loan.id}
              </span>
              {loan.issues > 0 && (
                <span style={{
                  background: '#FEF2F2', color: '#dc2626',
                  fontSize: 11, fontWeight: 700,
                  padding: '2px 8px', borderRadius: 10
                }}>
                  {loan.issues} issue{loan.issues > 1 ? 's' : ''}
                </span>
              )}
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#111827', marginBottom: 6 }}>
              {loan.borrower}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{
                background: '#EEF2FF', color: '#4F46E5',
                fontSize: 11, fontWeight: 500,
                padding: '2px 8px', borderRadius: 10
              }}>
                {loan.stage}
              </span>
              <span style={{ fontSize: 12, color: '#6b7280' }}>{loan.amount}</span>
              <span style={{ fontSize: 12, color: '#9ca3af' }}>Closes {loan.closing}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MobileTriage({
  issues, issueStatuses, loanMutations, selectedIssueId,
  onSelectIssue, onOpenLoan, onOpenEscModal, actions
}) {
  const open = issues.filter(i => (issueStatuses[i.id] || i.status) !== 'resolved')
  const sortedIssues = [...issues].sort((a, b) => {
    const order = { High: 0, Medium: 1, Low: 2 }
    return order[a.severity] - order[b.severity]
  })

  const selectedIssue = selectedIssueId ? issues.find(i => i.id === selectedIssueId) : null
  const selectedLoan = selectedIssue ? loansData[selectedIssue.loanId] : null
  const selectedMuts = selectedIssue ? getMuts(loanMutations, selectedIssue.loanId) : null

  return (
    <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {!selectedIssue ? (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid #e5e7eb', fontSize: 15, fontWeight: 600 }}>
            Triage Queue <span style={{ fontWeight: 400, color: '#9ca3af', fontSize: 13 }}>{open.length} active</span>
          </div>
          {sortedIssues.map(issue => (
            <div
              key={issue.id}
              onClick={() => onSelectIssue(issue.id)}
              style={{ padding: '14px 16px', borderBottom: '1px solid #f3f4f6', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 }}>
                <span style={{
                  fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 4,
                  background: issue.severity === 'High' ? '#FEF2F2' : '#FFFBEB',
                  color: issue.severity === 'High' ? '#dc2626' : '#d97706'
                }}>
                  {issue.severity}
                </span>
                <span style={{ fontSize: 11, color: '#9ca3af' }}>{issue.openSince}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#111827', marginBottom: 4, lineHeight: 1.4 }}>
                {issue.title}
              </div>
              <div style={{ fontSize: 11, color: '#4F46E5', fontFamily: "'Courier New',monospace" }}>
                {issue.loanId} · {issue.borrower}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{
            padding: '12px 16px', borderBottom: '1px solid #e5e7eb',
            display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0,
            background: '#fff', position: 'sticky', top: 0, zIndex: 10
          }}>
            <button
              onClick={() => onSelectIssue(null)}
              style={{
                background: 'none', border: 'none', color: '#4F46E5',
                fontSize: 14, cursor: 'pointer', padding: '4px 0', fontFamily: 'Inter,sans-serif'
              }}
            >
              ← Back
            </button>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>
              {selectedIssue.type}
            </span>
          </div>
          <InvestigationPanel
            issue={selectedIssue}
            loan={selectedLoan}
            mutations={selectedMuts}
            issueStatus={issueStatuses[selectedIssue.id] || selectedIssue.status}
            onOpenLoan={onOpenLoan}
            onOpenEscModal={onOpenEscModal}
            actions={actions}
          />
        </div>
      )}
    </div>
  )
}

function MobileLoan({ loan, mutations, currentTab, onShowTab, onBack, actions }) {
  const dti = loan.metrics?.dti
  const tabProps = { loan, mutations, actions }

  return (
    <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        padding: '10px 16px', borderBottom: '1px solid #e5e7eb',
        background: '#fff', flexShrink: 0
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'none', border: 'none', color: '#4F46E5',
            fontSize: 13, cursor: 'pointer', marginBottom: 6, padding: 0,
            fontFamily: 'Inter,sans-serif'
          }}
        >
          ← Back
        </button>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>
          {loan.borrower.firstName} {loan.borrower.lastName}
        </div>
        <div style={{ fontSize: 11, color: '#9ca3af', fontFamily: "'Courier New',monospace", marginTop: 2 }}>
          {loan.loanId} · {loan.loan?.purpose} · ${loan.loan?.amount?.toLocaleString()}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, color: '#6b7280' }}>
            DTI <strong style={{ color: dti > 0.45 ? '#dc2626' : dti > 0.40 ? '#4F46E5' : '#111827' }}>
              {dti ? `${Math.round(dti * 100)}%` : 'N/A'}
            </strong>
          </span>
          <span style={{ fontSize: 11, color: '#6b7280' }}>FICO <strong>{loan.metrics?.fico ?? 'N/A'}</strong></span>
          <span style={{ fontSize: 11, color: '#6b7280' }}>LTV <strong>{loan.metrics?.ltv ? `${Math.round(loan.metrics.ltv * 100)}%` : 'N/A'}</strong></span>
          <span style={{
            background: '#EEF2FF', color: '#4F46E5',
            fontSize: 10, fontWeight: 500, padding: '1px 7px', borderRadius: 8
          }}>
            {loan.stage}
          </span>
        </div>
      </div>
      <div style={{
        display: 'flex', overflowX: 'auto', borderBottom: '1px solid #e5e7eb',
        background: '#fff', flexShrink: 0,
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none'
      }}>
        {LOAN_TABS.map(tab => (
          <div
            key={tab.key}
            onClick={() => onShowTab(tab.key)}
            style={{
              padding: '10px 14px',
              fontSize: 13, fontWeight: 500,
              color: currentTab === tab.key ? '#4F46E5' : '#6b7280',
              borderBottom: currentTab === tab.key ? '2px solid #4F46E5' : '2px solid transparent',
              whiteSpace: 'nowrap', cursor: 'pointer', flexShrink: 0
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {currentTab === 'overview'    && <Overview {...tabProps} />}
        {currentTab === 'liabilities' && <Liabilities {...tabProps} />}
        {currentTab === 'income'      && <Income {...tabProps} />}
        {currentTab === 'assets'      && <Assets {...tabProps} />}
        {currentTab === 'conditions'  && <Conditions {...tabProps} />}
        {currentTab === 'documents'   && <Documents {...tabProps} />}
        {currentTab === 'agent-tasks' && <AgentTasks {...tabProps} />}
        {currentTab === 'audit-trail' && <AuditTrail {...tabProps} />}
        {currentTab === 'loan-json'   && <LoanJSON {...tabProps} />}
      </div>
    </div>
  )
}

export default function MobileApp({
  state, actions,
  openLoan, showView, showTab, selectIssue, onOpenEscModal
}) {
  const { currentView, currentLoanId, currentTab, selectedIssueId, issueStatuses, loanMutations } = state
  const currentLoan = currentLoanId ? loansData[currentLoanId] : null
  const currentMuts = currentLoanId ? getMuts(loanMutations, currentLoanId) : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', background: '#fff', overflow: 'hidden' }}>
      {/* Persistent mobile header */}
      <div style={{
        height: 52,
        borderBottom: '1px solid #e5e7eb',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 16,
        flexShrink: 0,
        paddingTop: 'env(safe-area-inset-top)'
      }}>
        <img
          src="/testa.png"
          alt="Testa"
          style={{ height: 22, width: 44, objectFit: 'contain', objectPosition: 'center' }}
        />
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {currentView === 'pipeline' && (
          <MobilePipeline loans={pipelineLoans} onOpenLoan={openLoan} />
        )}
        {currentView === 'triage' && (
          <MobileTriage
            issues={issuesData}
            issueStatuses={issueStatuses}
            loanMutations={loanMutations}
            selectedIssueId={selectedIssueId}
            onSelectIssue={selectIssue}
            onOpenLoan={openLoan}
            onOpenEscModal={onOpenEscModal}
            actions={actions}
          />
        )}
        {currentView === 'loan' && currentLoan && (
          <MobileLoan
            loan={currentLoan}
            mutations={currentMuts}
            currentTab={currentTab}
            onShowTab={showTab}
            onBack={() => showView('pipeline')}
            actions={actions}
          />
        )}
        {currentView === 'loan' && !currentLoan && (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: 14 }}>
            No loan selected. Go to Pipeline to open a loan.
          </div>
        )}
      </div>
      {currentView !== 'loan' && (
        <div style={{
          display: 'flex',
          borderTop: '1px solid #e5e7eb',
          background: '#fff',
          flexShrink: 0,
          paddingBottom: 'env(safe-area-inset-bottom)',
          minHeight: 56
        }}>
          <MobileTabBar currentView={currentView} onNavigate={showView} />
        </div>
      )}
    </div>
  )
}
