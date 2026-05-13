export default function Liabilities({ loan }) {
  const liabs = loan.liabilities || []
  return (
    <>
      <div className="section-title">Liabilities</div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th><th>Type</th><th>Creditor</th><th>Property / Notes</th>
              <th>Monthly Pmt</th><th>Balance</th><th>Link Status</th>
            </tr>
          </thead>
          <tbody>
            {liabs.map(l => (
              <tr key={l.id}>
                <td style={{ fontFamily: "'Courier New',monospace", fontSize: '11px' }}>{l.id}</td>
                <td>{l.type}</td>
                <td>{l.creditor}</td>
                <td style={{ fontSize: '12px' }}>{l.propertyAddress || '-'}</td>
                <td style={{ fontFamily: "'Courier New',monospace", fontSize: '11px' }}>${l.monthlyPayment.toLocaleString()}</td>
                <td style={{ fontFamily: "'Courier New',monospace", fontSize: '11px' }}>${l.balance.toLocaleString()}</td>
                <td>
                  {l.linkedPropertyId ? (
                    <span className="link-status">
                      <span style={{ color: '#16a34a', fontWeight: 700, marginRight: '4px' }}>✓</span>
                      Linked to {l.linkedPropertyId}
                    </span>
                  ) : l.warning ? (
                    <span>
                      <span className="link-status">
                        <span style={{ color: '#d97706', marginRight: '4px' }}>⚠</span>
                        Not linked to owned property
                      </span>
                      <div style={{ fontSize: '11px', color: '#d97706', marginTop: '3px' }}>
                        {l.warning} - no mortgage statement found
                      </div>
                    </span>
                  ) : (
                    <span style={{ color: '#9ca3af', fontSize: '12px' }}>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
