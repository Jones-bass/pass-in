import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from "lucide-react";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { IconButton } from "./icon-button";
import { useState } from "react";

export function AttendeeList() {
  const [page, setPage] = useState<number>(1);

  function goToNextPage() {
    setPage(page + 1);
  }

  function goToPreviousPage() {
    setPage(page - 1);
  }

  function goToFirstPage() {
    setPage(1);
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold ">Participantes</h1>
          <div className="w-72 flex items-center gap-3 px-3 py-1.5 border border-white/10 rounded-lg" >
            <Search className="size-4 text-emerald-300" />
            <input className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm" placeholder="Buscar participante..." />
          </div>
        </div>

        <Table>
          <thead>
            <tr className="border-b border-white/10">
              <TableHeader style={{ width: 48 }}>
                <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10 checked:bg-orange-400" />
              </TableHeader>
              <TableHeader>Código</TableHeader>
              <TableHeader>Participantes</TableHeader>
              <TableHeader>Data de inscrição</TableHeader>
              <TableHeader>Data de check-in</TableHeader>
              <TableHeader style={{ width: 64 }}></TableHeader>
            </tr>
          </thead>
          <tbody>
            <TableRow >
              <TableCell>
                <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10 checked:bg-orange-400" />
              </TableCell>
              <TableCell>Id</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">Jones</span>
                  <span>jones bass.tb@gmail.com</span>
                </div>
              </TableCell>
              <TableCell>há 15 dias</TableCell>
              <TableCell>há 5 dias</TableCell>
              <TableCell>
              </TableCell>
            </TableRow>

          </tbody>
          <tfoot>
            <TableRow>
              <TableCell colSpan={3}>
                Mostrando 20 de 200 items
              </TableCell>
              <TableCell className="text-right" colSpan={3}>
                <div className="inline-flex gap-8 items-center">
                  <span>Página 1 de 20</span>
                  <div className="flex gap-1.5">
                    <IconButton onClick={goToFirstPage} disabled={page === 1}>
                      <ChevronsLeft className="size-4" />
                    </IconButton>
                    <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                      <ChevronLeft className="size-4" />
                    </IconButton>
                    <IconButton onClick={goToNextPage}>
                      <ChevronRight className="size-4" />
                    </IconButton>
                    <IconButton>
                      <ChevronsRight className="size-4" />
                    </IconButton>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </tfoot>
        </Table>
      </div>
    </>
  )
}