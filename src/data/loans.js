export const loansData = {

  'APP-1041': {
    loanId: 'APP-1041',
    stage: 'PROCESSING',
    uwDecision: 'PENDING',
    borrower: { id: 'BRW-8821', firstName: 'Marcus', lastName: 'Webb', email: 'marcus.webb@email.com', phone: '404-555-0182', ssn: '***-**-6842', dateOfBirth: '1984-07-14' },
    property: { address: '1842 Oakwood Dr', city: 'Atlanta', state: 'GA', zip: '30301', county: 'Fulton', estimatedValue: 538000, propertyType: 'SINGLE_FAMILY', occupancy: 'PRIMARY_RESIDENCE' },
    loan: { amount: 420000, purpose: 'PURCHASE', program: '30_YEAR_FIXED', interestRate: 6.875, lienType: 'FIRST_LIEN', closingDate: '2026-06-15', originationChannel: 'RETAIL' },
    metrics: { ltv: 0.78, dti: 0.42, fico: 710, qualifiedIncome: 67200, qualifiedIncomeCorrected: 69600, cashToClose: 124800, reservesMonths: 3.2 },
    liabilities: [
      { id: 'LIAB-001', type: 'MORTGAGE', creditor: 'Chase Home Lending', monthlyPayment: 1840, balance: 287000, propertyAddress: '456 Maple Ave, Decatur GA 30030', linkedPropertyId: 'PROP-002', linkedAt: '2026-05-01T09:14:00Z', linkedBy: 'agent', warning: null },
      { id: 'LIAB-002', type: 'MORTGAGE', creditor: 'Wells Fargo Home Mortgage', monthlyPayment: 1240, balance: 198000, propertyAddress: '123 Birchwood Ln, Marietta GA 30060', linkedPropertyId: null, linkedAt: null, linkedBy: null, warning: 'NOT_LINKED_TO_OWNED_PROPERTY' }
    ],
    income: [
      { id: 'INC-001', type: 'W2_EMPLOYMENT', employer: 'ABC Corporation', monthlyAmount: 4800, annualAmount: 57600, verificationStatus: 'VERIFIED', verifiedBy: 'agent', verifiedAt: '2026-05-01T10:02:00Z', grossUpApplied: false, grossUpRequired: false, grossUpFactor: null, source: 'pay_stubs' },
      { id: 'INC-002', type: 'SOCIAL_SECURITY', employer: null, monthlyAmount: 800, annualAmount: 9600, annualAmountCorrected: 12000, verificationStatus: 'VERIFIED', verifiedBy: 'agent', verifiedAt: '2026-05-01T10:02:00Z', grossUpApplied: false, grossUpRequired: true, grossUpFactor: 1.25, grossUpNote: 'Fannie Mae B3-3.1-09: Non-taxable SS income may be grossed up 25%. Borrower does not file taxes on SS income. Gross-up not applied by agent.', source: 'ss_award_letter' }
    ],
    assets: { bankAccounts: [{ id: 'ACCT-001', institution: 'Bank of America', accountType: 'CHECKING', accountNumberMasked: '****4821', balance: 34200, transactions: [
      { date: '2026-03-02', description: 'Direct Deposit - ABC Corporation', amount: 4200, type: 'CREDIT', flagged: false, conditionId: null, agentMissed: false },
      { date: '2026-03-08', description: 'ACH Deposit - External Transfer', amount: 12500, type: 'CREDIT', flagged: false, conditionId: null, agentMissed: true },
      { date: '2026-03-15', description: 'Direct Deposit - ABC Corporation', amount: 4200, type: 'CREDIT', flagged: false, conditionId: null, agentMissed: false },
      { date: '2026-03-22', description: 'Incoming Wire Transfer', amount: 20000, type: 'CREDIT', flagged: true, flagReason: 'Single deposit exceeds $10,000. Fannie Mae guidelines require letter of explanation.', conditionId: 'COND-008', agentMissed: false }
    ]}] },
    conditions: [
      { id: 'COND-001', description: 'Provide signed purchase agreement', assignedTo: 'BORROWER', status: 'SATISFIED', createdAt: '2026-05-01T08:45:00Z', satisfiedAt: '2026-05-02T14:22:00Z', satisfiedBy: 'agent', documentId: 'DOC-003' },
      { id: 'COND-002', description: 'Provide 2 months pay stubs', assignedTo: 'BORROWER', status: 'SATISFIED', createdAt: '2026-05-01T08:45:00Z', satisfiedAt: '2026-05-03T09:10:00Z', satisfiedBy: 'agent', documentId: 'DOC-005' },
      { id: 'COND-003', description: 'Provide 2024 and 2025 W-2s', assignedTo: 'BORROWER', status: 'SATISFIED', createdAt: '2026-05-01T08:45:00Z', satisfiedAt: '2026-05-03T09:11:00Z', satisfiedBy: 'agent', documentId: 'DOC-006' },
      { id: 'COND-004', description: 'Provide 3 months bank statements', assignedTo: 'BORROWER', status: 'SATISFIED', createdAt: '2026-05-01T08:45:00Z', satisfiedAt: '2026-05-04T11:00:00Z', satisfiedBy: 'agent', documentId: 'DOC-008' },
      { id: 'COND-007', description: 'Provide letter of explanation for employment gap (June-September 2024)', assignedTo: 'BORROWER', status: 'PENDING_BORROWER', createdAt: '2026-05-06T14:30:00Z', satisfiedAt: null, satisfiedBy: null, documentId: null, documentUploaded: 'DOC-011', documentUploadedAt: '2026-05-13T11:16:00Z', note: 'Document uploaded but condition not auto-satisfied. Agent queried by conditionId linkage - DOC-011 conditionId is null.' },
      { id: 'COND-008', description: 'Provide letter of explanation for $20,000 wire transfer received 03/22/2026', assignedTo: 'BORROWER', status: 'OPEN', createdAt: '2026-05-01T10:18:00Z', satisfiedAt: null, satisfiedBy: null, documentId: null }
    ],
    documents: [
      { id: 'DOC-001', filename: 'drivers_license_front.pdf', type: 'GOVERNMENT_ID', uploadedAt: '2026-05-01T08:40:00Z', uploadedBy: 'borrower', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-05-01T08:41:28Z', classificationTime: '88s', classifiedBy: 'doc_intelligence', linkedTo: 'BRW-8821' },
      { id: 'DOC-003', filename: 'purchase_agreement_signed.pdf', type: 'PURCHASE_AGREEMENT', uploadedAt: '2026-05-01T09:30:00Z', uploadedBy: 'loan_officer', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-05-01T09:31:44Z', classificationTime: '104s', classifiedBy: 'doc_intelligence', linkedTo: 'APP-1041' },
      { id: 'DOC-005', filename: 'paystubs_april_may_2026.pdf', type: 'PAY_STUB', uploadedAt: '2026-05-02T10:15:00Z', uploadedBy: 'borrower', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-05-02T10:16:12Z', classificationTime: '72s', classifiedBy: 'doc_intelligence', linkedTo: 'INC-001' },
      { id: 'DOC-008', filename: 'bank_stmt_jan_feb_2026.pdf', type: 'BANK_STATEMENT', uploadedAt: '2026-05-04T10:50:00Z', uploadedBy: 'borrower', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-05-04T10:51:33Z', classificationTime: '43s', classifiedBy: 'doc_intelligence', linkedTo: 'ACCT-001' },
      { id: 'DOC-010', filename: 'bank_stmt_march_2026.pdf', type: null, uploadedAt: '2026-05-13T10:14:00Z', uploadedBy: 'borrower', classificationStatus: 'PROCESSING', classifiedAt: null, classificationTime: '2h 3m+', classifiedBy: null, linkedTo: null, processingNote: 'Classification job started at 10:14:03Z. No completion event. All other documents on this loan classified in under 90 seconds.' },
      { id: 'DOC-011', filename: 'employment_gap_loe.pdf', type: 'LETTER_OF_EXPLANATION_EMPLOYMENT', uploadedAt: '2026-05-13T11:16:00Z', uploadedBy: 'borrower', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-05-13T11:17:08Z', classificationTime: '68s', classifiedBy: 'doc_intelligence', linkedTo: 'BRW-8821', conditionSatisfiedAt: null, note: 'Classified correctly but COND-007 not satisfied. conditionId field is null - agent queried by conditionId linkage and found no match.' }
    ],
    agentTasks: [
      { id: 'TASK-001', name: 'Order credit and initialize automations', objective: 'Pull credit report for all borrowers, enable compliance monitoring, order closing costs', status: 'COMPLETED', startedAt: '2026-05-01T08:33:00Z', completedAt: '2026-05-01T08:41:00Z', chainOfThought: ['Identified 1 borrower on file: Marcus Webb (BRW-8821)', 'Submitted credit pull request to Equifax', 'Credit returned: Classic FICO 710, VantageScore 724. 2 mortgage tradelines, 4 open tradelines, 0 derogatory', 'Compliance monitoring enabled - RESPA, TRID timelines initialized', 'Closing cost estimate pulled from Lodestar: $11,240'], output: 'Credit pulled. FICO 710. Compliance monitoring active. Closing costs estimated.', warning: null, error: null },
      { id: 'TASK-002', name: 'Link mortgage liabilities to owned properties', objective: 'Review mortgage liabilities pulled from credit and link each to the correct owned property using mortgage statements on file', status: 'FAILED', startedAt: '2026-05-01T09:15:00Z', completedAt: '2026-05-01T09:16:44Z', chainOfThought: ['Found 2 mortgage liabilities on credit report: Chase (456 Maple Ave) and Wells Fargo (123 Birchwood Ln)', 'Searching documents on file for mortgage statements...', 'Found mortgage_stmt_456maple.pdf - matched to Chase liability at 456 Maple Ave. Linked successfully.', 'Searching for mortgage statement for 123 Birchwood Ln - no document found matching this address', 'Cannot link Wells Fargo liability - no statement available. Task failed for this liability.'], output: 'LIAB-001 linked to PROP-002. LIAB-002 could not be linked - no mortgage statement on file.', warning: null, error: 'MISSING_DOCUMENT: No mortgage statement found for 123 Birchwood Ln' },
      { id: 'TASK-003', name: 'Calculate qualified income', objective: 'Calculate total qualified income from all income documents using Fannie Mae guidelines. Annualize pay stub income. Apply gross-up to non-taxable income sources where applicable.', status: 'COMPLETED_WITH_ERRORS', startedAt: '2026-05-01T10:00:00Z', completedAt: '2026-05-01T10:03:22Z', chainOfThought: ['Found 2 income sources: W-2 employment (ABC Corp) and Social Security', 'W-2: most recent pay stub shows $4,800/month gross. Annualized: $57,600. Verified against 2 months pay stubs.', 'Social Security: SS award letter shows $800/month. Annualized: $9,600. Applied standard annualization.', 'Total qualified income: $67,200. Added loan note with income breakdown.'], output: 'Qualified income: $67,200. W-2: $57,600. SS: $9,600.', warning: 'GROSS_UP_NOT_APPLIED: SS income annualized at face value. Fannie Mae B3-3.1-09 permits 25% gross-up for non-taxable SS income. Corrected figure: $12,000 SS / $69,600 total.', error: null },
      { id: 'TASK-004', name: 'Review assets and flag large deposits', objective: 'Review all bank statements on file. Flag any single deposit or withdrawal exceeding $10,000. Create LOE conditions for flagged items.', status: 'COMPLETED_WITH_ERRORS', startedAt: '2026-05-01T10:10:00Z', completedAt: '2026-05-01T10:22:00Z', chainOfThought: ['Statements on file: Jan 2026, Feb 2026. March 2026 still processing - skipped.', 'Jan statement: 8 transactions. No deposits exceeding $10,000.', 'Feb statement: 6 transactions. No deposits exceeding $10,000.', 'March statement classification pending - skipped.', 'Found 1 flagged item: $20,000 wire on 03/22. Created COND-008.', 'Asset calculator run. Balance $34,200. Reserves 3.2 months.'], output: '1 large deposit flagged. COND-008 created for $20,000 wire.', warning: 'INCOMPLETE_REVIEW: March 2026 statement skipped - classification pending. $12,500 ACH on 03/08 not reviewed or flagged.', error: null },
      { id: 'TASK-005', name: 'Review conditions and satisfy where possible', objective: 'Check all PENDING_BORROWER conditions for matching uploaded documents. Satisfy condition if requirements are met.', status: 'COMPLETED_WITH_ERRORS', startedAt: '2026-05-13T11:19:00Z', completedAt: '2026-05-13T11:21:14Z', chainOfThought: ['Found 2 open conditions: COND-007 and COND-008', 'COND-008: No document uploaded. Skipping.', 'COND-007: Status PENDING_BORROWER. Checking for uploaded LOE documents linked to this condition...', 'Query returned 0 documents linked to COND-007 by conditionId.', 'No matching document found for COND-007. Skipping.'], output: '0 conditions satisfied.', warning: 'CONDITION_MATCH_FAILURE: DOC-011 uploaded and classified as LETTER_OF_EXPLANATION_EMPLOYMENT but not linked to COND-007. Agent queries by conditionId linkage - DOC-011 conditionId is null.', error: null },
      { id: 'TASK-007', name: 'Doc Intelligence batch classification', objective: 'Classify and link all unprocessed documents uploaded in the last 24 hours', status: 'STUCK', startedAt: '2026-05-13T10:14:03Z', completedAt: null, chainOfThought: ['Batch job started. 1 document queued: bank_stmt_march_2026.pdf (DOC-010)', 'Submitted DOC-010 to classification pipeline...', 'Awaiting classification result...'], output: null, warning: null, error: 'PROCESSING_TIMEOUT: Classification job running 2h 3m with no completion event. Job appears stuck.' }
    ],
    auditTrail: [
      { id: 'EVT-001', timestamp: '2026-05-01T08:32:00Z', event: 'Loan file created - APP-1041', actor: 'system' },
      { id: 'EVT-002', timestamp: '2026-05-01T08:33:00Z', event: 'Credit order automation triggered', actor: 'system' },
      { id: 'EVT-003', timestamp: '2026-05-01T08:41:00Z', event: 'Credit pulled - FICO 710, VantageScore 724', actor: 'agent' },
      { id: 'EVT-004', timestamp: '2026-05-01T08:41:00Z', event: '2 mortgage liabilities imported from credit report', actor: 'system' },
      { id: 'EVT-005', timestamp: '2026-05-01T09:15:00Z', event: 'Agent task started - LIABILITY_LINK', actor: 'agent' },
      { id: 'EVT-006', timestamp: '2026-05-01T09:16:44Z', event: 'LIAB-001 linked to 456 Maple Ave (PROP-002)', actor: 'agent' },
      { id: 'EVT-007', timestamp: '2026-05-01T09:16:44Z', event: 'Agent task FAILED - LIABILITY_LINK - MISSING_DOCUMENT: no statement for 123 Birchwood Ln', actor: 'agent' },
      { id: 'EVT-008', timestamp: '2026-05-01T10:00:00Z', event: 'Agent task started - INCOME_CALCULATION', actor: 'agent' },
      { id: 'EVT-009', timestamp: '2026-05-01T10:03:22Z', event: 'Qualified income set to $67,200. Warning: SS gross-up not applied.', actor: 'agent' },
      { id: 'EVT-010', timestamp: '2026-05-01T10:10:00Z', event: 'Agent task started - ASSET_REVIEW', actor: 'agent' },
      { id: 'EVT-011', timestamp: '2026-05-01T10:18:00Z', event: 'Large deposit flagged - $20,000 wire 03/22. COND-008 created.', actor: 'agent' },
      { id: 'EVT-012', timestamp: '2026-05-01T10:22:00Z', event: 'Asset review complete. March statement skipped - classification pending.', actor: 'agent' },
      { id: 'EVT-013', timestamp: '2026-05-13T10:14:03Z', event: 'Document uploaded - bank_stmt_march_2026.pdf (DOC-010)', actor: 'borrower' },
      { id: 'EVT-014', timestamp: '2026-05-13T10:14:03Z', event: 'Doc Intelligence classification started - DOC-010', actor: 'system' },
      { id: 'EVT-015', timestamp: '2026-05-13T11:16:00Z', event: 'Document uploaded - employment_gap_loe.pdf (DOC-011)', actor: 'borrower' },
      { id: 'EVT-016', timestamp: '2026-05-13T11:17:08Z', event: 'DOC-011 classified as LETTER_OF_EXPLANATION_EMPLOYMENT', actor: 'system' },
      { id: 'EVT-017', timestamp: '2026-05-13T11:19:00Z', event: 'Agent task started - CONDITION_REVIEW', actor: 'agent' },
      { id: 'EVT-018', timestamp: '2026-05-13T11:21:14Z', event: 'Condition review complete. 0 conditions satisfied. DOC-011 not matched to COND-007 - conditionId null.', actor: 'agent' }
    ]
  },

  'APP-1042': {
    loanId: 'APP-1042',
    stage: 'UNDERWRITING',
    uwDecision: 'PENDING',
    borrower: { id: 'BRW-5540', firstName: 'Diana', lastName: 'Chen', email: 'diana.chen@email.com', phone: '626-555-0341', ssn: '***-**-3317', dateOfBirth: '1979-03-22' },
    property: { address: '2201 Rosewood Blvd', city: 'Pasadena', state: 'CA', zip: '91103', county: 'Los Angeles', estimatedValue: 350000, propertyType: 'SINGLE_FAMILY', occupancy: 'PRIMARY_RESIDENCE' },
    loan: { amount: 275000, purpose: 'PURCHASE', program: '30_YEAR_FIXED', interestRate: 7.125, lienType: 'FIRST_LIEN', closingDate: '2026-07-01', originationChannel: 'RETAIL' },
    metrics: { ltv: 0.79, dti: 0.38, fico: 725, qualifiedIncome: 62400, qualifiedIncomeCorrected: 63600, cashToClose: 82500, reservesMonths: 4.1 },
    liabilities: [
      { id: 'LIAB-101', type: 'AUTO', creditor: 'Honda Financial Services', monthlyPayment: 485, balance: 12400, propertyAddress: null, linkedPropertyId: null, linkedAt: null, linkedBy: null, warning: null }
    ],
    income: [
      { id: 'INC-101', type: 'W2_EMPLOYMENT', employer: 'Meridian Tech Group', monthlyAmount: 4800, annualAmount: 57600, verificationStatus: 'VERIFIED', verifiedBy: 'agent', verifiedAt: '2026-04-15T09:30:00Z', grossUpApplied: false, grossUpRequired: false, grossUpFactor: null, source: 'pay_stubs' },
      { id: 'INC-102', type: 'SOCIAL_SECURITY', employer: null, monthlyAmount: 400, annualAmount: 4800, annualAmountCorrected: 6000, verificationStatus: 'VERIFIED', verifiedBy: 'agent', verifiedAt: '2026-04-15T09:30:00Z', grossUpApplied: false, grossUpRequired: true, grossUpFactor: 1.25, grossUpNote: 'Fannie Mae B3-3.1-09: Non-taxable SS income may be grossed up 25%. Borrower does not file taxes on SS income. Gross-up not applied by agent.', source: 'ss_award_letter' }
    ],
    assets: { bankAccounts: [{ id: 'ACCT-101', institution: 'Wells Fargo', accountType: 'CHECKING', accountNumberMasked: '****7723', balance: 52000, transactions: [
      { date: '2026-03-05', description: 'Direct Deposit - Meridian Tech Group', amount: 4800, type: 'CREDIT', flagged: false, conditionId: null, agentMissed: false },
      { date: '2026-03-20', description: 'Direct Deposit - Meridian Tech Group', amount: 4800, type: 'CREDIT', flagged: false, conditionId: null, agentMissed: false },
      { date: '2026-04-05', description: 'Direct Deposit - Meridian Tech Group', amount: 4800, type: 'CREDIT', flagged: false, conditionId: null, agentMissed: false }
    ]}] },
    conditions: [
      { id: 'COND-101', description: 'Provide signed purchase contract', assignedTo: 'BORROWER', status: 'SATISFIED', createdAt: '2026-04-12T08:00:00Z', satisfiedAt: '2026-04-13T10:00:00Z', satisfiedBy: 'agent', documentId: 'DOC-101' },
      { id: 'COND-102', description: 'Provide 2 months pay stubs', assignedTo: 'BORROWER', status: 'SATISFIED', createdAt: '2026-04-12T08:00:00Z', satisfiedAt: '2026-04-14T09:00:00Z', satisfiedBy: 'agent', documentId: 'DOC-102' },
      { id: 'COND-103', description: 'Provide SS award letter', assignedTo: 'BORROWER', status: 'SATISFIED', createdAt: '2026-04-12T08:00:00Z', satisfiedAt: '2026-04-14T09:30:00Z', satisfiedBy: 'agent', documentId: 'DOC-103' }
    ],
    documents: [
      { id: 'DOC-101', filename: 'purchase_contract_chen.pdf', type: 'PURCHASE_AGREEMENT', uploadedAt: '2026-04-12T09:00:00Z', uploadedBy: 'loan_officer', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-04-12T09:01:32Z', classificationTime: '92s', classifiedBy: 'doc_intelligence', linkedTo: 'APP-1042' },
      { id: 'DOC-102', filename: 'paystubs_mar_apr_2026_chen.pdf', type: 'PAY_STUB', uploadedAt: '2026-04-13T10:00:00Z', uploadedBy: 'borrower', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-04-13T10:01:15Z', classificationTime: '75s', classifiedBy: 'doc_intelligence', linkedTo: 'INC-101' },
      { id: 'DOC-103', filename: 'ss_award_letter_chen.pdf', type: 'SS_AWARD_LETTER', uploadedAt: '2026-04-14T08:30:00Z', uploadedBy: 'borrower', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-04-14T08:31:44Z', classificationTime: '104s', classifiedBy: 'doc_intelligence', linkedTo: 'INC-102' },
      { id: 'DOC-104', filename: 'drivers_license_chen.pdf', type: 'GOVERNMENT_ID', uploadedAt: '2026-04-12T08:45:00Z', uploadedBy: 'borrower', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-04-12T08:46:22Z', classificationTime: '82s', classifiedBy: 'doc_intelligence', linkedTo: 'BRW-5540' }
    ],
    agentTasks: [
      { id: 'TASK-101', name: 'Order credit and initialize automations', objective: 'Pull credit report, enable compliance monitoring, order closing costs', status: 'COMPLETED', startedAt: '2026-04-12T08:15:00Z', completedAt: '2026-04-12T08:22:00Z', chainOfThought: ['Identified 1 borrower: Diana Chen (BRW-5540)', 'Credit pulled: FICO 725. 1 auto tradeline, 3 open tradelines, 0 derogatory', 'Compliance monitoring enabled - RESPA, TRID initialized', 'Closing cost estimate: $9,870'], output: 'Credit pulled. FICO 725. Compliance monitoring active.', warning: null, error: null },
      { id: 'TASK-103', name: 'Calculate qualified income', objective: 'Calculate total qualified income from all income documents using Fannie Mae guidelines. Apply gross-up to non-taxable income sources where applicable.', status: 'COMPLETED_WITH_ERRORS', startedAt: '2026-04-15T09:25:00Z', completedAt: '2026-04-15T09:31:00Z', chainOfThought: ['Found 2 income sources: W-2 employment (Meridian Tech Group) and Social Security', 'W-2: $4,800/month gross. Annualized: $57,600. Verified against 2 months pay stubs.', 'Social Security: SS award letter shows $400/month. Annualized: $4,800. Applied standard annualization.', 'Total qualified income: $62,400. Added loan note with income breakdown.'], output: 'Qualified income: $62,400. W-2: $57,600. SS: $4,800.', warning: 'GROSS_UP_NOT_APPLIED: SS income annualized at face value. Fannie Mae B3-3.1-09 permits 25% gross-up for non-taxable SS income. Corrected figure: $6,000 SS / $63,600 total.', error: null }
    ],
    auditTrail: [
      { id: 'EVT-042-001', timestamp: '2026-04-12T08:10:00Z', event: 'Loan file created - APP-1042', actor: 'system' },
      { id: 'EVT-042-002', timestamp: '2026-04-12T08:15:00Z', event: 'Credit order automation triggered', actor: 'system' },
      { id: 'EVT-042-003', timestamp: '2026-04-12T08:22:00Z', event: 'Credit pulled - FICO 725, VantageScore 738', actor: 'agent' },
      { id: 'EVT-042-004', timestamp: '2026-04-15T09:25:00Z', event: 'Agent task started - INCOME_CALCULATION', actor: 'agent' },
      { id: 'EVT-042-005', timestamp: '2026-04-15T09:31:00Z', event: 'Qualified income set to $62,400. Warning: SS gross-up not applied.', actor: 'agent' }
    ]
  },

  'APP-1043': {
    loanId: 'APP-1043',
    stage: 'PROCESSING',
    uwDecision: 'PENDING',
    borrower: { id: 'BRW-7732', firstName: 'James', lastName: 'Okafor', email: 'james.okafor@email.com', phone: '312-555-0894', ssn: '***-**-5521', dateOfBirth: '1981-11-08' },
    property: { address: '4817 Lakeshore Dr', city: 'Chicago', state: 'IL', zip: '60640', county: 'Cook', estimatedValue: 695000, propertyType: 'SINGLE_FAMILY', occupancy: 'PRIMARY_RESIDENCE' },
    loan: { amount: 550000, purpose: 'PURCHASE', program: '30_YEAR_FIXED', interestRate: 6.750, lienType: 'FIRST_LIEN', closingDate: '2026-06-28', originationChannel: 'RETAIL' },
    metrics: { ltv: 0.79, dti: 0.40, fico: 750, qualifiedIncome: 132000, qualifiedIncomeCorrected: null, cashToClose: 162000, reservesMonths: 5.4 },
    liabilities: [
      { id: 'LIAB-201', type: 'MORTGAGE', creditor: 'PNC Mortgage', monthlyPayment: 2180, balance: 344000, propertyAddress: '901 Elm St, Evanston IL 60201', linkedPropertyId: 'PROP-201', linkedAt: '2026-05-02T10:30:00Z', linkedBy: 'agent', warning: null }
    ],
    income: [
      { id: 'INC-201', type: 'W2_EMPLOYMENT', employer: 'Lakefront Capital Partners', monthlyAmount: 8500, annualAmount: 102000, verificationStatus: 'VERIFIED', verifiedBy: 'agent', verifiedAt: '2026-05-02T11:00:00Z', grossUpApplied: false, grossUpRequired: false, grossUpFactor: null, source: 'pay_stubs' },
      { id: 'INC-202', type: 'BONUS', employer: 'Lakefront Capital Partners', monthlyAmount: 2500, annualAmount: 30000, verificationStatus: 'VERIFIED', verifiedBy: 'agent', verifiedAt: '2026-05-02T11:00:00Z', grossUpApplied: false, grossUpRequired: false, grossUpFactor: null, source: 'bonus_letter' }
    ],
    assets: { bankAccounts: [{ id: 'ACCT-201', institution: 'Chase', accountType: 'CHECKING', accountNumberMasked: '****3310', balance: 89000, transactions: [
      { date: '2026-03-01', description: 'Direct Deposit - Lakefront Capital Partners', amount: 8500, type: 'CREDIT', flagged: false, conditionId: null, agentMissed: false },
      { date: '2026-03-08', description: 'ACH Deposit - External Transfer', amount: 8200, type: 'CREDIT', flagged: false, conditionId: null, agentMissed: false },
      { date: '2026-03-15', description: 'Direct Deposit - Lakefront Capital Partners', amount: 8500, type: 'CREDIT', flagged: false, conditionId: null, agentMissed: false }
    ]}] },
    conditions: [
      { id: 'COND-201', description: 'Provide signed purchase agreement', assignedTo: 'BORROWER', status: 'SATISFIED', createdAt: '2026-05-01T09:00:00Z', satisfiedAt: '2026-05-02T08:30:00Z', satisfiedBy: 'agent', documentId: 'DOC-201' },
      { id: 'COND-202', description: 'Provide 2 months pay stubs', assignedTo: 'BORROWER', status: 'SATISFIED', createdAt: '2026-05-01T09:00:00Z', satisfiedAt: '2026-05-02T09:00:00Z', satisfiedBy: 'agent', documentId: 'DOC-202' },
      { id: 'COND-203', description: 'Provide 3 months bank statements', assignedTo: 'BORROWER', status: 'SATISFIED', createdAt: '2026-05-01T09:00:00Z', satisfiedAt: '2026-05-04T10:00:00Z', satisfiedBy: 'agent', documentId: 'DOC-204' },
      { id: 'COND-207', description: 'Provide letter of explanation for employment gap (January-April 2024)', assignedTo: 'BORROWER', status: 'PENDING_BORROWER', createdAt: '2026-05-06T10:00:00Z', satisfiedAt: null, satisfiedBy: null, documentId: null, documentUploaded: 'DOC-211', documentUploadedAt: '2026-05-13T11:44:00Z', note: 'Document uploaded but condition not auto-satisfied. Agent queried by conditionId linkage - DOC-211 conditionId is null.' },
      { id: 'COND-208', description: 'Provide complete 3-month bank statement for Chase ****3310 (March 2026)', assignedTo: 'BORROWER', status: 'PENDING_BORROWER', createdAt: '2026-05-13T10:30:00Z', satisfiedAt: null, satisfiedBy: null, documentId: null }
    ],
    documents: [
      { id: 'DOC-201', filename: 'purchase_agreement_okafor.pdf', type: 'PURCHASE_AGREEMENT', uploadedAt: '2026-05-01T09:30:00Z', uploadedBy: 'loan_officer', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-05-01T09:31:52Z', classificationTime: '112s', classifiedBy: 'doc_intelligence', linkedTo: 'APP-1043' },
      { id: 'DOC-202', filename: 'paystubs_apr_may_okafor.pdf', type: 'PAY_STUB', uploadedAt: '2026-05-02T09:00:00Z', uploadedBy: 'borrower', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-05-02T09:01:18Z', classificationTime: '78s', classifiedBy: 'doc_intelligence', linkedTo: 'INC-201' },
      { id: 'DOC-203', filename: 'drivers_license_okafor.pdf', type: 'GOVERNMENT_ID', uploadedAt: '2026-05-01T08:50:00Z', uploadedBy: 'borrower', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-05-01T08:51:24Z', classificationTime: '84s', classifiedBy: 'doc_intelligence', linkedTo: 'BRW-7732' },
      { id: 'DOC-204', filename: 'bank_stmts_jan_feb_okafor.pdf', type: 'BANK_STATEMENT', uploadedAt: '2026-05-04T11:00:00Z', uploadedBy: 'borrower', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-05-04T11:01:05Z', classificationTime: '65s', classifiedBy: 'doc_intelligence', linkedTo: 'ACCT-201' },
      { id: 'DOC-210', filename: 'bank_stmt_march_2026_okafor.pdf', type: null, uploadedAt: '2026-05-13T10:14:00Z', uploadedBy: 'borrower', classificationStatus: 'PROCESSING', classifiedAt: null, classificationTime: '2h 3m+', classifiedBy: null, linkedTo: null, processingNote: 'Classification job started at 10:14:07Z. No completion event. All other documents on this loan classified in under 120 seconds.' },
      { id: 'DOC-211', filename: 'employment_gap_loe_okafor.pdf', type: 'LETTER_OF_EXPLANATION_EMPLOYMENT', uploadedAt: '2026-05-13T11:44:00Z', uploadedBy: 'borrower', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-05-13T11:45:12Z', classificationTime: '72s', classifiedBy: 'doc_intelligence', linkedTo: 'BRW-7732', conditionSatisfiedAt: null, note: 'Classified correctly but COND-207 not satisfied. conditionId field is null - agent queried by conditionId linkage and found no match.' }
    ],
    agentTasks: [
      { id: 'TASK-201', name: 'Order credit and initialize automations', objective: 'Pull credit report, enable compliance monitoring, order closing costs', status: 'COMPLETED', startedAt: '2026-05-01T08:40:00Z', completedAt: '2026-05-01T08:48:00Z', chainOfThought: ['Identified 1 borrower: James Okafor (BRW-7732)', 'Credit pulled: FICO 750. 1 mortgage tradeline, 3 open tradelines, 0 derogatory', 'Compliance monitoring enabled', 'Closing cost estimate: $13,420'], output: 'Credit pulled. FICO 750. Compliance monitoring active.', warning: null, error: null },
      { id: 'TASK-202', name: 'Link mortgage liabilities to owned properties', objective: 'Review mortgage liabilities and link to owned properties', status: 'COMPLETED', startedAt: '2026-05-02T10:25:00Z', completedAt: '2026-05-02T10:31:00Z', chainOfThought: ['Found 1 mortgage liability: PNC Mortgage (901 Elm St, Evanston)', 'Found mortgage_stmt_901elm.pdf - matched to PNC liability. Linked successfully.'], output: 'LIAB-201 linked to PROP-201 (901 Elm St).', warning: null, error: null },
      { id: 'TASK-203', name: 'Calculate qualified income', objective: 'Calculate total qualified income using Fannie Mae guidelines', status: 'COMPLETED', startedAt: '2026-05-02T11:00:00Z', completedAt: '2026-05-02T11:06:00Z', chainOfThought: ['Found 2 income sources: W-2 and bonus', 'W-2: $8,500/month. Annualized: $102,000.', 'Bonus: $30,000/year from bonus letter. 2-year average applied.', 'Total qualified income: $132,000.'], output: 'Qualified income: $132,000.', warning: null, error: null },
      { id: 'TASK-204', name: 'Review assets and flag large deposits', objective: 'Review bank statements. Flag deposits exceeding $10,000. Create LOE conditions.', status: 'COMPLETED_WITH_ERRORS', startedAt: '2026-05-04T11:15:00Z', completedAt: '2026-05-04T11:22:00Z', chainOfThought: ['Statements on file: Jan 2026, Feb 2026. March 2026 still processing - skipped.', 'Jan statement: no deposits exceeding $10,000.', 'Feb statement: no deposits exceeding $10,000.', 'March statement classification pending - skipped.', 'No large deposits flagged in reviewed statements.'], output: '0 large deposits flagged.', warning: 'INCOMPLETE_REVIEW: March 2026 statement skipped - classification pending at time of task execution.', error: null },
      { id: 'TASK-205', name: 'Review conditions and satisfy where possible', objective: 'Check all PENDING_BORROWER conditions for matching uploaded documents.', status: 'COMPLETED_WITH_ERRORS', startedAt: '2026-05-13T11:48:00Z', completedAt: '2026-05-13T11:50:22Z', chainOfThought: ['Found 2 open conditions: COND-207 and COND-208', 'COND-208: No document uploaded. Skipping.', 'COND-207: Status PENDING_BORROWER. Checking for uploaded LOE documents linked to this condition...', 'Query returned 0 documents linked to COND-207 by conditionId.', 'No matching document found for COND-207. Skipping.'], output: '0 conditions satisfied.', warning: 'CONDITION_MATCH_FAILURE: DOC-211 uploaded and classified as LETTER_OF_EXPLANATION_EMPLOYMENT but not linked to COND-207. conditionId field is null.', error: null },
      { id: 'TASK-207', name: 'Doc Intelligence batch classification', objective: 'Classify and link all unprocessed documents uploaded in the last 24 hours', status: 'STUCK', startedAt: '2026-05-13T10:14:07Z', completedAt: null, chainOfThought: ['Batch job started. 1 document queued: bank_stmt_march_2026_okafor.pdf (DOC-210)', 'Submitted DOC-210 to classification pipeline...', 'Awaiting classification result...'], output: null, warning: null, error: 'PROCESSING_TIMEOUT: Classification job running 2h 3m with no completion event. Job appears stuck.' }
    ],
    auditTrail: [
      { id: 'EVT-043-001', timestamp: '2026-05-01T08:35:00Z', event: 'Loan file created - APP-1043', actor: 'system' },
      { id: 'EVT-043-002', timestamp: '2026-05-01T08:40:00Z', event: 'Credit order automation triggered', actor: 'system' },
      { id: 'EVT-043-003', timestamp: '2026-05-01T08:48:00Z', event: 'Credit pulled - FICO 750, VantageScore 762', actor: 'agent' },
      { id: 'EVT-043-004', timestamp: '2026-05-02T10:31:00Z', event: 'LIAB-201 linked to 901 Elm St (PROP-201)', actor: 'agent' },
      { id: 'EVT-043-005', timestamp: '2026-05-02T11:06:00Z', event: 'Qualified income set to $132,000.', actor: 'agent' },
      { id: 'EVT-043-006', timestamp: '2026-05-04T11:22:00Z', event: 'Asset review complete. March statement skipped - classification pending.', actor: 'agent' },
      { id: 'EVT-043-007', timestamp: '2026-05-13T10:14:07Z', event: 'Document uploaded - bank_stmt_march_2026_okafor.pdf (DOC-210)', actor: 'borrower' },
      { id: 'EVT-043-008', timestamp: '2026-05-13T10:14:07Z', event: 'Doc Intelligence classification started - DOC-210', actor: 'system' },
      { id: 'EVT-043-009', timestamp: '2026-05-13T11:44:00Z', event: 'Document uploaded - employment_gap_loe_okafor.pdf (DOC-211)', actor: 'borrower' },
      { id: 'EVT-043-010', timestamp: '2026-05-13T11:45:12Z', event: 'DOC-211 classified as LETTER_OF_EXPLANATION_EMPLOYMENT', actor: 'system' },
      { id: 'EVT-043-011', timestamp: '2026-05-13T11:48:00Z', event: 'Agent task started - CONDITION_REVIEW', actor: 'agent' },
      { id: 'EVT-043-012', timestamp: '2026-05-13T11:50:22Z', event: 'Condition review complete. 0 conditions satisfied. DOC-211 not matched to COND-207 - conditionId null.', actor: 'agent' }
    ]
  },

  'APP-1044': {
    loanId: 'APP-1044',
    stage: 'UNDERWRITING',
    uwDecision: 'PENDING',
    borrower: { id: 'BRW-6618', firstName: 'Sofia', lastName: 'Reyes', email: 'sofia.reyes@email.com', phone: '512-555-0277', ssn: '***-**-7804', dateOfBirth: '1988-06-30' },
    property: { address: '3309 Bluebonnet Ln', city: 'Austin', state: 'TX', zip: '78704', county: 'Travis', estimatedValue: 397000, propertyType: 'SINGLE_FAMILY', occupancy: 'PRIMARY_RESIDENCE' },
    loan: { amount: 310000, purpose: 'PURCHASE', program: '30_YEAR_FIXED', interestRate: 7.000, lienType: 'FIRST_LIEN', closingDate: '2026-07-15', originationChannel: 'RETAIL' },
    metrics: { ltv: 0.78, dti: 0.37, fico: 735, qualifiedIncome: 96000, qualifiedIncomeCorrected: null, cashToClose: 95400, reservesMonths: 5.1 },
    liabilities: [
      { id: 'LIAB-301', type: 'AUTO', creditor: 'Toyota Financial Services', monthlyPayment: 412, balance: 9800, propertyAddress: null, linkedPropertyId: null, linkedAt: null, linkedBy: null, warning: null }
    ],
    income: [
      { id: 'INC-301', type: 'W2_EMPLOYMENT', employer: 'Austin Tech Solutions', monthlyAmount: 7000, annualAmount: 84000, verificationStatus: 'VERIFIED', verifiedBy: 'agent', verifiedAt: '2026-05-03T10:00:00Z', grossUpApplied: false, grossUpRequired: false, grossUpFactor: null, source: 'pay_stubs' },
      { id: 'INC-302', type: 'RENTAL', employer: null, monthlyAmount: 1000, annualAmount: 12000, verificationStatus: 'VERIFIED', verifiedBy: 'agent', verifiedAt: '2026-05-03T10:00:00Z', grossUpApplied: false, grossUpRequired: false, grossUpFactor: null, source: 'lease_agreement' }
    ],
    assets: { bankAccounts: [{ id: 'ACCT-301', institution: 'Frost Bank', accountType: 'CHECKING', accountNumberMasked: '****9182', balance: 47500, transactions: [
      { date: '2026-03-01', description: 'Direct Deposit - Austin Tech Solutions', amount: 7000, type: 'CREDIT', flagged: false, conditionId: null, agentMissed: false },
      { date: '2026-03-08', description: 'ACH Deposit - External Transfer', amount: 12500, type: 'CREDIT', flagged: false, conditionId: null, agentMissed: true },
      { date: '2026-03-15', description: 'Direct Deposit - Austin Tech Solutions', amount: 7000, type: 'CREDIT', flagged: false, conditionId: null, agentMissed: false },
      { date: '2026-03-22', description: 'Incoming Wire Transfer', amount: 20000, type: 'CREDIT', flagged: true, flagReason: 'Single deposit exceeds $10,000. Fannie Mae guidelines require letter of explanation.', conditionId: 'COND-308', agentMissed: false }
    ]}] },
    conditions: [
      { id: 'COND-301', description: 'Provide signed purchase agreement', assignedTo: 'BORROWER', status: 'SATISFIED', createdAt: '2026-05-01T09:00:00Z', satisfiedAt: '2026-05-02T10:00:00Z', satisfiedBy: 'agent', documentId: 'DOC-301' },
      { id: 'COND-302', description: 'Provide 2 months pay stubs', assignedTo: 'BORROWER', status: 'SATISFIED', createdAt: '2026-05-01T09:00:00Z', satisfiedAt: '2026-05-03T09:00:00Z', satisfiedBy: 'agent', documentId: 'DOC-302' },
      { id: 'COND-303', description: 'Provide 3 months bank statements', assignedTo: 'BORROWER', status: 'SATISFIED', createdAt: '2026-05-01T09:00:00Z', satisfiedAt: '2026-05-05T10:00:00Z', satisfiedBy: 'agent', documentId: 'DOC-304' },
      { id: 'COND-308', description: 'Provide letter of explanation for $20,000 wire transfer received 03/22/2026', assignedTo: 'BORROWER', status: 'OPEN', createdAt: '2026-05-03T11:00:00Z', satisfiedAt: null, satisfiedBy: null, documentId: null }
    ],
    documents: [
      { id: 'DOC-301', filename: 'purchase_agreement_reyes.pdf', type: 'PURCHASE_AGREEMENT', uploadedAt: '2026-05-01T10:00:00Z', uploadedBy: 'loan_officer', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-05-01T10:01:44Z', classificationTime: '104s', classifiedBy: 'doc_intelligence', linkedTo: 'APP-1044' },
      { id: 'DOC-302', filename: 'paystubs_mar_apr_reyes.pdf', type: 'PAY_STUB', uploadedAt: '2026-05-02T09:30:00Z', uploadedBy: 'borrower', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-05-02T09:31:12Z', classificationTime: '72s', classifiedBy: 'doc_intelligence', linkedTo: 'INC-301' },
      { id: 'DOC-303', filename: 'drivers_license_reyes.pdf', type: 'GOVERNMENT_ID', uploadedAt: '2026-05-01T08:30:00Z', uploadedBy: 'borrower', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-05-01T08:31:28Z', classificationTime: '88s', classifiedBy: 'doc_intelligence', linkedTo: 'BRW-6618' },
      { id: 'DOC-304', filename: 'bank_stmts_jan_feb_mar_reyes.pdf', type: 'BANK_STATEMENT', uploadedAt: '2026-05-05T09:30:00Z', uploadedBy: 'borrower', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-05-05T09:31:05Z', classificationTime: '65s', classifiedBy: 'doc_intelligence', linkedTo: 'ACCT-301' }
    ],
    agentTasks: [
      { id: 'TASK-301', name: 'Order credit and initialize automations', objective: 'Pull credit report, enable compliance monitoring, order closing costs', status: 'COMPLETED', startedAt: '2026-05-01T08:50:00Z', completedAt: '2026-05-01T08:58:00Z', chainOfThought: ['Identified 1 borrower: Sofia Reyes (BRW-6618)', 'Credit pulled: FICO 735. 1 auto tradeline, 2 open tradelines, 0 derogatory', 'Compliance monitoring enabled', 'Closing cost estimate: $10,140'], output: 'Credit pulled. FICO 735. Compliance monitoring active.', warning: null, error: null },
      { id: 'TASK-303', name: 'Calculate qualified income', objective: 'Calculate total qualified income using Fannie Mae guidelines', status: 'COMPLETED', startedAt: '2026-05-03T10:00:00Z', completedAt: '2026-05-03T10:08:00Z', chainOfThought: ['Found 2 income sources: W-2 and rental income', 'W-2: $7,000/month. Annualized: $84,000.', 'Rental income: $1,000/month from lease agreement. Annualized: $12,000.', 'Total qualified income: $96,000.'], output: 'Qualified income: $96,000.', warning: null, error: null },
      { id: 'TASK-304', name: 'Review assets and flag large deposits', objective: 'Review all bank statements. Flag deposits exceeding $10,000. Create LOE conditions.', status: 'COMPLETED_WITH_ERRORS', startedAt: '2026-05-05T09:45:00Z', completedAt: '2026-05-05T09:58:00Z', chainOfThought: ['Statements on file: Jan 2026, Feb 2026, March 2026.', 'Reviewing all statements...', 'January: 6 transactions. No deposits exceeding $10,000.', 'February: 5 transactions. No deposits exceeding $10,000.', 'March: reviewing transactions...', 'Found 1 deposit exceeding $10,000: $20,000 wire on 03/22. Created COND-308.', 'Review complete. Asset calculator run. Balance $47,500. Reserves 5.1 months.'], output: '1 large deposit flagged. COND-308 created for $20,000 wire.', warning: 'INCOMPLETE_REVIEW: $12,500 ACH deposit on 03/08 was not flagged. Deposit exceeds $10,000 Fannie Mae threshold but no condition was created.', error: null }
    ],
    auditTrail: [
      { id: 'EVT-044-001', timestamp: '2026-05-01T08:45:00Z', event: 'Loan file created - APP-1044', actor: 'system' },
      { id: 'EVT-044-002', timestamp: '2026-05-01T08:50:00Z', event: 'Credit order automation triggered', actor: 'system' },
      { id: 'EVT-044-003', timestamp: '2026-05-01T08:58:00Z', event: 'Credit pulled - FICO 735, VantageScore 748', actor: 'agent' },
      { id: 'EVT-044-004', timestamp: '2026-05-03T10:08:00Z', event: 'Qualified income set to $96,000.', actor: 'agent' },
      { id: 'EVT-044-005', timestamp: '2026-05-05T09:58:00Z', event: 'Asset review complete. 1 condition created (COND-308). Warning: $12,500 deposit not flagged.', actor: 'agent' }
    ]
  },

  'APP-1045': {
    loanId: 'APP-1045',
    stage: 'PRE-CLOSING',
    uwDecision: 'APPROVE_ELIGIBLE',
    borrower: { id: 'BRW-4401', firstName: 'Trevor', lastName: 'Holt', email: 'trevor.holt@email.com', phone: '303-555-0512', ssn: '***-**-1190', dateOfBirth: '1975-09-17' },
    property: { address: '7712 Ponderosa Ave', city: 'Denver', state: 'CO', zip: '80219', county: 'Denver', estimatedValue: 240000, propertyType: 'SINGLE_FAMILY', occupancy: 'PRIMARY_RESIDENCE' },
    loan: { amount: 189000, purpose: 'PURCHASE', program: '30_YEAR_FIXED', interestRate: 6.625, lienType: 'FIRST_LIEN', closingDate: '2026-06-01', originationChannel: 'RETAIL' },
    metrics: { ltv: 0.79, dti: 0.31, fico: 780, qualifiedIncome: 88000, qualifiedIncomeCorrected: null, cashToClose: 57000, reservesMonths: 8.2 },
    liabilities: [
      { id: 'LIAB-401', type: 'AUTO', creditor: 'Ford Motor Credit', monthlyPayment: 348, balance: 8100, propertyAddress: null, linkedPropertyId: null, linkedAt: null, linkedBy: null, warning: null }
    ],
    income: [
      { id: 'INC-401', type: 'W2_EMPLOYMENT', employer: 'Rocky Mountain Engineering', monthlyAmount: 6000, annualAmount: 72000, verificationStatus: 'VERIFIED', verifiedBy: 'agent', verifiedAt: '2026-04-20T09:00:00Z', grossUpApplied: false, grossUpRequired: false, grossUpFactor: null, source: 'pay_stubs' },
      { id: 'INC-402', type: 'PART_TIME', employer: 'Freelance Consulting', monthlyAmount: 1333, annualAmount: 16000, verificationStatus: 'VERIFIED', verifiedBy: 'agent', verifiedAt: '2026-04-20T09:00:00Z', grossUpApplied: false, grossUpRequired: false, grossUpFactor: null, source: 'tax_returns' }
    ],
    assets: { bankAccounts: [{ id: 'ACCT-401', institution: 'Vectra Bank', accountType: 'CHECKING', accountNumberMasked: '****5544', balance: 62000, transactions: [
      { date: '2026-03-01', description: 'Direct Deposit - Rocky Mountain Engineering', amount: 6000, type: 'CREDIT', flagged: false, conditionId: null, agentMissed: false },
      { date: '2026-03-15', description: 'Direct Deposit - Rocky Mountain Engineering', amount: 6000, type: 'CREDIT', flagged: false, conditionId: null, agentMissed: false },
      { date: '2026-04-01', description: 'Direct Deposit - Rocky Mountain Engineering', amount: 6000, type: 'CREDIT', flagged: false, conditionId: null, agentMissed: false }
    ]}] },
    conditions: [
      { id: 'COND-401', description: 'Provide signed purchase agreement', assignedTo: 'BORROWER', status: 'SATISFIED', createdAt: '2026-04-18T08:00:00Z', satisfiedAt: '2026-04-19T09:30:00Z', satisfiedBy: 'agent', documentId: 'DOC-401' },
      { id: 'COND-402', description: 'Provide 2 months pay stubs', assignedTo: 'BORROWER', status: 'SATISFIED', createdAt: '2026-04-18T08:00:00Z', satisfiedAt: '2026-04-20T08:30:00Z', satisfiedBy: 'agent', documentId: 'DOC-402' },
      { id: 'COND-403', description: 'Provide 2 years tax returns', assignedTo: 'BORROWER', status: 'SATISFIED', createdAt: '2026-04-18T08:00:00Z', satisfiedAt: '2026-04-20T09:00:00Z', satisfiedBy: 'agent', documentId: 'DOC-403' },
      { id: 'COND-404', description: 'Provide 3 months bank statements', assignedTo: 'BORROWER', status: 'SATISFIED', createdAt: '2026-04-18T08:00:00Z', satisfiedAt: '2026-04-22T10:00:00Z', satisfiedBy: 'agent', documentId: 'DOC-404' },
      { id: 'COND-405', description: 'Final title commitment', assignedTo: 'TITLE_COMPANY', status: 'SATISFIED', createdAt: '2026-04-25T08:00:00Z', satisfiedAt: '2026-05-08T14:00:00Z', satisfiedBy: 'system', documentId: 'DOC-405' }
    ],
    documents: [
      { id: 'DOC-401', filename: 'purchase_agreement_holt.pdf', type: 'PURCHASE_AGREEMENT', uploadedAt: '2026-04-18T09:00:00Z', uploadedBy: 'loan_officer', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-04-18T09:01:38Z', classificationTime: '98s', classifiedBy: 'doc_intelligence', linkedTo: 'APP-1045' },
      { id: 'DOC-402', filename: 'paystubs_feb_mar_holt.pdf', type: 'PAY_STUB', uploadedAt: '2026-04-19T10:00:00Z', uploadedBy: 'borrower', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-04-19T10:01:14Z', classificationTime: '74s', classifiedBy: 'doc_intelligence', linkedTo: 'INC-401' },
      { id: 'DOC-403', filename: 'tax_returns_2024_2025_holt.pdf', type: 'TAX_RETURN', uploadedAt: '2026-04-20T08:45:00Z', uploadedBy: 'borrower', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-04-20T08:46:52Z', classificationTime: '112s', classifiedBy: 'doc_intelligence', linkedTo: 'INC-402' },
      { id: 'DOC-404', filename: 'bank_stmts_jan_feb_mar_holt.pdf', type: 'BANK_STATEMENT', uploadedAt: '2026-04-22T09:30:00Z', uploadedBy: 'borrower', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-04-22T09:31:08Z', classificationTime: '68s', classifiedBy: 'doc_intelligence', linkedTo: 'ACCT-401' },
      { id: 'DOC-405', filename: 'title_commitment_holt.pdf', type: 'TITLE_COMMITMENT', uploadedAt: '2026-05-08T14:00:00Z', uploadedBy: 'system', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-05-08T14:00:58Z', classificationTime: '58s', classifiedBy: 'doc_intelligence', linkedTo: 'APP-1045' },
      { id: 'DOC-406', filename: 'drivers_license_holt.pdf', type: 'GOVERNMENT_ID', uploadedAt: '2026-04-18T08:30:00Z', uploadedBy: 'borrower', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-04-18T08:31:22Z', classificationTime: '82s', classifiedBy: 'doc_intelligence', linkedTo: 'BRW-4401' }
    ],
    agentTasks: [
      { id: 'TASK-401', name: 'Order credit and initialize automations', objective: 'Pull credit report, enable compliance monitoring, order closing costs', status: 'COMPLETED', startedAt: '2026-04-18T08:05:00Z', completedAt: '2026-04-18T08:12:00Z', chainOfThought: ['Identified 1 borrower: Trevor Holt (BRW-4401)', 'Credit pulled: FICO 780. 1 auto tradeline, 2 open tradelines, 0 derogatory', 'Compliance monitoring enabled - all RESPA and TRID timelines on track', 'Closing cost estimate: $7,240'], output: 'Credit pulled. FICO 780. Compliance monitoring active. All timelines on track.', warning: null, error: null }
    ],
    auditTrail: [
      { id: 'EVT-045-001', timestamp: '2026-04-18T08:00:00Z', event: 'Loan file created - APP-1045', actor: 'system' },
      { id: 'EVT-045-002', timestamp: '2026-04-18T08:05:00Z', event: 'Credit order automation triggered', actor: 'system' },
      { id: 'EVT-045-003', timestamp: '2026-04-18T08:12:00Z', event: 'Credit pulled - FICO 780, VantageScore 792', actor: 'agent' },
      { id: 'EVT-045-004', timestamp: '2026-04-20T09:00:00Z', event: 'Qualified income set to $88,000.', actor: 'agent' },
      { id: 'EVT-045-005', timestamp: '2026-04-22T10:30:00Z', event: 'Asset review complete. No issues found.', actor: 'agent' },
      { id: 'EVT-045-006', timestamp: '2026-04-28T14:00:00Z', event: 'AUS submitted to Fannie Mae DU. Findings returned: APPROVE/ELIGIBLE.', actor: 'system' },
      { id: 'EVT-045-007', timestamp: '2026-05-05T10:00:00Z', event: 'All conditions satisfied. File ready for underwriter review.', actor: 'system' },
      { id: 'EVT-045-008', timestamp: '2026-05-08T14:00:00Z', event: 'Title commitment received and classified.', actor: 'system' },
      { id: 'EVT-045-009', timestamp: '2026-05-10T11:00:00Z', event: 'Underwriter approved loan. UW decision: APPROVE/ELIGIBLE.', actor: 'loan_officer' }
    ]
  },

  'APP-1046': {
    loanId: 'APP-1046',
    stage: 'APPLICATION',
    uwDecision: 'PENDING',
    borrower: { id: 'BRW-9903', firstName: 'Priya', lastName: 'Nair', email: 'priya.nair@email.com', phone: '415-555-0733', ssn: '***-**-4428', dateOfBirth: '1986-02-14' },
    property: { address: '1055 Pacific Heights Rd', city: 'San Francisco', state: 'CA', zip: '94115', county: 'San Francisco', estimatedValue: 800000, propertyType: 'SINGLE_FAMILY', occupancy: 'PRIMARY_RESIDENCE' },
    loan: { amount: 640000, purpose: 'PURCHASE', program: '30_YEAR_FIXED', interestRate: 7.250, lienType: 'FIRST_LIEN', closingDate: '2026-08-01', originationChannel: 'RETAIL' },
    metrics: { ltv: 0.80, dti: null, fico: 760, qualifiedIncome: null, qualifiedIncomeCorrected: null, cashToClose: 192000, reservesMonths: null },
    liabilities: [
      { id: 'LIAB-501', type: 'AUTO', creditor: 'BMW Financial Services', monthlyPayment: 680, balance: 22000, propertyAddress: null, linkedPropertyId: null, linkedAt: null, linkedBy: null, warning: null }
    ],
    income: [
      { id: 'INC-501', type: 'W2_EMPLOYMENT', employer: 'Apex Biotech Inc', monthlyAmount: 14500, annualAmount: 174000, verificationStatus: 'PENDING', verifiedBy: null, verifiedAt: null, grossUpApplied: false, grossUpRequired: false, grossUpFactor: null, source: 'pay_stubs' }
    ],
    assets: { bankAccounts: [{ id: 'ACCT-501', institution: 'First Republic Bank', accountType: 'CHECKING', accountNumberMasked: '****2241', balance: 215000, transactions: [
      { date: '2026-04-01', description: 'Direct Deposit - Apex Biotech Inc', amount: 14500, type: 'CREDIT', flagged: false, conditionId: null, agentMissed: false },
      { date: '2026-04-15', description: 'Direct Deposit - Apex Biotech Inc', amount: 14500, type: 'CREDIT', flagged: false, conditionId: null, agentMissed: false }
    ]}] },
    conditions: [
      { id: 'COND-501', description: 'Provide signed purchase agreement', assignedTo: 'BORROWER', status: 'SATISFIED', createdAt: '2026-05-12T09:00:00Z', satisfiedAt: '2026-05-13T08:00:00Z', satisfiedBy: 'agent', documentId: 'DOC-501' },
      { id: 'COND-502', description: 'Provide 2 months pay stubs', assignedTo: 'BORROWER', status: 'OPEN', createdAt: '2026-05-12T09:00:00Z', satisfiedAt: null, satisfiedBy: null, documentId: null },
      { id: 'COND-503', description: 'AUS findings - Fannie Mae Desktop Underwriter', assignedTo: 'SYSTEM', status: 'OPEN', createdAt: '2026-05-13T08:47:04Z', satisfiedAt: null, satisfiedBy: null, documentId: null }
    ],
    documents: [
      { id: 'DOC-501', filename: 'purchase_agreement_nair.pdf', type: 'PURCHASE_AGREEMENT', uploadedAt: '2026-05-13T07:55:00Z', uploadedBy: 'loan_officer', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-05-13T07:56:44Z', classificationTime: '104s', classifiedBy: 'doc_intelligence', linkedTo: 'APP-1046' },
      { id: 'DOC-502', filename: 'drivers_license_nair.pdf', type: 'GOVERNMENT_ID', uploadedAt: '2026-05-12T09:30:00Z', uploadedBy: 'borrower', classificationStatus: 'CLASSIFIED', classifiedAt: '2026-05-12T09:31:22Z', classificationTime: '82s', classifiedBy: 'doc_intelligence', linkedTo: 'BRW-9903' }
    ],
    agentTasks: [
      { id: 'TASK-501', name: 'Order credit and initialize automations', objective: 'Pull credit report, enable compliance monitoring, order closing costs', status: 'COMPLETED', startedAt: '2026-05-12T09:15:00Z', completedAt: '2026-05-12T09:23:00Z', chainOfThought: ['Identified 1 borrower: Priya Nair (BRW-9903)', 'Credit pulled: FICO 760. 1 auto tradeline, 3 open tradelines, 0 derogatory', 'Compliance monitoring enabled', 'Closing cost estimate: $15,280'], output: 'Credit pulled. FICO 760. Compliance monitoring active.', warning: null, error: null },
      { id: 'TASK-006', name: 'Trigger AUS after intent to proceed', objective: 'After intent to proceed is recorded, run AUS via Fannie Mae Desktop Underwriter and update loan with findings', status: 'NOT_TRIGGERED', startedAt: null, completedAt: null, chainOfThought: [], output: null, warning: null, error: 'WORKFLOW_TRIGGER_FAILURE: Intent to proceed recorded at 08:47 AM. AUS trigger automation did not fire. No task created, no error logged. Downstream income and asset tasks are blocked pending AUS findings.' }
    ],
    auditTrail: [
      { id: 'EVT-046-001', timestamp: '2026-05-12T09:10:00Z', event: 'Loan file created - APP-1046', actor: 'system' },
      { id: 'EVT-046-002', timestamp: '2026-05-12T09:15:00Z', event: 'Credit order automation triggered', actor: 'system' },
      { id: 'EVT-046-003', timestamp: '2026-05-12T09:23:00Z', event: 'Credit pulled - FICO 760, VantageScore 774', actor: 'agent' },
      { id: 'EVT-046-004', timestamp: '2026-05-13T08:45:00Z', event: 'Disclosures sent to borrower', actor: 'system' },
      { id: 'EVT-046-005', timestamp: '2026-05-13T08:47:03Z', event: 'Borrower signed disclosures. Intent to proceed recorded.', actor: 'system' },
      { id: 'EVT-046-006', timestamp: '2026-05-13T08:47:04Z', event: 'Expected: AUS trigger automation. Actual: no event fired.', actor: 'system' }
    ]
  }

};
