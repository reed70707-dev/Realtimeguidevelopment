import { Play, Square, Pause, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

type AgentStatus = 'idle' | 'running' | 'paused' | 'error';

export function AgentControl() {
  const [status, setStatus] = useState<AgentStatus>('idle');
  const [goal, setGoal] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [maxSteps] = useState(10);

  const handleStart = () => {
    if (goal.trim()) {
      setStatus('running');
      setCurrentStep(0);
    }
  };

  const handleStop = () => {
    setStatus('idle');
    setCurrentStep(0);
  };

  const handlePause = () => {
    setStatus(status === 'paused' ? 'running' : 'paused');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-primary">AGENT_CONTROL</h2>
        <StatusBadge status={status} />
      </div>

      <div className="space-y-3">
        <label className="block text-sm text-muted-foreground font-mono">
          OBJECTIVE
        </label>
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Enter task objective..."
          disabled={status === 'running' || status === 'paused'}
          className="w-full bg-input-background border border-border rounded px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
        />
      </div>

      {status !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="flex justify-between text-sm text-muted-foreground font-mono">
            <span>PROGRESS</span>
            <span>{currentStep}/{maxSteps}</span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / maxSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      )}

      <div className="flex gap-3">
        {status === 'idle' && (
          <button
            onClick={handleStart}
            disabled={!goal.trim()}
            className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded font-mono flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4" />
            EXECUTE
          </button>
        )}

        {(status === 'running' || status === 'paused') && (
          <>
            <button
              onClick={handlePause}
              className="flex-1 bg-warning text-primary-foreground px-6 py-3 rounded font-mono flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              {status === 'paused' ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              {status === 'paused' ? 'RESUME' : 'PAUSE'}
            </button>
            <button
              onClick={handleStop}
              className="flex-1 bg-destructive text-white px-6 py-3 rounded font-mono flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Square className="w-4 h-4" />
              STOP
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: AgentStatus }) {
  const config = {
    idle: { label: 'IDLE', color: 'text-muted-foreground', bg: 'bg-muted' },
    running: { label: 'ACTIVE', color: 'text-success', bg: 'bg-success/10', pulse: true },
    paused: { label: 'PAUSED', color: 'text-warning', bg: 'bg-warning/10' },
    error: { label: 'ERROR', color: 'text-destructive', bg: 'bg-destructive/10' },
  };

  const { label, color, bg, pulse } = config[status];

  return (
    <div className={`${bg} ${color} px-3 py-1 rounded text-xs font-mono flex items-center gap-2`}>
      <div className={`w-2 h-2 rounded-full ${color.replace('text-', 'bg-')} ${pulse ? 'animate-pulse' : ''}`} />
      {label}
    </div>
  );
}
