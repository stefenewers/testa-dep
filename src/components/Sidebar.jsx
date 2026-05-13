export default function Sidebar({ currentView, onNavigate }) {
  return (
    <div id="sidebar">
      <img src="/testa.png" alt="Testa" />
      <div
        className={`nav-icon${currentView === 'pipeline' ? ' active' : ''}`}
        title="Pipeline"
        onClick={() => onNavigate('pipeline')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
        </svg>
      </div>
      <div
        className={`nav-icon${currentView === 'triage' ? ' active' : ''}`}
        title="Triage Queue"
        onClick={() => onNavigate('triage')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>
      <div
        className={`nav-icon${currentView === 'loan' ? ' active' : ''}`}
        title="Loan File"
        onClick={() => onNavigate('loan')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      </div>
    </div>
  )
}
