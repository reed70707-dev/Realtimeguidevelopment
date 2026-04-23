import { Play, Trash2, Edit, Download, Plus, Circle } from 'lucide-react';
import { motion } from 'motion/react';

interface Workflow {
  id: string;
  name: string;
  steps: number;
  lastRun?: string;
  status: 'ready' | 'running' | 'error';
}

const mockWorkflows: Workflow[] = [
  { id: '1', name: 'open_chrome_navigate', steps: 5, lastRun: '2 hours ago', status: 'ready' },
  { id: '2', name: 'daily_report_export', steps: 12, lastRun: '1 day ago', status: 'ready' },
  { id: '3', name: 'email_automation', steps: 8, status: 'ready' },
];

export function WorkflowPanel() {
  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-primary">WORKFLOWS</h2>
        <button className="bg-primary text-primary-foreground px-3 py-1.5 rounded text-xs font-mono flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus className="w-3.5 h-3.5" />
          NEW
        </button>
      </div>

      <div className="space-y-2">
        {mockWorkflows.map((workflow, index) => (
          <motion.div
            key={workflow.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-muted/20 border border-border/50 rounded p-4 hover:border-primary/50 transition-colors group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    workflow.status === 'ready' ? 'bg-success' :
                    workflow.status === 'running' ? 'bg-warning animate-pulse' :
                    'bg-destructive'
                  }`} />
                  <h3 className="font-mono text-sm text-foreground">{workflow.name}</h3>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                  <span>{workflow.steps} STEPS</span>
                  {workflow.lastRun && (
                    <>
                      <Circle className="w-1 h-1 fill-current" />
                      <span>LAST RUN: {workflow.lastRun.toUpperCase()}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-primary hover:text-primary/80 transition-colors p-1">
                  <Play className="w-3.5 h-3.5" />
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button className="text-muted-foreground hover:text-destructive transition-colors p-1">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
