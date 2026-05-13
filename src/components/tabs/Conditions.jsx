export default function Conditions({ loan, mutations }) {
  const baseConds = loan.conditions || []
  const satisfiedByAnalyst = mutations?.satisfiedConditions || []
  const createdConds = mutations?.createdConditions || []

  const allConds = [...baseConds, ...createdConds]

  function getStatus(cond) {
    if (satisfiedByAnalyst.includes(cond.id)) return 'SATISFIED'
    return cond.status
  }

  function getSatisfiedAt(cond) {
    if (satisfiedByAnalyst.includes(cond.id)) return new Date().toISOString().slice(0, 10)
    return cond.satisfiedAt ? cond.satisfiedAt.slice(0, 10) : '-'
  }

  function statusClass(status) {
    if (status === 'SATISFIED') return 'status-satisfied'
    if (status === 'PENDING_BORROWER') return 'status-pending'
    return 'status-open'
  }

  return (
    <>
      <div className="section-title">Conditions</div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr><th>ID</th><th>Description</th><th>Assigned</th><th>Status</th><th>Satisfied</th></tr>
          </thead>
          <tbody>
            {allConds.map(cond => {
              const st = getStatus(cond)
              const satAt = getSatisfiedAt(cond)
              const isAnalystSatisfied = satisfiedByAnalyst.includes(cond.id)
              return (
                <tr key={cond.id} className={st !== 'SATISFIED' ? 'highlight-row' : ''}>
                  <td style={{ fontFamily: "'Courier New',monospace", fontSize: '11px' }}>{cond.id}</td>
                  <td>
                    {cond.description}
                    {cond.documentUploaded && (
                      <div className="cond-doc-note">
                        {cond.documentUploaded} uploaded ·
                        {isAnalystSatisfied ? ' Condition satisfied by analyst' : ' conditionId: null - condition not auto-satisfied'}
                      </div>
                    )}
                    {cond.note && !cond.documentUploaded && (
                      <div className="cond-doc-note">{cond.note}</div>
                    )}
                  </td>
                  <td>{cond.assignedTo || 'BORROWER'}</td>
                  <td><span className={statusClass(st)}>{st}</span></td>
                  <td style={{ fontFamily: "'Courier New',monospace", fontSize: '11px' }}>{satAt}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
