import { useState } from "react";
import { Header, type TabType } from "./components/layout/Header";
import { SoundBoard } from "./components/layout/SoundBoard";

function App() {
  const [activeTab, setActiveTab] = useState<TabType>("board");

  return (
    <div className="min-h-screen font-sans text-white bg-background selection:bg-primary selection:text-black">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="mx-auto max-w-7xl p-6 animate-in fade-in duration-500">
        {activeTab === "board" ? (
          <SoundBoard />
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
