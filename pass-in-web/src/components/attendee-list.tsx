import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from "lucide-react";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { IconButton } from "./icon-button";
import { ChangeEvent, useState } from "react";

import { attendes } from "../data/attenddes";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br'

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

export function AttendeeList() {
  const [inputValue, setInputValue] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const totalPages = Math.ceil(attendes.length / 10);

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function goToNextPage() {
    setPage(page + 1);
  }

  function goToPreviousPage() {
    setPage(page - 1);
  }

  function goToFirstPage() {
    setPage(1);
  }

  function goToLastPage() {
    setPage(totalPages);
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold ">Participantes</h1>
          <div className="w-72 flex items-center gap-3 px-3 py-1.5 border border-white/10 rounded-lg" >
            <Search className="size-4 text-emerald-300" />
            <input onChange={onSearchInputChanged} className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm" placeholder="Buscar participante..." />
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
          {attendes.slice((page - 1) * 10, page * 10).map((attendee) => {

return (
  <TableRow key={attendee.id}>

              <TableCell>
                <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10 checked:bg-orange-400" />
              </TableCell>
              <TableCell>{attendee.id}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">{attendee.name}</span>
                  <span>{attendee.email}</span>
                </div>
              </TableCell>
              <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                  <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
              <TableCell>
              </TableCell>
            </TableRow>
)
})}
          </tbody>
          <tfoot>
            <TableRow>
              <TableCell colSpan={3}>
              Mostrando 10 de {attendes.length} items
              </TableCell>
              <TableCell className="text-right" colSpan={3}>
                <div className="inline-flex gap-8 items-center">
                <span>Página {page} de {totalPages}</span>
                  <div className="flex gap-1.5">
                    <IconButton onClick={goToFirstPage} disabled={page === 1}>
                      <ChevronsLeft className="size-4" />
                    </IconButton>
                    <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                      <ChevronLeft className="size-4" />
                    </IconButton>
                    <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                      <ChevronRight className="size-4" />
                    </IconButton>
                    <IconButton onClick={goToLastPage} disabled={page === totalPages}>
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