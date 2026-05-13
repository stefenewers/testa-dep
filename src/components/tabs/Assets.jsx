export default function Assets({ loan, mutations }) {
  const accounts = loan.assets?.bankAccounts || []
  const createdConds = mutations?.createdConditions || []

  return (
    <>
      {accounts.map(acct => (
        <div key={acct.id}>
          <div className="section-title">
            {acct.institution} {acct.accountType} {acct.accountNumberMasked}
          </div>
          <div style={{ marginBottom: '12px', fontSize: '12px', color: '#6b7280' }}>
            Balance:{' '}
            <strong style={{ color: '#111827', fontFamily: "'Courier New',monospace" }}>
              ${acct.balance.toLocaleString()}
            </strong>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr><th>Date</th><th>Description</th><th>Amount</th><th>Status</th></tr>
              </thead>
              <tbody>
                {(acct.transactions || []).map((tx, i) => {
                  const condMade = tx.agentMissed && createdConds.length > 0
                  const rowStyle = tx.flagged
                    ? { background: '#FEF2F2' }
                    : tx.agentMissed
                      ? { background: '#FFFBEB' }
                      : {}
                  return (
                    <tr key={i} style={rowStyle}>
                      <td style={{ fontFamily: "'Courier New',monospace", fontSize: '11px' }}>{tx.date}</td>
                      <td>{tx.description}</td>
                      <td style={{ fontFamily: "'Courier New',monospace", fontSize: '11px' }}>
                        +${tx.amount.toLocaleString()}
                      </td>
                      <td>
                        {tx.flagged ? (
                          <div className="flag-red">
                            ⛔ LOE condition created · {tx.conditionId}
                          </div>
                        ) : tx.agentMissed ? (
                          <>
                            <div className="flag-amber">
                              ⚠ Exceeds $10,000 threshold. No condition created.
                            </div>
                            {condMade && (
                              <div style={{ fontSize: '11px', color: '#16a34a', marginTop: '2px' }}>
                                ✓ Condition created by S. Ewers
                              </div>
                            )}
                          </>
                        ) : (
                          <span className="flag-green">✓ No flag</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      {accounts.length === 0 && (
        <div style={{ color: '#9ca3af', fontSize: '13px' }}>No bank accounts on file.</div>
      )}
    </>
  )
}
