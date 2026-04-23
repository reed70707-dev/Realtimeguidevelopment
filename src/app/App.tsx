import { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Workflow, Clock, History, Settings, Zap } from 'lucide-react';
import { AgentControl } from './components/AgentControl';
import { ScreenPreview } from './components/ScreenPreview';
import { ThoughtStream } from './components/ThoughtStream';
import { WorkflowPanel } from './components/WorkflowPanel';
import { SchedulerPanel } from './components/SchedulerPanel';
import { HistoryPanel } from './components/HistoryPanel';
import { SettingsPanel } from './components/SettingsPanel';

type Tab = 'monitor' | 'workflows' | 'scheduler' | 'history' | 'settings';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('monitor');

  const tabs = [
    { id: 'monitor' as Tab, label: 'Monitor', icon: Activity },
    { id: 'workflows' as Tab, label: 'Workflows', icon: Workflow },
    { id: 'scheduler' as Tab, label: 'Scheduler', icon: Clock },
    { id: 'history' as Tab, label: 'History', icon: History },
    { id: 'settings' as Tab, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      {/* Header */}
      <div className="max-w-[1800px] mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary text-primary-foreground p-3 rounded">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl tracking-tight">VISION_AI_AGENT</h1>
              <p className="text-sm text-muted-foreground font-sans">
                Autonomous Desktop Control System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-muted-foreground">GPU: RTX 3060</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-muted-foreground">BACKEND: ONLINE</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex gap-2 border-b border-border">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-3 font-mono text-sm flex items-center gap-2 transition-colors ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="max-w-[1800px] mx-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'monitor' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <AgentControl />
                <ScreenPreview />
              </div>
              <div>
                <ThoughtStream />
              </div>
            </div>
          )}

          {activeTab === 'workflows' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WorkflowPanel />
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <h3 className="text-primary font-mono">WORKFLOW_BUILDER</h3>
                <div className="aspect-square bg-muted/20 rounded border border-border/50 flex items-center justify-center">
                  <div className="text-muted-foreground font-mono text-sm text-center">
                    SELECT A WORKFLOW<br />TO EDIT OR PREVIEW
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'scheduler' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SchedulerPanel />
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <h3 className="text-primary font-mono">EXECUTION_LOG</h3>
                <div className="space-y-2">
                  {[
                    { time: '09:00:00', job: 'Morning Report', status: 'success' },
                    { time: '10:00:00', job: 'Hourly Check', status: 'success' },
                    { time: '11:00:00', job: 'Hourly Check', status: 'success' },
                    { time: '12:00:00', job: 'Hourly Check', status: 'failed' },
                  ].map((log, i) => (
                    <div
                      key={i}
                      className="bg-muted/20 border border-border/50 rounded p-3 flex items-center justify-between text-xs font-mono"
                    >
                      <span className="text-muted-foreground">{log.time}</span>
                      <span className="text-foreground">{log.job}</span>
                      <span
                        className={
                          log.status === 'success'
                            ? 'text-success'
                            : 'text-destructive'
                        }
                      >
                        {log.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <HistoryPanel />
              </div>
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                  <h3 className="text-primary font-mono text-sm">STATISTICS</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground font-mono">
                        TOTAL EXECUTIONS
                      </span>
                      <span className="text-lg font-mono text-foreground">127</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground font-mono">
                        SUCCESS RATE
                      </span>
                      <span className="text-lg font-mono text-success">94%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground font-mono">
                        AVG DURATION
                      </span>
                      <span className="text-lg font-mono text-warning">1m 32s</span>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                  <h3 className="text-primary font-mono text-sm">
                    RECENT_ERRORS
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="bg-destructive/10 border border-destructive/50 rounded p-3 text-destructive font-mono">
                      Element not found: #submit-btn
                    </div>
                    <div className="bg-destructive/10 border border-destructive/50 rounded p-3 text-destructive font-mono">
                      Timeout waiting for page load
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SettingsPanel />
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <h3 className="text-primary font-mono">SYSTEM_STATUS</h3>
                <div className="space-y-3">
                  <div className="bg-muted/20 rounded p-4 space-y-2">
                    <div className="text-xs text-muted-foreground font-mono">
                      VISION PIPELINE
                    </div>
                    <div className="text-sm text-success">OPERATIONAL</div>
                  </div>
                  <div className="bg-muted/20 rounded p-4 space-y-2">
                    <div className="text-xs text-muted-foreground font-mono">
                      LLM BACKEND
                    </div>
                    <div className="text-sm text-success">OPERATIONAL</div>
                  </div>
                  <div className="bg-muted/20 rounded p-4 space-y-2">
                    <div className="text-xs text-muted-foreground font-mono">
                      ACTION ENGINE
                    </div>
                    <div className="text-sm text-success">OPERATIONAL</div>
                  </div>
                  <div className="bg-muted/20 rounded p-4 space-y-2">
                    <div className="text-xs text-muted-foreground font-mono">
                      MEMORY STORE
                    </div>
                    <div className="text-sm text-success">OPERATIONAL</div>
                    <div className="text-xs text-muted-foreground font-mono mt-2">
                      DATABASE: 2.4 MB • 147 RECORDS
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
