export interface Sound {
  id: string;
  title: string;
  fileUrl: string;
  shortcut?: string;
  volume: number;
}

export type ThemeColor =
  | "#00ff88"
  | "#ff0055"
  | "#ffe600"
  | "#00ccff"
  | "#a855f7";
