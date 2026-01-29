import { Play, Trash2 } from "lucide-react";

interface SoundCardProps {
  title: string;
  shortcut?: string;
  onClick: () => void;
  onDelete?: () => void;
}

export function SoundCard({
  title,
  shortcut,
  onClick,
  onDelete,
}: SoundCardProps) {
  return (
    <div className="group relative flex flex-col justify-between aspect-square bg-card rounded-xl p-4 border border-white/5 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_-10px_rgba(0,255,136,0.15)] hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-xl" />

      {/* Topo: Atalho e Delete */}
      <div className="z-10 flex justify-between items-start">
        {shortcut ? (
          <span className="text-[10px] font-mono font-bold bg-black/60 text-primary border border-primary/20 px-1.5 py-0.5 rounded">
            {shortcut}
          </span>
        ) : (
          <div />
        )}

        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-white/20 hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Centro: Botão Play */}
      <div className="z-10 flex justify-center">
        <button
          onClick={onClick}
          className="w-14 h-14 flex items-center justify-center bg-primary text-black rounded-full shadow-[0_0_15px_var(--primary)] transition-transform active:scale-90 group-hover:scale-110"
        >
          <Play size={28} fill="currentColor" className="ml-1" />
        </button>
      </div>

      {/* Base: Título */}
      <div className="z-10 text-center">
        <h3
          className="font-bold text-sm text-white truncate w-full"
          title={title}
        >
          {title}
        </h3>
      </div>
    </div>
  );
}
