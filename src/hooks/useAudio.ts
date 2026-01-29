import { useState, useEffect } from "react";

export interface AudioDevice {
  deviceId: string;
  label: string;
}

export function useAudio() {
  const [selectedOutputId, setSelectedOutputId] = useState<string>("");

  useEffect(() => {
    async function initAudio() {
      try {
        // Pede permissão para ver os nomes dos dispositivos
        await navigator.mediaDevices.getUserMedia({ audio: true });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const outputs = devices.filter((d) => d.kind === "audiooutput");
        const cable = outputs.find((d) =>
          d.label.toLowerCase().includes("cable"),
        );
        if (cable) setSelectedOutputId(cable.deviceId);
      } catch (e) {
        console.error("Erro ao iniciar áudio:", e);
      }
    }
    initAudio();
  }, []);

  const playSound = (url: string) => {
    const audio = new Audio(url);

    if (audio.setSinkId && selectedOutputId) {
      audio.setSinkId(selectedOutputId).catch((e) => console.warn(e));
    }

    audio.volume = 1;
    audio.play().catch((e) => console.error("Erro ao tocar:", e));
  };

  return { playSound };
}
