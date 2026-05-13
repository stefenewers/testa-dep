import { useState } from 'react'
import { loansData } from './data/loans'
import { issuesData, pipelineLoans } from './data/issues'
import Sidebar from './components/Sidebar'
import Pipeline from './components/Pipeline'
import TriageQueue from './components/TriageQueue'
import LoanFile from './components/LoanFile'
import EscalationModal from './components/EscalationModal'

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

export default function App() {
  const [state, setState] = useState({
    currentView: 'pipeline',
    currentLoanId: null,
    currentTab: 'overview',
    selectedIssueId: null,
    issueStatuses: {},
    loanMutations: {}
  })
  const [escIssueId, setEscIssueId] = useState(null)

  function updateMuts(loanId, updater) {
    setState(prev => ({
      ...prev,
      loanMutations: {
        ...prev.loanMutations,
        [loanId]: updater(prev.loanMutations[loanId] || { ...DEFAULT_MUTATIONS, issueNotes: {} })
      }
    }))
  }

  function addAuditEntry(loanId, event, actor, actorId) {
    updateMuts(loanId, m => ({
      ...m,
      auditAppends: [{
        id: `EVT-analyst-${Date.now()}`,
        timestamp: new Date().toISOString(),
        event,
        actor,
        actorId: actorId || 'S. Ewers'
      }, ...(m.auditAppends || [])]
    }))
  }

  function openLoan(loanId) {
    setState(prev => ({ ...prev, currentView: 'loan', currentLoanId: loanId, currentTab: 'overview' }))
  }

  function showView(v) {
    setState(prev => ({ ...prev, currentView: v }))
  }

  function showTab(t) {
    setState(prev => ({ ...prev, currentTab: t }))
  }

  function selectIssue(id) {
    setState(prev => {
      const current = prev.issueStatuses[id]
      return {
        ...prev,
        selectedIssueId: id,
        issueStatuses: {
          ...prev.issueStatuses,
          [id]: (!current || current === 'open') ? 'investigating' : current
        }
      }
    })
  }

  function setIssueStatus(id, status) {
    setState(prev => ({
      ...prev,
      issueStatuses: { ...prev.issueStatuses, [id]: status }
    }))
  }

  function saveNote(loanId, issueId, note) {
    updateMuts(loanId, m => ({
      ...m,
      issueNotes: { ...(m.issueNotes || {}), [issueId]: note }
    }))
  }

  // ── Actions ──────────────────────────────────────────────────────────────

  function applyGrossUp(loanId, issueId, diagnosis) {
    updateMuts(loanId, m => ({ ...m, grossUpApplied: true }))
    if (issueId) setIssueStatus(issueId, 'resolved')
    const note = diagnosis ? ` Diagnosis: ${diagnosis}` : ''
    addAuditEntry(loanId, `SS gross-up correction applied. Qualified income updated to corrected figure.${note}`, 'analyst', 'S. Ewers')
  }

  function satisfyCondition(loanId, condId, issueId, diagnosis) {
    updateMuts(loanId, m => ({
      ...m,
      satisfiedConditions: [...(m.satisfiedConditions || []), condId]
    }))
    setIssueStatus(issueId, 'resolved')
    const note = diagnosis ? ` Diagnosis: ${diagnosis}` : ''
    addAuditEntry(loanId, `${condId} manually satisfied by S. Ewers. Document linked to condition.${note}`, 'analyst', 'S. Ewers')
  }

  function createCondition(loanId, condObj, issueId, diagnosis) {
    updateMuts(loanId, m => ({
      ...m,
      createdConditions: [...(m.createdConditions || []), condObj]
    }))
    setIssueStatus(issueId, 'resolved')
    const note = diagnosis ? ` Diagnosis: ${diagnosis}` : ''
    addAuditEntry(loanId, `${condObj.id} created: ${condObj.description}. Assigned to borrower.${note}`, 'analyst', 'S. Ewers')
  }

  function retryDoc(loanId, docId, issueId) {
    updateMuts(loanId, m => ({
      ...m,
      docClassificationRetried: [...(m.docClassificationRetried || []), docId]
    }))
    addAuditEntry(loanId, `Doc Intelligence classification retry triggered for ${docId}.`, 'analyst', 'S. Ewers')
  }

  function manualClassifyDoc(loanId, docId, issueId, diagnosis) {
    setIssueStatus(issueId, 'resolved')
    const note = diagnosis ? ` Diagnosis: ${diagnosis}` : ''
    addAuditEntry(loanId, `${docId} manually classified as BANK_STATEMENT by analyst S. Ewers. Linked to account.${note}`, 'analyst', 'S. Ewers')
  }

  function triggerAUS(loanId, issueId) {
    updateMuts(loanId, m => ({ ...m, ausTriggered: true }))
    setIssueStatus(issueId, 'investigating')
    addAuditEntry(loanId, `AUS manually triggered for ${loanId}. DU submission queued.`, 'analyst', 'S. Ewers')
  }

  function resolveIssue(issueId, loanId, action, diagnosis) {
    setIssueStatus(issueId, 'resolved')
    const note = diagnosis ? ` Diagnosis: ${diagnosis}` : ''
    const msg = action === 'doc-gap'
      ? `Doc gap identified. Borrower task created: provide mortgage statement.`
      : `Agent re-triggered for liability linking with manual doc link.`
    addAuditEntry(loanId, `${msg}${note}`, 'analyst', 'S. Ewers')
  }

  function submitEscalation(issueId, loanId, details) {
    setIssueStatus(issueId, 'escalated')
    const iss = issuesData.find(i => i.id === issueId)
    addAuditEntry(
      loanId,
      `Escalated to Engineering: ${iss.type} on ${loanId}. Severity: ${details.severity}. ${details.summary || 'No summary.'}`,
      'analyst',
      'S. Ewers'
    )
    setEscIssueId(null)
  }

  // ── Derived data ─────────────────────────────────────────────────────────

  const currentLoan = state.currentLoanId ? loansData[state.currentLoanId] : null
  const currentMuts = state.currentLoanId ? getMuts(state.loanMutations, state.currentLoanId) : null

  const actions = {
    applyGrossUp,
    satisfyCondition,
    createCondition,
    retryDoc,
    manualClassifyDoc,
    triggerAUS,
    resolveIssue,
    saveNote
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar currentView={state.currentView} onNavigate={showView} />
      <div id="main">
        <div className={`view${state.currentView === 'pipeline' ? ' active' : ''}`} id="view-pipeline">
          <Pipeline loans={pipelineLoans} onOpenLoan={openLoan} />
        </div>
        <div className={`view${state.currentView === 'triage' ? ' active' : ''}`} id="view-triage">
          <TriageQueue
            issues={issuesData}
            issueStatuses={state.issueStatuses}
            loanMutations={state.loanMutations}
            selectedIssueId={state.selectedIssueId}
            onSelectIssue={selectIssue}
            onOpenLoan={openLoan}
            onOpenEscModal={setEscIssueId}
            actions={actions}
          />
        </div>
        <div className={`view${state.currentView === 'loan' ? ' active' : ''}`} id="view-loan">
          {currentLoan && (
            <LoanFile
              loan={currentLoan}
              mutations={currentMuts}
              currentTab={state.currentTab}
              onShowTab={showTab}
              onBack={() => showView('pipeline')}
              actions={actions}
            />
          )}
        </div>
      </div>
      {escIssueId && (
        <EscalationModal
          issue={issuesData.find(i => i.id === escIssueId)}
          diagnosisNote={getMuts(state.loanMutations, issuesData.find(i => i.id === escIssueId)?.loanId || '').issueNotes?.[escIssueId] || ''}
          onClose={() => setEscIssueId(null)}
          onSubmit={(details) => submitEscalation(escIssueId, issuesData.find(i => i.id === escIssueId).loanId, details)}
        />
      )}
    </div>
  )
}
