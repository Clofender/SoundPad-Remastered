import { Play, Trash2, Keyboard } from "lucide-react";

interface SoundCardProps {
  title: string;
  shortcut?: string;
  onClick: () => void;
  onDelete?: () => void;
  onEditShortcut?: () => void;
}

export function SoundCard({
  title,
  shortcut,
  onClick,
  onDelete,
  onEditShortcut,
}: SoundCardProps) {
  return (
    <div className="group relative flex flex-col justify-between aspect-square bg-card rounded-xl p-4 border border-white/5 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_-10px_rgba(0,255,136,0.15)] hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-xl pointer-events-none" />

      {/* Atalho e Delete */}
      <div className="z-10 flex justify-between items-start">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onEditShortcut) onEditShortcut();
          }}
          className={`
            flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-1 rounded border transition-all
            ${
              shortcut
                ? "bg-black/60 text-primary border-primary/20 hover:bg-primary hover:text-black cursor-pointer"
                : "bg-white/5 text-gray-500 border-transparent hover:bg-white/10 hover:text-white"
            }
          `}
          title="Clique para alterar o atalho"
        >
          {shortcut ? shortcut : <Keyboard size={12} />}
        </button>

        {/* Botão Deletar */}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-white/20 hover:text-red-500 transition-colors p-1 hover:bg-white/5 rounded"
            title="Remover som"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Botão Play */}
      <div className="z-10 flex justify-center">
        <button
          onClick={onClick}
          className="w-14 h-14 flex items-center justify-center bg-primary text-black rounded-full shadow-[0_0_15px_var(--primary)] transition-transform active:scale-90 hover:scale-110 hover:shadow-[0_0_25px_var(--primary)]"
        >
          <Play size={28} fill="currentColor" className="ml-1" />
        </button>
      </div>

      {/* BASE: Título */}
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
