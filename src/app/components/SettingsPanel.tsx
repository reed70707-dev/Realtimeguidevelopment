import { Settings, ChevronRight } from 'lucide-react';

interface SettingSection {
  label: string;
  value: string;
  description: string;
}

const sections: SettingSection[] = [
  { label: 'Vision Model', value: 'Moondream2', description: 'Screen understanding and OCR' },
  { label: 'LLM Backend', value: 'Qwen2.5-14B-Instruct', description: 'Decision making model' },
  { label: 'Capture Rate', value: '30 FPS', description: 'Screen capture frequency' },
  { label: 'Max Steps', value: '10', description: 'Maximum execution steps per task' },
  { label: 'GPU Acceleration', value: 'Enabled (RTX 3060)', description: 'Hardware acceleration status' },
  { label: 'MCP Integration', value: 'Active', description: 'Model Context Protocol tools' },
];

export function SettingsPanel() {
  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-primary flex items-center gap-2">
          <Settings className="w-5 h-5" />
          CONFIGURATION
        </h2>
      </div>

      <div className="space-y-1">
        {sections.map((section, index) => (
          <button
            key={index}
            className="w-full bg-muted/20 border border-border/50 rounded p-4 hover:border-primary/50 transition-colors text-left group"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-muted-foreground">{section.label}</span>
                  <span className="text-sm text-foreground">{section.value}</span>
                </div>
                <div className="text-xs text-muted-foreground">{section.description}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
