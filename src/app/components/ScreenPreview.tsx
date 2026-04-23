import { Monitor, Maximize2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ScreenPreview() {
  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-primary flex items-center gap-2">
          <Monitor className="w-5 h-5" />
          SCREEN_CAPTURE
        </h2>
        <button className="text-muted-foreground hover:text-primary transition-colors">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      <div className="aspect-video bg-muted/20 rounded border border-border/50 overflow-hidden relative group">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
          alt="Screen capture preview"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-muted-foreground font-mono text-sm">
            WAITING FOR CAPTURE...
          </div>
        </div>

        {/* Detection overlay */}
        <div className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm border border-primary/50 rounded px-3 py-1.5 text-xs font-mono text-primary">
          12 ELEMENTS DETECTED
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-xs font-mono">
        <div className="bg-muted/20 rounded p-2 space-y-1">
          <div className="text-muted-foreground">RESOLUTION</div>
          <div className="text-foreground">1920×1080</div>
        </div>
        <div className="bg-muted/20 rounded p-2 space-y-1">
          <div className="text-muted-foreground">FPS</div>
          <div className="text-success">30</div>
        </div>
        <div className="bg-muted/20 rounded p-2 space-y-1">
          <div className="text-muted-foreground">LATENCY</div>
          <div className="text-warning">95ms</div>
        </div>
      </div>
    </div>
  );
}
