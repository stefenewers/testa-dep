export default function Income({ loan, mutations, actions }) {
  const income = loan.income || []
  const grossUpApplied = mutations?.grossUpApplied || false
  const currentTotal = grossUpApplied
    ? (loan.metrics?.qualifiedIncomeCorrected || loan.metrics?.qualifiedIncome)
    : loan.metrics?.qualifiedIncome
  const correctedTotal = loan.metrics?.qualifiedIncomeCorrected

  const ssIncome = income.find(i => i.type === 'SOCIAL_SECURITY')
  const hasGrossUpIssue = ssIncome && ssIncome.grossUpRequired && !grossUpApplied

  return (
    <>
      <div className="section-title">Income Summary</div>
      <div className="table-wrapper" style={{ marginBottom: '16px' }}>
        <table className="data-table">
          <thead>
            <tr><th>Source</th><th>Type</th><th>Monthly</th><th>Annual</th><th>Status</th><th>Notes</th></tr>
          </thead>
          <tbody>
            {income.map(inc => {
              const isSSGrossUp = inc.type === 'SOCIAL_SECURITY' && inc.grossUpRequired
              const annualDisplay = isSSGrossUp && grossUpApplied
                ? inc.annualAmountCorrected
                : inc.annualAmount
              return (
                <tr key={inc.id}>
                  <td>{inc.employer || inc.type.replace('_', ' ')}</td>
                  <td>{inc.type.replace(/_/g, ' ')}</td>
                  <td style={{ fontFamily: "'Courier New',monospace", fontSize: '11px' }}>
                    ${inc.monthlyAmount.toLocaleString()}
                  </td>
                  <td style={{ fontFamily: "'Courier New',monospace", fontSize: '11px' }}>
                    ${annualDisplay.toLocaleString()}
                  </td>
                  <td>
                    <span className={inc.verificationStatus === 'VERIFIED' ? 'status-satisfied' : 'status-pending'}>
                      {inc.verificationStatus}
                    </span>
                  </td>
                  <td style={{ fontSize: '11px' }}>
                    {isSSGrossUp && !grossUpApplied && (
                      <div className="flag-amber">
                        ⚠ Gross-up not applied. Fannie Mae B3-3.1-09: 25% gross-up permitted for non-taxable SS income.
                        Corrected: ${inc.annualAmountCorrected?.toLocaleString()}/yr
                      </div>
                    )}
                    {isSSGrossUp && grossUpApplied && (
                      <div className="flag-green">✓ Gross-up applied (x1.25). Corrected: ${inc.annualAmountCorrected?.toLocaleString()}/yr</div>
                    )}
                    {inc.source && !isSSGrossUp && (
                      <span style={{ color: '#6b7280' }}>Verified via {inc.source.replace(/_/g, ' ')}</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="data-block" style={{ maxWidth: '420px' }}>
        <div className="data-block-title">Qualified Income Totals</div>
        {income.filter(i => i.type !== 'SOCIAL_SECURITY' || !i.grossUpRequired).map(i => (
          <div className="data-row" key={i.id}>
            <span className="data-key">{i.employer || i.type}</span>
            <span className="data-val">${i.annualAmount.toLocaleString()}</span>
          </div>
        ))}
        {ssIncome && ssIncome.grossUpRequired && (
          <div className="data-row">
            <span className="data-key">Social Security (as calculated)</span>
            <span className="data-val">${(grossUpApplied ? ssIncome.annualAmountCorrected : ssIncome.annualAmount).toLocaleString()}</span>
          </div>
        )}
        <div className="data-row">
          <span className="data-key">Total Qualified Income</span>
          <span className="data-val" style={{ color: grossUpApplied ? '#16a34a' : (hasGrossUpIssue ? '#d97706' : undefined), fontWeight: 600 }}>
            ${currentTotal?.toLocaleString() || 'N/A'}
          </span>
        </div>
        {hasGrossUpIssue && correctedTotal && (
          <div className="data-row">
            <span className="data-key">Corrected Total (with gross-up)</span>
            <span className="data-val" style={{ color: '#16a34a' }}>${correctedTotal.toLocaleString()}</span>
          </div>
        )}
      </div>
      {hasGrossUpIssue && (
        <div style={{ marginTop: '12px' }}>
          <div className="section-label">Apply Correction</div>
          <div className="editable-field-row">
            <span style={{ fontSize: '12px', color: '#374151' }}>Gross-up factor:</span>
            <input className="edit-input" value={`x${ssIncome.grossUpFactor}`} readOnly />
            <span style={{ fontSize: '12px', color: '#374151' }}>Corrected SS income:</span>
            <input className="edit-input" value={`$${ssIncome.annualAmountCorrected?.toLocaleString()}`} readOnly />
            <button
              className="btn btn-primary"
              onClick={() => actions.applyGrossUp(loan.loanId, null, '')}
            >
              Apply correction
            </button>
          </div>
        </div>
      )}
      {grossUpApplied && (
        <div className="inline-confirm" style={{ marginTop: '12px', maxWidth: '420px' }}>
          ✓ Gross-up correction applied by S. Ewers.
        </div>
      )}
    </>
  )
}
