import { useState, useEffect, useCallback } from "react";
import type { AudioDevice } from "../types";

interface HTMLAudioElementWithSinkId extends HTMLAudioElement {
  setSinkId: (deviceId: string) => Promise<void>;
  sinkId: string;
}

export function useAudio() {
  const [devices, setDevices] = useState<AudioDevice[]>([]);

  const [selectedOutputId, setSelectedOutputId] = useState<string>(() => {
    return localStorage.getItem("audio-output-device") || "";
  });

  const getDevices = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const outputs = allDevices
        .filter((d) => d.kind === "audiooutput")
        .map((d) => ({
          deviceId: d.deviceId,
          label: d.label || `Speaker (${d.deviceId.slice(0, 5)}...)`,
        }));
      setDevices(outputs);
    } catch (error) {
      console.error("Erro ao listar dispositivos:", error);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await getDevices();
    };
    init();
    const handleDeviceChange = () => {
      getDevices();
    };
    navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);
    return () => {
      navigator.mediaDevices.removeEventListener(
        "devicechange",
        handleDeviceChange,
      );
    };
  }, [getDevices]);

  const setAudioOutput = (deviceId: string) => {
    setSelectedOutputId(deviceId);
    localStorage.setItem("audio-output-device", deviceId);
  };

  const playSound = (url: string) => {
    const audioMain = new Audio(url) as HTMLAudioElementWithSinkId;

    if (selectedOutputId) {
      if (typeof audioMain.setSinkId === "function") {
        audioMain
          .setSinkId(selectedOutputId)
          .catch((err) => console.warn("Erro SinkID Main:", err));
      }
    }

    audioMain.volume = 1;
    audioMain.play().catch((e) => console.error("Erro Play Main:", e));

    if (selectedOutputId) {
      const audioMonitor = new Audio(url);
      audioMonitor.volume = 1;
      audioMonitor.play().catch((e) => console.error("Erro Play Monitor:", e));
    }
  };

  return {
    playSound,
    devices,
    selectedOutputId,
    setAudioOutput,
    refreshDevices: getDevices,
  };
}
