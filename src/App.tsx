import { useState, useEffect } from "react";
import { Header, type TabType } from "./components/layout/Header";
import { SoundBoard } from "./components/layout/SoundBoard";
import { SettingsTab } from "./components/layout/SettingsTab";
import { useAudio } from "./hooks/useAudio";
import { useTheme } from "./hooks/useTheme";
import { useGlobalShortcuts } from "./hooks/useGlobalShortcuts.ts";
import {
  saveSoundToDB,
  getAllSounds,
  deleteSoundFromDB,
  updateSoundShortcut,
} from "./utils/db";
import type { Sound } from "./types";

function App() {
  const [activeTab, setActiveTab] = useState<TabType>("board");
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [recordingId, setRecordingId] = useState<string | null>(null);

  const {
    playSound,
    devices,
    selectedOutputId,
    setAudioOutput,
    refreshDevices,
  } = useAudio();

  const { theme, setTheme, colors } = useTheme();

  useEffect(() => {
    getAllSounds().then(setSounds);
  }, []);

  useGlobalShortcuts(sounds, playSound);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      if (recordingId) {
        e.preventDefault();
        const rawCode = e.code;

        setSounds((prev) =>
          prev.map((s) =>
            s.id === recordingId ? { ...s, shortcut: rawCode } : s,
          ),
        );
        updateSoundShortcut(recordingId, rawCode);
        setRecordingId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [recordingId]);

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
            recordingId={recordingId}
            onPlay={playSound}
            onDelete={handleDelete}
            onAddSound={handleAddSound}
            onRecordShortcut={setRecordingId}
          />
        ) : (
          <SettingsTab
            currentTheme={theme}
            onThemeChange={setTheme}
            colors={colors}
            audioDevices={devices}
            currentAudioDeviceId={selectedOutputId}
            onAudioDeviceChange={setAudioOutput}
            onRefreshDevices={refreshDevices}
          />
        )}
      </main>
    </div>
  );
}

export default App;
