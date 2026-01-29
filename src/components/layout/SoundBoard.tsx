import { useRef } from "react";
import { Plus } from "lucide-react";
import { SoundCard } from "../ui/SoundCard";
import type { Sound } from "../../types";

interface SoundBoardProps {
  sounds: Sound[];
  onPlay: (url: string) => void;
  onDelete: (id: string) => void;
  onAddSound: (file: File) => void;
}

export function SoundBoard({
  sounds,
  onPlay,
  onDelete,
  onAddSound,
}: SoundBoardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onAddSound(file); 
      event.target.value = ""; 
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {/* Input Invisível */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="audio/*"
        className="hidden"
      />

      {/* Botão Adicionar */}
      <button
        onClick={() => fileInputRef.current?.click()}
        className="group flex flex-col items-center justify-center aspect-square border-2 border-dashed border-white/10 rounded-xl text-gray-500 hover:border-primary hover:text-primary hover:bg-white/[0.02] transition-all"
      >
        <Plus
          size={40}
          className="mb-2 transition-transform duration-300 group-hover:scale-110"
        />
        <span className="text-sm font-medium">Adicionar</span>
      </button>

      {/* Lista de Sons */}
      {sounds.map((sound) => (
        <SoundCard
          key={sound.id}
          title={sound.title}
          shortcut={sound.shortcut}
          onClick={() => onPlay(sound.fileUrl)}
          onDelete={() => onDelete(sound.id)}
          onEditShortcut={() => alert("Em breve!")}
        />
      ))}
    </div>
  );
}
