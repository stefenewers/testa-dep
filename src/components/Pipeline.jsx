export default function Pipeline({ loans, onOpenLoan }) {
  return (
    <>
      <div className="view-header">
        Pipeline <span style={{ fontWeight: 400, color: '#6b7280', fontSize: '12px', marginLeft: '8px' }}>6 loans</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', background: '#fff' }}>
        <table className="pipeline-table">
          <thead>
            <tr>
              <th>Loan</th><th>Borrower</th><th>Stage</th><th>Amount</th>
              <th>Closing</th><th>Tasks</th><th>Issues</th>
            </tr>
          </thead>
          <tbody>
            {loans.map(l => (
              <tr key={l.id} onClick={() => onOpenLoan(l.id)}>
                <td><span className="loan-id">{l.id}</span></td>
                <td>{l.borrower}</td>
                <td><span className="stage-pill">{l.stage}</span></td>
                <td>{l.amount}</td>
                <td style={{ fontFamily: "'Courier New',monospace", fontSize: '12px' }}>{l.closing}</td>
                <td><span className="task-link">{l.tasks} tasks</span></td>
                <td>
                  {l.issues > 0
                    ? <span className="issue-badge">{l.issues}</span>
                    : <span style={{ color: '#9ca3af', fontSize: '12px' }}>-</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
