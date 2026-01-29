import { useState, useRef } from "react";
import { Plus, Search, X } from "lucide-react";
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

  const [searchTerm, setSearchTerm] = useState("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onAddSound(file);
      event.target.value = "";
    }
  };

  const filteredSounds = sounds.filter((sound) =>
    sound.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {" "}
      <div className="flex items-center gap-4 bg-card/50 p-2 rounded-xl border border-white/5 backdrop-blur-sm sticky top-20 z-40 shadow-lg">
        <div className="relative flex-1 group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Buscar som..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-lg py-2 pl-10 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="text-xs text-gray-500 font-mono px-2 hidden sm:block">
          {filteredSounds.length} sons
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="audio/*"
          className="hidden"
        />

        {!searchTerm && (
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
        )}

        {filteredSounds.map((sound) => (
          <div key={sound.id} id={`sound-btn-${sound.id}`}>
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

        {filteredSounds.length === 0 && searchTerm && (
          <div className="col-span-full text-center py-10 text-gray-500">
            <p>Nenhum som encontrado para "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm("")}
              className="text-primary text-sm hover:underline mt-2"
            >
              Limpar busca
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
