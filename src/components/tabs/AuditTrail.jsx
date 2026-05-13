const DOT_CLS = {
  system: 'dot-system',
  agent: 'dot-agent',
  rules_engine: 'dot-rules_engine',
  loan_officer: 'dot-loan_officer',
  borrower: 'dot-borrower',
  analyst: 'dot-analyst'
}

export default function AuditTrail({ loan, mutations }) {
  const base = loan.auditTrail || []
  const appends = mutations?.auditAppends || []
  const merged = [...appends, ...base].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

  return (
    <>
      <div className="section-title">Audit Trail</div>
      {merged.map(ev => (
        <div className="audit-entry" key={ev.id}>
          <div className={`audit-dot ${DOT_CLS[ev.actor] || 'dot-system'}`} />
          <div className="audit-ts">{ev.timestamp.replace('T', ' ')}</div>
          <div className="audit-event">{ev.event}</div>
          <div className="audit-actor">{ev.actor}</div>
        </div>
      ))}
      {merged.length === 0 && (
        <div style={{ color: '#9ca3af', fontSize: '13px' }}>No audit trail entries.</div>
      )}
    </>
  )
}
