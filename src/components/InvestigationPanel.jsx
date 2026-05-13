import { useState } from 'react'

function DR({ k, v, vc }) {
  return (
    <div className="data-row">
      <span className="data-key">{k}</span>
      <span className="data-val" style={vc ? { color: vc } : {}}>{v}</span>
    </div>
  )
}

function DataBlock({ title, children }) {
  return (
    <div className="data-block">
      {title && <div className="data-block-title">{title}</div>}
      {children}
    </div>
  )
}

function CotList({ items }) {
  if (!items || !items.length) return <li style={{ color: '#9ca3af' }}>No chain of thought recorded</li>
  return items.map((c, i) => <li key={i}>{c}</li>)
}

export default function InvestigationPanel({
  issue, loan, mutations, issueStatus,
  onOpenLoan, onOpenEscModal, actions
}) {
  const [diagnosis, setDiagnosis] = useState(mutations?.issueNotes?.[issue.id] || '')
  const [confirmed, setConfirmed] = useState(null)

  function handleDiagChange(v) {
    setDiagnosis(v)
    actions.saveNote(issue.loanId, issue.id, v)
  }

  function confirm(msg) {
    setConfirmed(msg)
  }

  const st = issueStatus

  // ── Per-issue context blocks ─────────────────────────────────────────────

  let ctx = null
  let resolutionActions = null

  if (issue.id === 'ISSUE-001') {
    const failedTask = loan.agentTasks?.find(t => t.status === 'FAILED')
    const unlinked = loan.liabilities?.find(l => l.warning === 'NOT_LINKED_TO_OWNED_PROPERTY')
    ctx = (
      <>
        <div className="section-label">Agent Task Log - LIABILITY_LINK</div>
        {failedTask && (
          <DataBlock title={`${failedTask.id} - Failed - ${failedTask.startedAt?.slice(0,10)}`}>
            <ul className="cot-list"><CotList items={failedTask.chainOfThought} /></ul>
            {failedTask.error && <div className="error-text">{failedTask.error}</div>}
          </DataBlock>
        )}
        {unlinked && (
          <>
            <div className="section-label">Liability Record</div>
            <DataBlock title={`${unlinked.id} - ${unlinked.creditor}`}>
              <DR k="Property" v={unlinked.propertyAddress} />
              <DR k="Monthly Payment" v={`$${unlinked.monthlyPayment.toLocaleString()}`} />
              <DR k="Balance" v={`$${unlinked.balance.toLocaleString()}`} />
              <DR k="Linked Property" v="null - NOT LINKED" vc="#dc2626" />
              <DR k="Warning" v={unlinked.warning} vc="#d97706" />
            </DataBlock>
          </>
        )}
        <div className="section-label">Documents on File (mortgage statements)</div>
        <DataBlock>
          {loan.documents?.filter(d => d.type === 'PURCHASE_AGREEMENT' || d.filename?.includes('stmt') || d.filename?.includes('mortgage')).map(d => (
            <DR key={d.id} k={d.filename} v={`${d.classificationStatus} - ${d.linkedTo || 'unlinked'}`} />
          ))}
          <DR k="123 Birchwood Ln statement" v="No document found" vc="#dc2626" />
        </DataBlock>
      </>
    )
    resolutionActions = (
      <div className="action-row">
        {st !== 'resolved' && (
          <>
            <button className="btn btn-primary" onClick={() => {
              actions.resolveIssue(issue.id, issue.loanId, 'doc-gap', diagnosis)
              confirm('Doc gap identified for unlinked liability. Borrower task created: provide mortgage statement.')
            }}>Mark as doc gap - create borrower task</button>
            <button className="btn btn-secondary" onClick={() => {
              actions.resolveIssue(issue.id, issue.loanId, 'rerun', diagnosis)
              confirm('Agent re-triggered with manual doc link flag.')
            }}>Re-run agent with manual doc link</button>
          </>
        )}
        {st === 'resolved' && <button className="btn btn-secondary" disabled>Issue resolved</button>}
        <button className="btn btn-danger" onClick={() => onOpenEscModal(issue.id)}>Escalate to Engineering</button>
      </div>
    )
  }

  if (issue.id === 'ISSUE-002') {
    const ssInc = loan.income?.find(i => i.type === 'SOCIAL_SECURITY')
    const w2Inc = loan.income?.find(i => i.type === 'W2_EMPLOYMENT')
    const incTask = loan.agentTasks?.find(t => t.name.toLowerCase().includes('income'))
    const applied = mutations?.grossUpApplied
    const correctedSS = ssInc ? ssInc.annualAmountCorrected : 0
    const currentTotal = loan.metrics?.qualifiedIncome
    const correctedTotal = loan.metrics?.qualifiedIncomeCorrected

    ctx = (
      <>
        <div className="section-label">Agent Task Log - INCOME_CALCULATION</div>
        {incTask && (
          <DataBlock title={`${incTask.id} - Completed with Errors - ${incTask.startedAt?.slice(0,10)}`}>
            <ul className="cot-list"><CotList items={incTask.chainOfThought} /></ul>
            {incTask.warning && <div className="warn-text">{incTask.warning}</div>}
          </DataBlock>
        )}
        <div className="section-label">Income Breakdown</div>
        <DataBlock>
          {w2Inc && <DR k={`W-2 (${w2Inc.employer})`} v={`$${w2Inc.annualAmount.toLocaleString()} / year - verified`} />}
          {ssInc && <DR k="Social Security (agent calc)" v={`$${ssInc.annualAmount.toLocaleString()} / year`} />}
          {ssInc && <DR k="SS Corrected (25% gross-up)" v={`$${correctedSS.toLocaleString()} / year`} vc="#16a34a" />}
          <DR k="Total Qualified (current)" v={`$${(applied ? correctedTotal : currentTotal).toLocaleString()}`} vc={applied ? '#16a34a' : '#d97706'} />
          {!applied && <DR k="Total Qualified (corrected)" v={`$${correctedTotal?.toLocaleString()}`} vc="#16a34a" />}
        </DataBlock>
        <div className="section-label">Fannie Mae Guideline</div>
        <DataBlock>
          <div style={{ fontSize: '12px', color: '#374151' }}>
            Fannie Mae B3-3.1-09: For non-taxable income such as Social Security benefits, the lender may gross up 25% if the borrower does not file taxes on that income. The gross-up was not applied by the agent - the qualified income is understated.
          </div>
        </DataBlock>
        {applied && <div className="inline-confirm">Gross-up correction applied. Qualified income updated. Audit trail appended.</div>}
      </>
    )
    resolutionActions = (
      <div className="action-row">
        {!applied ? (
          <button className="btn btn-primary" onClick={() => {
            actions.applyGrossUp(issue.loanId, issue.id, diagnosis)
            confirm('Gross-up correction applied. Qualified income updated.')
          }}>Apply gross-up correction</button>
        ) : (
          <button className="btn btn-secondary" disabled>Correction applied</button>
        )}
        <button className="btn btn-danger" onClick={() => onOpenEscModal(issue.id)}>Escalate to Engineering</button>
      </div>
    )
  }

  if (issue.id === 'ISSUE-003') {
    const loeDocs = loan.documents?.filter(d => d.type === 'LETTER_OF_EXPLANATION_EMPLOYMENT') || []
    const loeDoc = loeDocs[0]
    const unmetCond = loan.conditions?.find(c => c.documentUploaded && c.status !== 'SATISFIED' && c.status !== 'OPEN')
    const condTask = loan.agentTasks?.find(t => t.name.toLowerCase().includes('condition'))
    const isSatisfied = unmetCond && mutations?.satisfiedConditions?.includes(unmetCond.id)

    ctx = (
      <>
        {loeDoc && (
          <>
            <div className="section-label">Document Record - {loeDoc.id}</div>
            <DataBlock title={loeDoc.filename}>
              <DR k="Uploaded" v={`${loeDoc.uploadedAt?.replace('T',' ').slice(0,19)}Z - borrower`} />
              <DR k="Classification" v={`CLASSIFIED - ${loeDoc.type}`} vc="#16a34a" />
              <DR k="Classified At" v={`${loeDoc.classifiedAt?.replace('T',' ').slice(0,19)}Z (${loeDoc.classificationTime})`} />
              <DR k="Linked To" v={loeDoc.linkedTo || 'null'} />
              <DR k="conditionId" v="null" vc="#dc2626" />
            </DataBlock>
          </>
        )}
        {unmetCond && (
          <>
            <div className="section-label">Condition Record - {unmetCond.id}</div>
            <DataBlock title={unmetCond.description}>
              <DR k="Status" v={isSatisfied ? 'SATISFIED' : unmetCond.status} vc={isSatisfied ? '#16a34a' : '#d97706'} />
              <DR k="Assigned To" v={unmetCond.assignedTo} />
              <DR k="Document Uploaded" v={unmetCond.documentUploaded ? `${unmetCond.documentUploaded} - uploaded` : 'null'} />
              <DR k="Condition Satisfied At" v={isSatisfied ? new Date().toISOString().slice(0,10) : 'null'} vc={isSatisfied ? '#16a34a' : '#dc2626'} />
            </DataBlock>
          </>
        )}
        {condTask && (
          <>
            <div className="section-label">Agent Task Log - CONDITION_REVIEW ({condTask.id})</div>
            <DataBlock title={`${condTask.startedAt?.slice(0,16).replace('T',' ')} - Completed with Errors`}>
              <ul className="cot-list"><CotList items={condTask.chainOfThought} /></ul>
              {condTask.warning && <div className="warn-text">Root cause: {condTask.warning}</div>}
            </DataBlock>
          </>
        )}
        {isSatisfied && <div className="inline-confirm">{unmetCond?.id} manually satisfied by S. Ewers. Audit trail appended.</div>}
      </>
    )
    resolutionActions = (
      <div className="action-row">
        {!isSatisfied ? (
          <button className="btn btn-primary" onClick={() => {
            if (unmetCond) {
              actions.satisfyCondition(issue.loanId, unmetCond.id, issue.id, diagnosis)
              confirm(`${unmetCond.id} manually satisfied.`)
            }
          }}>Manually satisfy condition</button>
        ) : (
          <button className="btn btn-secondary" disabled>Condition satisfied</button>
        )}
        <button className="btn btn-secondary" onClick={() => {
          confirm('Condition review agent re-triggered. Task queued.')
        }}>Re-trigger condition review agent</button>
        <button className="btn btn-danger" onClick={() => onOpenEscModal(issue.id)}>Escalate to Engineering</button>
      </div>
    )
  }

  if (issue.id === 'ISSUE-004') {
    const stuckDoc = loan.documents?.find(d => d.classificationStatus === 'PROCESSING')
    const stuckTask = loan.agentTasks?.find(t => t.status === 'STUCK')
    const otherDocs = loan.documents?.filter(d => d.classificationStatus === 'CLASSIFIED') || []
    const retried = mutations?.docClassificationRetried?.includes(stuckDoc?.id)

    ctx = (
      <>
        {stuckDoc && (
          <>
            <div className="section-label">Document Upload Log</div>
            <DataBlock title={`${stuckDoc.id} - ${stuckDoc.filename}`}>
              <DR k="Uploaded" v={`${stuckDoc.uploadedAt?.replace('T',' ').slice(0,19)}Z - borrower`} />
              <DR k="Classification Status" v={`PROCESSING - stuck ${stuckDoc.classificationTime}`} vc="#d97706" />
              <DR k="Job Started" v={stuckDoc.uploadedAt?.replace('T',' ').slice(0,19) + 'Z'} />
              <DR k="Last Status Event" v="No completion event" vc="#dc2626" />
            </DataBlock>
          </>
        )}
        <div className="section-label">Classification Timeline - Other Documents</div>
        <DataBlock>
          {otherDocs.slice(0, 4).map(d => (
            <DR key={d.id} k={d.filename} v={`Classified in ${d.classificationTime}`} />
          ))}
          {stuckDoc && <DR k={stuckDoc.filename} v={`${stuckDoc.classificationTime} - no completion event`} vc="#dc2626" />}
        </DataBlock>
        {stuckTask && (
          <>
            <div className="section-label">Downstream Blocked Tasks</div>
            <DataBlock>
              <DR k="Asset review task" v="Completed but skipped stuck document - classification pending" vc="#d97706" />
              <DR k="Consequence" v="Large deposit in stuck statement may not have been reviewed" vc="#dc2626" />
            </DataBlock>
          </>
        )}
        {retried && <div className="inline-confirm">Retry triggered. Classification job requeued. Monitor for completion event.</div>}
      </>
    )
    resolutionActions = (
      <div className="action-row">
        <button className="btn btn-primary" onClick={() => {
          if (stuckDoc) {
            actions.retryDoc(issue.loanId, stuckDoc.id, issue.id)
            confirm('Retry triggered. Classification job requeued.')
          }
        }}>Retry Doc Intelligence classification</button>
        <button className="btn btn-secondary" onClick={() => {
          if (stuckDoc) {
            actions.manualClassifyDoc(issue.loanId, stuckDoc.id, issue.id, diagnosis)
            confirm(`${stuckDoc.id} manually classified as BANK_STATEMENT. Linked to account.`)
          }
        }}>Manually classify document</button>
        <button className="btn btn-danger" onClick={() => onOpenEscModal(issue.id)}>Escalate to Engineering</button>
      </div>
    )
  }

  if (issue.id === 'ISSUE-005') {
    const allTx = (loan.assets?.bankAccounts || []).flatMap(a => a.transactions)
    const missedTx = allTx.find(t => t.agentMissed)
    const assetTask = loan.agentTasks?.find(t => t.name.toLowerCase().includes('asset'))
    const flaggedCond = loan.conditions?.find(c => c.status === 'OPEN' && c.description.includes('20,000'))
    const condCreated = (mutations?.createdConditions || []).length > 0

    ctx = (
      <>
        {assetTask && (
          <>
            <div className="section-label">Agent Task Note - ASSET_REVIEW ({assetTask.id})</div>
            <DataBlock title="March 2026 Bank Statement - Transaction Review">
              <ul className="cot-list"><CotList items={assetTask.chainOfThought} /></ul>
              {assetTask.warning && <div className="warn-text">{assetTask.warning}</div>}
            </DataBlock>
          </>
        )}
        <div className="section-label">Transaction List - March 2026</div>
        <DataBlock>
          {allTx.map((tx, i) => {
            const color = tx.flagged ? '#dc2626' : tx.agentMissed ? '#d97706' : undefined
            const note = tx.flagged
              ? ` - flagged - ${tx.conditionId} created`
              : tx.agentMissed
                ? ` - exceeds $10K threshold - NO CONDITION CREATED`
                : ' - no flag'
            return (
              <DR key={i}
                k={`${tx.date} ${tx.description.slice(0, 30)}`}
                v={`+$${tx.amount.toLocaleString()}${note}`}
                vc={color}
              />
            )
          })}
        </DataBlock>
        {flaggedCond && (
          <>
            <div className="section-label">Existing Condition (for reference)</div>
            <DataBlock>
              <DR k={flaggedCond.id} v={`${flaggedCond.description} - Open`} />
              <DR k="Missing" v={missedTx ? `No condition for $${missedTx.amount.toLocaleString()} ACH on ${missedTx.date}` : 'No condition for missed deposit'} vc="#dc2626" />
            </DataBlock>
          </>
        )}
        {condCreated && (
          <div className="inline-confirm">
            New condition created: LOE for missed deposit. Assigned to borrower. Audit trail appended.
          </div>
        )}
      </>
    )
    resolutionActions = (
      <div className="action-row">
        {!condCreated ? (
          <button className="btn btn-primary" onClick={() => {
            if (missedTx) {
              const newCond = {
                id: `COND-${Date.now().toString().slice(-6)}`,
                description: `Provide letter of explanation for $${missedTx.amount.toLocaleString()} ACH deposit received ${missedTx.date}`,
                assignedTo: 'BORROWER',
                status: 'OPEN',
                createdAt: new Date().toISOString(),
                satisfiedAt: null, satisfiedBy: null, documentId: null
              }
              actions.createCondition(issue.loanId, newCond, issue.id, diagnosis)
              confirm('Missing condition created. Assigned to borrower.')
            }
          }}>Create missing condition</button>
        ) : (
          <button className="btn btn-secondary" disabled>Condition created</button>
        )}
        <button className="btn btn-danger" onClick={() => onOpenEscModal(issue.id)}>Escalate to Engineering</button>
      </div>
    )
  }

  if (issue.id === 'ISSUE-006') {
    const itpEvent = loan.auditTrail?.find(e => e.event.toLowerCase().includes('intent to proceed'))
    const ausTask = loan.agentTasks?.find(t => t.status === 'NOT_TRIGGERED')
    const triggered = mutations?.ausTriggered

    ctx = (
      <>
        <div className="section-label">Audit Trail - Intent to Proceed Event</div>
        <DataBlock>
          {loan.auditTrail?.slice(-4).map(ev => (
            <DR key={ev.id}
              k={ev.timestamp.replace('T', ' ').slice(11, 19) + 'Z'}
              v={ev.event}
              vc={ev.event.toLowerCase().includes('expected') || ev.event.toLowerCase().includes('actual') ? '#dc2626' : undefined}
            />
          ))}
        </DataBlock>
        <div className="section-label">Expected Automation Sequence</div>
        <DataBlock>
          <DR k="Step 1" v="Intent to proceed event fires workflow trigger" />
          <DR k="Step 2" v="AUS order submitted to Fannie Mae Desktop Underwriter" />
          <DR k="Step 3" v="DU findings returned and stored on loan" />
          <DR k="Step 4" v="Income and asset agent tasks proceed using DU findings" />
        </DataBlock>
        <div className="section-label">Current State - Blocked</div>
        <DataBlock>
          <DR k="AUS Status" v="Not ordered - no attempt recorded" vc="#dc2626" />
          <DR k="DU Findings" v="null" vc="#dc2626" />
          <DR k="Income Calculation" v="Blocked - awaiting DU findings" vc="#d97706" />
          <DR k="Asset Review" v="Blocked - awaiting DU findings" vc="#d97706" />
          <DR k="Time Open" v={issue.openSince} vc="#dc2626" />
        </DataBlock>
        {ausTask && (
          <>
            <div className="section-label">Agent Task Record - {ausTask.id}</div>
            <DataBlock title={`${ausTask.name} - NOT TRIGGERED`}>
              <ul className="cot-list">
                <li style={{ color: '#9ca3af' }}>No chain of thought - task was not triggered</li>
              </ul>
              {ausTask.error && <div className="error-box">{ausTask.error}</div>}
            </DataBlock>
          </>
        )}
        {triggered && (
          <div className="inline-confirm">
            AUS trigger submitted manually. DU order queued. Downstream tasks will unblock when findings return.
          </div>
        )}
      </>
    )
    resolutionActions = (
      <div className="action-row">
        {!triggered ? (
          <button className="btn btn-primary" onClick={() => {
            actions.triggerAUS(issue.loanId, issue.id)
            confirm('AUS trigger submitted manually. DU order queued.')
          }}>Manually trigger AUS</button>
        ) : (
          <button className="btn btn-secondary" disabled>AUS triggered</button>
        )}
        <button className="btn btn-danger" onClick={() => onOpenEscModal(issue.id)}>Escalate to Engineering</button>
      </div>
    )
  }

  return (
    <div className="inv-content">
      <div className="inv-issue-header">
        <div className="inv-issue-title">{issue.title}</div>
        <div className="inv-badges">
          <span className={`type-badge ${issue.typeCls}`}>{issue.type}</span>
          <span className={`type-badge ${issue.sevCls}`}>{issue.severity}</span>
          <span className="type-badge" style={{ background: '#F3F4F6', color: '#6b7280' }}>{st.toUpperCase()}</span>
          <span style={{ fontSize: '11px', color: '#9ca3af' }}>Open {issue.openSince}</span>
        </div>
        <div className="inv-loan-stats">
          {issue.loanId} · {issue.borrower} ·{' '}
          <span
            style={{ color: '#4F46E5', cursor: 'pointer' }}
            onClick={() => onOpenLoan(issue.loanId)}
          >
            View loan file →
          </span>
        </div>
      </div>
      <div className="section-label">Investigation Context</div>
      {ctx}
      <div className="section-label">Your Diagnosis</div>
      <textarea
        className="diagnosis"
        placeholder="Describe what you found and why..."
        value={diagnosis}
        onChange={e => handleDiagChange(e.target.value)}
      />
      {confirmed && (
        <div className="inline-confirm" style={{ marginTop: '10px' }}>
          {confirmed}
        </div>
      )}
      <div className="resolution-section">
        <div className="resolution-title">Resolution Actions</div>
        {resolutionActions}
      </div>
    </div>
  )
}
