import { Clock, Play, Pause, Trash2, Plus } from 'lucide-react';
import { motion } from 'motion/react';

interface ScheduledJob {
  id: string;
  name: string;
  cron: string;
  nextRun: string;
  enabled: boolean;
  workflow: string;
}

const mockJobs: ScheduledJob[] = [
  { id: '1', name: 'Morning Report', cron: '0 9 * * *', nextRun: 'Tomorrow at 9:00 AM', enabled: true, workflow: 'daily_report_export' },
  { id: '2', name: 'Hourly Check', cron: '0 * * * *', nextRun: 'In 23 minutes', enabled: true, workflow: 'email_automation' },
  { id: '3', name: 'Weekly Backup', cron: '0 0 * * 0', nextRun: 'Sunday at 12:00 AM', enabled: false, workflow: 'backup_workflow' },
];

export function SchedulerPanel() {
  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-primary flex items-center gap-2">
          <Clock className="w-5 h-5" />
          SCHEDULER
        </h2>
        <button className="bg-primary text-primary-foreground px-3 py-1.5 rounded text-xs font-mono flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus className="w-3.5 h-3.5" />
          ADD JOB
        </button>
      </div>

      <div className="space-y-2">
        {mockJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-muted/20 border border-border/50 rounded p-4 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${job.enabled ? 'bg-success' : 'bg-muted-foreground'}`} />
                  <h3 className="font-mono text-sm text-foreground">{job.name}</h3>
                  <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    {job.cron}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono ml-5">
                  <div className="text-muted-foreground">
                    WORKFLOW: <span className="text-foreground">{job.workflow}</span>
                  </div>
                  <div className="text-muted-foreground">
                    NEXT: <span className="text-warning">{job.nextRun}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="text-muted-foreground hover:text-primary transition-colors p-1">
                  {job.enabled ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
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
