function syntaxHighlight(json) {
  return json
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      match => {
        let cls = 'jv-n'
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? 'jk' : 'jv-s'
        } else if (/true|false/.test(match)) {
          cls = 'jv-b'
        } else if (/null/.test(match)) {
          cls = 'jv-null'
        }
        return `<span class="${cls}">${match}</span>`
      }
    )
}

export default function LoanJSON({ loan, mutations }) {
  const merged = {
    ...loan,
    _mutations: mutations
  }
  const json = JSON.stringify(merged, null, 2)
  return (
    <>
      <div className="section-title">Loan Data Object</div>
      <div
        id="json-view"
        dangerouslySetInnerHTML={{ __html: syntaxHighlight(json) }}
      />
    </>
  )
}
