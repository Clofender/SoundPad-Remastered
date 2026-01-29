import { useState, useRef } from "react";
import { Header, type TabType } from "./components/layout/Header";
import { SoundCard } from "./components/ui/SoundCard";
import { useAudio } from "./hooks/useAudio";
import { Plus } from "lucide-react";
import type { Sound } from "./types";

function App() {
  const [activeTab, setActiveTab] = useState<TabType>("board");
  const [sounds, setSounds] = useState<Sound[]>([]);
  const { playSound } = useAudio();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const newSound: Sound = {
      id: crypto.randomUUID(),
      title: file.name.replace(/\.[^/.]+$/, ""),
      fileUrl: URL.createObjectURL(file),
      volume: 1,
    };

    setSounds((prev) => [...prev, newSound]);

    event.target.value = "";
  };

  const handleDelete = (id: string) => {
    setSounds((prev) => prev.filter((sound) => sound.id !== id));
  };

  return (
    <div className="min-h-screen font-sans text-white bg-background selection:bg-primary selection:text-black">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="mx-auto max-w-7xl p-6 animate-in fade-in duration-500">
        {activeTab === "board" ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="audio/*"
              className="hidden"
            />

            {/* BOTÃO ADICIONAR */}
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

            {/* LISTA DE SONS REAIS */}
            {sounds.map((sound) => (
              <SoundCard
                key={sound.id}
                title={sound.title}
                shortcut={sound.shortcut}
                onClick={() => playSound(sound.fileUrl)}
                onDelete={() => handleDelete(sound.id)}
                onEditShortcut={() =>
                  alert(`Em breve: editar atalho para ${sound.title}`)
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            Configurações em breve...
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
