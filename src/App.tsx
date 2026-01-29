import { useState, useEffect } from "react";
import { Header, type TabType } from "./components/layout/Header";
import { SoundBoard } from "./components/layout/SoundBoard";
import { SettingsTab } from "./components/layout/SettingsTab";
import { useAudio } from "./hooks/useAudio";
import { useTheme } from "./hooks/useTheme";
import { saveSoundToDB, getAllSounds, deleteSoundFromDB } from "./utils/db";
import type { Sound } from "./types";

function App() {
  const [activeTab, setActiveTab] = useState<TabType>("board");
  const [sounds, setSounds] = useState<Sound[]>([]);

  const { playSound } = useAudio();
  const { theme, setTheme, colors } = useTheme();

  useEffect(() => {
    getAllSounds().then(setSounds);
  }, []);

  const handleAddSound = async (file: File) => {
    const newSound: Sound = {
      id: crypto.randomUUID(),
      title: file.name.replace(/\.[^/.]+$/, ""),
      fileUrl: URL.createObjectURL(file),
      volume: 1,
    };

    setSounds((prev) => [...prev, newSound]);
    await saveSoundToDB(newSound, file);
  };

  const handleDelete = async (id: string) => {
    setSounds((prev) => prev.filter((sound) => sound.id !== id));
    await deleteSoundFromDB(id);
  };

  return (
    <div className="min-h-screen font-sans text-white bg-background selection:bg-primary selection:text-black">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="mx-auto max-w-7xl p-6 animate-in fade-in duration-500">
        {activeTab === "board" ? (
          <SoundBoard
            sounds={sounds}
            onPlay={playSound}
            onDelete={handleDelete}
            onAddSound={handleAddSound}
          />
        ) : (
          <SettingsTab
            currentTheme={theme}
            onThemeChange={setTheme}
            colors={colors}
          />
        )}
      </main>
    </div>
  );
}

export default App;
