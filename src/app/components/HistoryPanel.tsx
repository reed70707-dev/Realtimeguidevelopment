import { History, ChevronRight, CheckCircle, XCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface Execution {
  id: string;
  goal: string;
  timestamp: string;
  duration: string;
  steps: number;
  status: 'success' | 'failed' | 'cancelled';
}

const mockHistory: Execution[] = [
  { id: '1', goal: 'Open Chrome and navigate to GitHub', timestamp: '2 hours ago', duration: '45s', steps: 8, status: 'success' },
  { id: '2', goal: 'Export daily analytics report', timestamp: '1 day ago', duration: '2m 15s', steps: 12, status: 'success' },
  { id: '3', goal: 'Send automated email notifications', timestamp: '2 days ago', duration: '1m 5s', steps: 6, status: 'failed' },
  { id: '4', goal: 'Update project management board', timestamp: '3 days ago', duration: '38s', steps: 5, status: 'cancelled' },
];

export function HistoryPanel() {
  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-primary flex items-center gap-2">
          <History className="w-5 h-5" />
          EXECUTION_HISTORY
        </h2>
        <button className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
          VIEW ALL
        </button>
      </div>

      <div className="space-y-2">
        {mockHistory.map((execution, index) => (
          <motion.div
            key={execution.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-muted/20 border border-border/50 rounded p-4 hover:border-primary/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <StatusIcon status={execution.status} />
                  <h3 className="text-sm text-foreground">{execution.goal}</h3>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                  <span>{execution.timestamp.toUpperCase()}</span>
                  <span>•</span>
                  <Clock className="w-3 h-3" />
                  <span>{execution.duration}</span>
                  <span>•</span>
                  <span>{execution.steps} STEPS</span>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StatusIcon({ status }: { status: Execution['status'] }) {
  if (status === 'success') {
    return <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />;
  }
  if (status === 'failed') {
    return <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />;
  }
  return <XCircle className="w-4 h-4 text-warning flex-shrink-0" />;
}
