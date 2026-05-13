import { useState } from 'react'

export default function EscalationModal({ issue, diagnosisNote, onClose, onSubmit }) {
  const [summary, setSummary] = useState(diagnosisNote || '')
  const [steps, setSteps] = useState('')
  const [action, setAction] = useState('')
  const [severity, setSeverity] = useState(issue.severity === 'High' ? 'P1' : 'P2')

  const dataSnapshot = JSON.stringify({
    issueId: issue.id,
    loanId: issue.loanId,
    type: issue.type,
    severity: issue.severity,
    openSince: issue.openSince
  }, null, 2)

  function handleSubmit() {
    onSubmit({ summary, steps, action, severity })
    alert('Escalation submitted. Audit trail updated. Engineering team notified.')
  }

  return (
    <div className="modal-overlay open">
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">Escalate to Engineering</span>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Issue Type</label>
            <input className="form-input" value={issue.type} readOnly />
          </div>
          <div className="form-group">
            <label className="form-label">Affected Loan ID</label>
            <input className="form-input" value={issue.loanId} readOnly />
          </div>
          <div className="form-group">
            <label className="form-label">Summary of Investigation</label>
            <textarea
              className="form-textarea"
              placeholder="Describe what you investigated and what you found..."
              value={summary}
              onChange={e => setSummary(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Steps to Reproduce</label>
            <textarea
              className="form-textarea"
              placeholder={'Step 1: ...\nStep 2: ...'}
              value={steps}
              onChange={e => setSteps(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Relevant Data Snapshot</label>
            <textarea
              className="form-textarea"
              style={{ fontFamily: "'Courier New',monospace", fontSize: '11px' }}
              defaultValue={dataSnapshot}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Recommended Action</label>
            <input
              className="form-input"
              placeholder="e.g. Investigate workflow trigger, check automation queue..."
              value={action}
              onChange={e => setAction(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Severity</label>
            <select className="form-select" value={severity} onChange={e => setSeverity(e.target.value)}>
              <option value="P1">P1 - Critical</option>
              <option value="P2">P2 - High</option>
              <option value="P3">P3 - Medium</option>
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Submit Escalation</button>
        </div>
      </div>
    </div>
  )
}
