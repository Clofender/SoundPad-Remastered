import { Monitor, Volume2 } from "lucide-react";
import type { ThemeColor } from "../../types";

interface SettingsTabProps {
  currentTheme: ThemeColor;
  onThemeChange: (color: ThemeColor) => void;
  colors: ThemeColor[];
}

export function SettingsTab({
  currentTheme,
  onThemeChange,
  colors,
}: SettingsTabProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <section className="bg-card border border-white/5 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Monitor className="text-primary" />
          <h2 className="text-xl font-bold">Aparência</h2>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-400">Cor de destaque (Neon)</p>

          <div className="flex flex-wrap gap-4">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => onThemeChange(color)}
                className={`
                  w-12 h-12 rounded-full transition-all duration-300 relative
                  hover:scale-110 active:scale-95
                  ${currentTheme === color ? "ring-2 ring-white ring-offset-2 ring-offset-[#1a1a1a] scale-110 shadow-[0_0_20px_var(--primary)]" : "opacity-70 hover:opacity-100"}
                `}
                style={{ backgroundColor: color }}
                title={color}
              >
                {currentTheme === color && (
                  <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card border border-white/5 rounded-xl p-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 cursor-not-allowed">
        <div className="flex items-center gap-3 mb-6">
          <Volume2 className="text-primary" />
          <h2 className="text-xl font-bold">Dispositivos de Áudio</h2>
        </div>
        <p className="text-gray-500 text-sm">
          Configuração de microfone e saída de áudio (VB-Cable) em breve.
        </p>
      </section>
    </div>
  );
}
