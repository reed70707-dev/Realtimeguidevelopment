import { Brain, Eye, MousePointer, Keyboard } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

type ThoughtType = 'observe' | 'decide' | 'act';

interface Thought {
  id: number;
  type: ThoughtType;
  content: string;
  timestamp: string;
}

const mockThoughts: Thought[] = [
  { id: 1, type: 'observe', content: 'Detected Chrome browser window at coordinates (120, 45)', timestamp: '14:32:01' },
  { id: 2, type: 'decide', content: 'Planning to click on address bar to enter URL', timestamp: '14:32:02' },
  { id: 3, type: 'act', content: 'Mouse moved to (450, 85) and clicked', timestamp: '14:32:03' },
  { id: 4, type: 'observe', content: 'Address bar now focused, cursor visible', timestamp: '14:32:04' },
  { id: 5, type: 'decide', content: 'Will type target URL: github.com', timestamp: '14:32:05' },
];

export function ThoughtStream() {
  const [thoughts, setThoughts] = useState<Thought[]>(mockThoughts);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const newThought: Thought = {
        id: Date.now(),
        type: ['observe', 'decide', 'act'][Math.floor(Math.random() * 3)] as ThoughtType,
        content: 'Processing agent decision...',
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      };

      setThoughts(prev => [...prev.slice(-9), newThought]);
    }, 3000);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-primary flex items-center gap-2">
          <Brain className="w-5 h-5" />
          THOUGHT_STREAM
        </h2>
        <button
          onClick={() => setIsActive(!isActive)}
          className={`text-xs font-mono px-2 py-1 rounded ${
            isActive ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
          }`}
        >
          {isActive ? 'LIVE' : 'PAUSED'}
        </button>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {thoughts.map((thought, index) => (
          <motion.div
            key={thought.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-muted/20 border-l-2 border-l-primary/50 rounded p-3 space-y-1"
          >
            <div className="flex items-center justify-between text-xs">
              <ThoughtIcon type={thought.type} />
              <span className="text-muted-foreground font-mono">{thought.timestamp}</span>
            </div>
            <div className="text-sm text-foreground font-sans">{thought.content}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ThoughtIcon({ type }: { type: ThoughtType }) {
  const icons = {
    observe: { icon: Eye, label: 'OBSERVE', color: 'text-chart-2' },
    decide: { icon: Brain, label: 'DECIDE', color: 'text-chart-3' },
    act: { icon: MousePointer, label: 'ACT', color: 'text-primary' },
  };

  const { icon: Icon, label, color } = icons[type];

  return (
    <div className={`flex items-center gap-2 font-mono ${color}`}>
      <Icon className="w-3.5 h-3.5" />
      <span className="text-xs">{label}</span>
    </div>
  );
}
