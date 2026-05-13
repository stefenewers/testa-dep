export default function Documents({ loan, mutations }) {
  const docs = loan.documents || []
  const retried = mutations?.docClassificationRetried || []

  return (
    <>
      <div className="section-title">Documents</div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>File</th><th>Type</th><th>Uploaded</th>
              <th>Classification</th><th>Time to Classify</th><th>Linked To</th>
            </tr>
          </thead>
          <tbody>
            {docs.map(doc => {
              const isStuck = doc.classificationStatus === 'PROCESSING'
              const wasRetried = retried.includes(doc.id)
              const isLoeNotLinked = doc.type === 'LETTER_OF_EXPLANATION_EMPLOYMENT' && doc.conditionSatisfiedAt === null && doc.note
              return (
                <tr key={doc.id} style={isStuck ? { background: '#FFFBEB' } : isLoeNotLinked ? { background: '#FFFBEB' } : {}}>
                  <td>{doc.filename}</td>
                  <td style={{ color: isStuck ? '#d97706' : undefined }}>{doc.type || '-'}</td>
                  <td style={{ fontFamily: "'Courier New',monospace", fontSize: '11px' }}>
                    {doc.uploadedAt?.replace('T', ' ').slice(0, 16)}
                  </td>
                  <td>
                    {isStuck ? (
                      <>
                        <span className="status-processing">PROCESSING</span>
                        <div style={{ fontSize: '10px', color: '#d97706', marginTop: '2px' }}>
                          Stuck {doc.classificationTime} - no completion event
                        </div>
                        {wasRetried && (
                          <div style={{ fontSize: '10px', color: '#4F46E5', marginTop: '2px' }}>Retry queued</div>
                        )}
                      </>
                    ) : (
                      <>
                        <span className="status-classified">CLASSIFIED</span>
                        {isLoeNotLinked && (
                          <div style={{ fontSize: '10px', color: '#d97706', marginTop: '2px' }}>
                            conditionId: null - condition not satisfied
                          </div>
                        )}
                      </>
                    )}
                  </td>
                  <td style={{ fontFamily: "'Courier New',monospace", fontSize: '11px' }}>
                    {isStuck ? (
                      <span style={{ color: '#d97706' }}>{doc.classificationTime}</span>
                    ) : (
                      doc.classificationTime
                    )}
                  </td>
                  <td style={{ color: isStuck ? '#dc2626' : undefined }}>
                    {doc.linkedTo || '-'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
