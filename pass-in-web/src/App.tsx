import { Header } from "./components/header";
import { Search } from "lucide-react";

export function App() {

  return (
  <>
    <div className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
      <Header />
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold ">Participantes</h1>
          <div className="w-72 flex items-center gap-3 px-3 py-1.5 border border-white/10 rounded-lg" >
            <Search className="size-4 text-emerald-300" />
            <input className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm" placeholder="Buscar participante..." />
          </div>
        </div>
      </div>
    </div>
    </>
 
  )
}

