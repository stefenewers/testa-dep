import Overview from './tabs/Overview'
import Liabilities from './tabs/Liabilities'
import Income from './tabs/Income'
import Assets from './tabs/Assets'
import Conditions from './tabs/Conditions'
import Documents from './tabs/Documents'
import AgentTasks from './tabs/AgentTasks'
import AuditTrail from './tabs/AuditTrail'
import LoanJSON from './tabs/LoanJSON'

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'liabilities', label: 'Liabilities' },
  { key: 'income', label: 'Income' },
  { key: 'assets', label: 'Assets' },
  { key: 'conditions', label: 'Conditions' },
  { key: 'documents', label: 'Documents' },
  { key: 'agent-tasks', label: 'Agent Tasks' },
  { key: 'audit-trail', label: 'Audit Trail' },
  { key: 'loan-json', label: 'Loan JSON' }
]

export default function LoanFile({ loan, mutations, currentTab, onShowTab, onBack, actions }) {
  const d = loan
  const dti = d.metrics?.dti
  const dtiCls = dti == null ? '' : dti > 0.45 ? 'red' : dti > 0.40 ? 'indigo' : ''
  const dtiLabel = dti == null ? 'N/A' : `${Math.round(dti * 100)}%${dti > 0.40 ? ' ▲' : ''}`

  const tabProps = { loan, mutations, actions }

  return (
    <>
      <div className="loan-header-bar">
        <span
          className="back-btn"
          onClick={onBack}
          style={{ color: '#6b7280', cursor: 'pointer', marginRight: '4px' }}
        >
          ←
        </span>
        <span className="loan-id-h">#{d.loanId}</span>
        <span className="sep">|</span>
        <span style={{ fontWeight: 500 }}>{d.borrower.firstName} {d.borrower.lastName}</span>
        <span className="sep">|</span>
        <span style={{ color: '#6b7280', fontSize: '12px' }}>
          {d.property.address}, {d.property.city} {d.property.state} {d.property.zip}
        </span>
        <span className="sep">|</span>
        <span className="metric-item">
          <span className="metric-label">LTV:</span>{' '}
          <span className="metric-val">{Math.round((d.metrics?.ltv || 0) * 100)}%</span>
        </span>
        <span className="metric-item">
          <span className="metric-label">DTI:</span>{' '}
          <span className={`metric-val ${dtiCls}`}>{dtiLabel}</span>
        </span>
        <span className="metric-item">
          <span className="metric-label">FICO:</span>{' '}
          <span className="metric-val">{d.metrics?.fico ?? 'N/A'}</span>
        </span>
        <span className="metric-item">
          <span className="metric-label">Program:</span>{' '}
          <span className="metric-val">Conv 30yr Fixed</span>
        </span>
        <span className="metric-item">
          <span className="metric-label">Stage:</span>{' '}
          <span className="stage-pill" style={{ fontSize: '11px' }}>{d.stage}</span>
        </span>
        <span className="metric-item">
          <span className="metric-label">UW:</span>{' '}
          <span className="metric-val">{d.uwDecision}</span>
        </span>
      </div>
      <div className="tabs-bar">
        {TABS.map(tab => (
          <div
            key={tab.key}
            className={`tab${currentTab === tab.key ? ' active' : ''}`}
            onClick={() => onShowTab(tab.key)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="loan-file-body">
        <div className="tab-content" style={{ display: currentTab === 'overview' ? 'block' : 'none' }}>
          <Overview {...tabProps} />
        </div>
        <div className="tab-content" style={{ display: currentTab === 'liabilities' ? 'block' : 'none' }}>
          <Liabilities {...tabProps} />
        </div>
        <div className="tab-content" style={{ display: currentTab === 'income' ? 'block' : 'none' }}>
          <Income {...tabProps} />
        </div>
        <div className="tab-content" style={{ display: currentTab === 'assets' ? 'block' : 'none' }}>
          <Assets {...tabProps} />
        </div>
        <div className="tab-content" style={{ display: currentTab === 'conditions' ? 'block' : 'none' }}>
          <Conditions {...tabProps} />
        </div>
        <div className="tab-content" style={{ display: currentTab === 'documents' ? 'block' : 'none' }}>
          <Documents {...tabProps} />
        </div>
        <div className="tab-content" style={{ display: currentTab === 'agent-tasks' ? 'block' : 'none' }}>
          <AgentTasks {...tabProps} />
        </div>
        <div className="tab-content" style={{ display: currentTab === 'audit-trail' ? 'block' : 'none' }}>
          <AuditTrail {...tabProps} />
        </div>
        <div className="tab-content" style={{ display: currentTab === 'loan-json' ? 'block' : 'none' }}>
          <LoanJSON {...tabProps} />
        </div>
      </div>
    </>
  )
}
