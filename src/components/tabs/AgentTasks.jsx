import { useState } from 'react'

const STATUS_CLS = {
  COMPLETED: 'ts-completed',
  FAILED: 'ts-failed',
  COMPLETED_WITH_ERRORS: 'ts-errors',
  STUCK: 'ts-stuck',
  NOT_TRIGGERED: 'ts-nottriggered'
}

const STATUS_LABEL = {
  COMPLETED: 'Completed',
  FAILED: 'Failed',
  COMPLETED_WITH_ERRORS: 'Completed with Errors',
  STUCK: 'Stuck',
  NOT_TRIGGERED: 'Not Triggered'
}

function TaskCard({ task }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="agent-task">
      <div className="agent-task-header" onClick={() => setOpen(o => !o)}>
        <div>
          <div className="task-name">{task.name}</div>
          <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
            {task.startedAt ? task.startedAt.replace('T', ' ').slice(0, 19) + 'Z' : 'Not started'}
          </div>
        </div>
        <span className={`task-status ${STATUS_CLS[task.status] || 'ts-nottriggered'}`}>
          {STATUS_LABEL[task.status] || task.status}
        </span>
        <span style={{ fontSize: '11px', color: '#9ca3af', marginLeft: '6px' }}>{open ? '▴' : '▾'}</span>
      </div>
      {open && (
        <div className="agent-task-body">
          <div className="cot-section">
            <div className="cot-title">Objective</div>
            <div style={{ fontSize: '12px', color: '#374151', marginBottom: '8px' }}>{task.objective}</div>
            <div className="cot-title">Chain of Thought</div>
            <ul className="cot-list">
              {task.chainOfThought && task.chainOfThought.length > 0
                ? task.chainOfThought.map((c, i) => <li key={i}>{c}</li>)
                : <li style={{ color: '#9ca3af' }}>No chain of thought recorded - task was not triggered</li>
              }
            </ul>
          </div>
          {task.output && (
            <div className="output-box"><strong>Output:</strong> {task.output}</div>
          )}
          {task.warning && (
            <div className="warn-box"><strong>Warning:</strong> {task.warning}</div>
          )}
          {task.error && (
            <div className="error-box"><strong>Error:</strong> {task.error}</div>
          )}
        </div>
      )}
    </div>
  )
}

export default function AgentTasks({ loan }) {
  const tasks = loan.agentTasks || []
  return (
    <>
      <div className="section-title">Agent Tasks</div>
      {tasks.map(t => <TaskCard key={t.id} task={t} />)}
      {tasks.length === 0 && (
        <div style={{ color: '#9ca3af', fontSize: '13px' }}>No agent tasks on file.</div>
      )}
    </>
  )
}
