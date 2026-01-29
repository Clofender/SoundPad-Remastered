import { Monitor, Volume2, RefreshCw, CheckCircle2 } from "lucide-react";
import type { ThemeColor, AudioDevice } from "../../types";

interface SettingsTabProps {
  currentTheme: ThemeColor;
  onThemeChange: (color: ThemeColor) => void;
  colors: ThemeColor[];
  
  audioDevices: AudioDevice[];
  currentAudioDeviceId: string;
  onAudioDeviceChange: (id: string) => void;
  onRefreshDevices: () => void;
}

export function SettingsTab({
  currentTheme,
  onThemeChange,
  colors,
  audioDevices,
  currentAudioDeviceId,
  onAudioDeviceChange,
  onRefreshDevices,
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
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card border border-white/5 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Volume2 className="text-primary" />
            <h2 className="text-xl font-bold">Saída de Áudio</h2>
          </div>

          <button
            onClick={onRefreshDevices}
            className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors"
            title="Atualizar lista de dispositivos"
          >
            <RefreshCw size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">
              Dispositivo de Saída
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Escolha "CABLE Input" ou "VB-Audio" para que o som saia no seu
              microfone (se configurado).
            </p>

            <div className="relative">
              <select
                value={currentAudioDeviceId}
                onChange={(e) => onAudioDeviceChange(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white appearance-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer hover:bg-black/30 transition-colors"
              >
                <option value="">Padrão do Sistema</option>
                {audioDevices.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                ▼
              </div>
            </div>
          </div>

          {currentAudioDeviceId && (
            <div className="flex items-center gap-2 text-primary text-xs bg-primary/10 p-3 rounded-lg border border-primary/20">
              <CheckCircle2 size={14} />
              <span>Saída configurada. Os sons tocarão neste dispositivo.</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
