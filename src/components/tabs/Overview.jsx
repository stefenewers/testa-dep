export default function Overview({ loan }) {
  const d = loan
  const closingDate = d.loan?.closingDate?.slice(0, 10) || '-'
  const appDate = d.auditTrail?.find(e => e.event.toLowerCase().includes('created'))?.timestamp?.slice(0, 10) || '-'
  const creditDate = d.auditTrail?.find(e => e.event.toLowerCase().includes('credit pulled'))?.timestamp?.slice(0, 10) || '-'
  const itpDate = d.auditTrail?.find(e => e.event.toLowerCase().includes('intent to proceed'))?.timestamp?.slice(0, 10) || '-'

  return (
    <div className="two-col">
      <div className="col-main">
        <div className="cards-row">
          <div className="card">
            <div className="card-label">Stage</div>
            <div className="card-val indigo" style={{ fontSize: '14px' }}>{d.stage}</div>
          </div>
          <div className="card">
            <div className="card-label">Closing Date</div>
            <div className="card-val" style={{ fontSize: '14px', fontFamily: "'Courier New',monospace" }}>
              {d.loan?.closingDate ? new Date(d.loan.closingDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : '-'}
            </div>
          </div>
          <div className="card">
            <div className="card-label">UW Decision</div>
            <div className="card-val" style={{ fontSize: '13px' }}>{d.uwDecision}</div>
          </div>
          <div className="card">
            <div className="card-label">FICO Score</div>
            <div className="card-val indigo" style={{ fontSize: '14px' }}>{d.metrics?.fico ?? 'N/A'}</div>
          </div>
        </div>
        <div className="section-title" style={{ marginTop: '4px' }}>Loan Details</div>
        <div className="table-wrapper">
          <table className="data-table">
            <tbody>
              <tr><td style={{ color: '#6b7280' }}>Borrower</td><td style={{ fontFamily: "'Courier New',monospace", fontSize: '11.5px' }}>{d.borrower.firstName} {d.borrower.lastName}</td></tr>
              <tr><td style={{ color: '#6b7280' }}>Property</td><td style={{ fontFamily: "'Courier New',monospace", fontSize: '11.5px' }}>{d.property.address}, {d.property.city} {d.property.state} {d.property.zip}</td></tr>
              <tr><td style={{ color: '#6b7280' }}>Loan Amount</td><td style={{ fontFamily: "'Courier New',monospace", fontSize: '11.5px' }}>${d.loan?.amount?.toLocaleString()}</td></tr>
              <tr><td style={{ color: '#6b7280' }}>Purpose</td><td style={{ fontFamily: "'Courier New',monospace", fontSize: '11.5px' }}>{d.loan?.purpose}</td></tr>
              <tr><td style={{ color: '#6b7280' }}>Program</td><td style={{ fontFamily: "'Courier New',monospace", fontSize: '11.5px' }}>{d.loan?.program?.replace(/_/g, ' ')}</td></tr>
              <tr><td style={{ color: '#6b7280' }}>Interest Rate</td><td style={{ fontFamily: "'Courier New',monospace", fontSize: '11.5px' }}>{d.loan?.interestRate}%</td></tr>
              <tr><td style={{ color: '#6b7280' }}>Origination Channel</td><td style={{ fontFamily: "'Courier New',monospace", fontSize: '11.5px' }}>{d.loan?.originationChannel}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-side">
        <div className="key-dates-panel">
          <div className="kd-title">Key Dates</div>
          <div className="kd-row"><span className="kd-label">Application</span><span className="kd-val">{appDate}</span></div>
          <div className="kd-row"><span className="kd-label">Credit Pull</span><span className="kd-val">{creditDate}</span></div>
          <div className="kd-row"><span className="kd-label">Intent to Proceed</span><span className="kd-val">{itpDate}</span></div>
          <div className="kd-row"><span className="kd-label">Est. Closing</span><span className="kd-val">{closingDate}</span></div>
          <div className="kd-row"><span className="kd-label">Last Updated</span><span className="kd-val">{d.auditTrail?.[d.auditTrail.length - 1]?.timestamp?.slice(0, 10) || '-'}</span></div>
        </div>
        <div className="key-dates-panel" style={{ marginTop: '12px' }}>
          <div className="kd-title">Loan Summary</div>
          <div className="kd-row"><span className="kd-label">Loan Amount</span><span className="kd-val">${d.loan?.amount?.toLocaleString()}</span></div>
          <div className="kd-row"><span className="kd-label">Property Value</span><span className="kd-val">${d.property?.estimatedValue?.toLocaleString()}</span></div>
          <div className="kd-row"><span className="kd-label">LTV</span><span className="kd-val">{Math.round((d.metrics?.ltv || 0) * 100)}%</span></div>
          <div className="kd-row"><span className="kd-label">DTI</span><span className="kd-val">{d.metrics?.dti != null ? `${Math.round(d.metrics.dti * 100)}%` : 'N/A'}</span></div>
          <div className="kd-row"><span className="kd-label">Cash to Close</span><span className="kd-val">${d.metrics?.cashToClose?.toLocaleString() || 'N/A'}</span></div>
          <div className="kd-row"><span className="kd-label">Reserves</span><span className="kd-val">{d.metrics?.reservesMonths != null ? `${d.metrics.reservesMonths} mo` : 'N/A'}</span></div>
          <div className="kd-row"><span className="kd-label">Rate</span><span className="kd-val">{d.loan?.interestRate}%</span></div>
        </div>
      </div>
    </div>
  )
}
