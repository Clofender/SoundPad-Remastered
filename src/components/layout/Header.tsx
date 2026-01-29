import { Grid, Settings, LucideIcon } from "lucide-react";

export type TabType = "board" | "settings";

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TABS: { id: TabType; label: string; icon: LucideIcon }[] = [
  { id: "board", label: "Soundboard", icon: Grid },
  { id: "settings", label: "Configurações", icon: Settings },
];

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-card/80 backdrop-blur-md">
      <div className="flex items-center gap-3 select-none">
        <div className="h-8 w-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
        <h1 className="text-xl font-bold tracking-tight text-white">
          SOUND
          <span className="text-primary drop-shadow-[0_0_8px_rgba(0,255,136,0.4)]">
            PAD
          </span>
          <span className="ml-2 text-xs font-medium text-gray-500 uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded">
            Remastered
          </span>
        </h1>
      </div>

      <nav className="flex gap-1 p-1 rounded-lg bg-black/40 border border-white/5">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out ${
                activeTab === tab.id
                  ? "bg-primary text-black shadow-[0_0_20px_-5px_var(--primary)] scale-105 font-bold"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={18} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
