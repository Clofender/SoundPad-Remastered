import { useRef } from "react";
import { Plus } from "lucide-react";
import { SoundCard } from "../ui/SoundCard";
import type { Sound } from "../../types";

interface SoundBoardProps {
  sounds: Sound[];
  recordingId: string | null;
  onPlay: (url: string) => void;
  onDelete: (id: string) => void;
  onAddSound: (file: File) => void;
  onRecordShortcut: (id: string) => void;
}

export function SoundBoard({
  sounds,
  recordingId,
  onPlay,
  onDelete,
  onAddSound,
  onRecordShortcut,
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
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="audio/*"
        className="hidden"
      />

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

      {sounds.map((sound) => (
        <div key={sound.id} id={`sound-btn-${sound.id}`}>
          {" "}
          <SoundCard
            title={sound.title}
            shortcut={sound.shortcut}
            isRecording={recordingId === sound.id}
            onClick={() => onPlay(sound.fileUrl)}
            onDelete={() => onDelete(sound.id)}
            onEditShortcut={() => onRecordShortcut(sound.id)}
          />
        </div>
      ))}
    </div>
  );
}
