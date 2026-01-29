import { useState } from "react";
import { Header, TabType } from "./components/layout/Header";

function App() {
  const [activeTab, setActiveTab] = useState<TabType>("board");

  return (
    <div className="min-h-screen font-sans text-white bg-background selection:bg-primary selection:text-black">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="mx-auto max-w-7xl p-6 animate-in fade-in duration-500">
        {activeTab === "board" && (
          <section className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-xl border-white/10">
            <h2 className="text-2xl font-bold text-gray-500">
              Soundboard Area
            </h2>
            <p className="text-gray-600">Grid de sons aparecerá aqui.</p>
          </section>
        )}

        {activeTab === "settings" && (
          <section className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-xl border-white/10">
            <h2 className="text-2xl font-bold text-gray-500">Config Area</h2>
            <p className="text-gray-600">
              Opções de áudio e tema aparecerão aqui.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
