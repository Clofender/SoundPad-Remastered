import { Plus } from "lucide-react";
import { SoundCard } from "../ui/SoundCard";

const MOCK_SOUNDS = [
  { id: "1", title: "Risada do Chaves", shortcut: "NUM_1" },
  { id: "2", title: "Sad Trombone", shortcut: "NUM_2" },
  { id: "3", title: "Discord Join", shortcut: "F5" },
  { id: "4", title: "Bruh Effect", shortcut: undefined },
];

export function SoundBoard() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      <button className="group flex flex-col items-center justify-center aspect-square border-2 border-dashed border-white/10 rounded-xl text-gray-500 hover:border-primary hover:text-primary hover:bg-white/[0.02] transition-all">
        <Plus
          size={40}
          className="mb-2 transition-transform duration-300 group-hover:scale-110"
        />
        <span className="text-sm font-medium">Adicionar</span>
      </button>

      {/* Lista de Sons */}
      {MOCK_SOUNDS.map((sound) => (
        <SoundCard
          key={sound.id}
          title={sound.title}
          shortcut={sound.shortcut}
          onClick={() => console.log(`Tocando: ${sound.title}`)}
          onDelete={() => console.log(`Deletar: ${sound.id}`)}
        />
      ))}
    </div>
  );
}
