import { Play, Trash2, Keyboard } from "lucide-react";

interface SoundCardProps {
  title: string;
  shortcut?: string;
  isRecording?: boolean;
  onClick: () => void;
  onDelete: () => void;
  onEditShortcut: () => void;
}

export function SoundCard({
  title,
  shortcut,
  isRecording,
  onClick,
  onDelete,
  onEditShortcut,
}: SoundCardProps) {
  return (
    <div
      className={`
        group relative flex flex-col justify-between aspect-square bg-card rounded-xl p-4 border transition-all duration-300 hover:-translate-y-1
        ${
          isRecording
            ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse" // Visual de GRAVANDO
            : "border-white/5 hover:border-primary/50 hover:shadow-[0_0_30px_-10px_rgba(0,255,136,0.15)]"
        }
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-xl pointer-events-none" />

      <div className="z-10 flex justify-between items-start">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEditShortcut();
          }}
          className={`
            flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-1 rounded border transition-all min-w-[20px] justify-center
            ${
              isRecording
                ? "bg-red-500 text-white border-red-500 scale-110"
                : shortcut
                  ? "bg-black/60 text-primary border-primary/20 hover:bg-primary hover:text-black cursor-pointer"
                  : "bg-white/5 text-gray-500 border-transparent hover:bg-white/10 hover:text-white"
            }
          `}
          title={
            isRecording
              ? "Pressione uma tecla..."
              : "Clique para definir atalho"
          }
        >
          {isRecording ? "..." : shortcut ? shortcut : <Keyboard size={12} />}
        </button>

        {!isRecording && onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-white/20 hover:text-red-500 transition-colors p-1 hover:bg-white/5 rounded"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <div className="z-10 flex justify-center">
        <button
          onClick={onClick}
          className={`
            w-14 h-14 flex items-center justify-center rounded-full transition-transform active:scale-90 hover:scale-110
            ${isRecording ? "bg-red-500 text-white shadow-[0_0_15px_red]" : "bg-primary text-black shadow-[0_0_15px_var(--primary)]"}
          `}
        >
          <Play size={28} fill="currentColor" className="ml-1" />
        </button>
      </div>

      <div className="z-10 text-center">
        <h3 className="font-bold text-sm text-white truncate w-full">
          {isRecording ? "Pressione a tecla..." : title}
        </h3>
      </div>
    </div>
  );
}
