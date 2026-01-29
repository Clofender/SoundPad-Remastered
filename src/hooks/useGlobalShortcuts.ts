import { useEffect } from "react";
import { register, unregisterAll } from "@tauri-apps/plugin-global-shortcut";
import type { Sound } from "../types";

export function useGlobalShortcuts(
  sounds: Sound[],
  playSound: (url: string) => void,
) {
  useEffect(() => {
    const setupShortcuts = async () => {
      try {
        await unregisterAll();
      } catch {
        void 0;
      }

      for (const sound of sounds) {
        if (sound.shortcut) {
          try {
            const shortcutKey = sound.shortcut
              .replace("Key", "")
              .replace("Digit", "")
              .replace("ArrowUp", "Up")
              .replace("ArrowDown", "Down")
              .replace("ArrowLeft", "Left")
              .replace("ArrowRight", "Right");

            await register(shortcutKey, (event) => {
              if (event.state === "Pressed") {
                playSound(sound.fileUrl);
              }
            });
          } catch (error) {
            console.error(
              `Erro ao registrar atalho [${sound.shortcut}]:`,
              error,
            );
          }
        }
      }
    };

    setupShortcuts();

    return () => {
      unregisterAll().catch(() => {});
    };
  }, [sounds, playSound]);
}
