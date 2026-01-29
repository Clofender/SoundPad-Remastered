import { openDB } from "idb";
import type { Sound } from "../types";

const DB_NAME = "soundpad-db";
const STORE_NAME = "sounds";

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

export const saveSoundToDB = async (sound: Sound, file: File) => {
  const db = await initDB();
  await db.put(STORE_NAME, { ...sound, fileBlob: file });
};

export const getAllSounds = async (): Promise<Sound[]> => {
  const db = await initDB();
  const storedItems = await db.getAll(STORE_NAME);

  return storedItems.map((item) => ({
    id: item.id,
    title: item.title,
    fileUrl: URL.createObjectURL(item.fileBlob),
    shortcut: item.shortcut,
    volume: item.volume,
  }));
};

export const deleteSoundFromDB = async (id: string) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};
