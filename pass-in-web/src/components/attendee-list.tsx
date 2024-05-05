import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from "lucide-react";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { IconButton } from "./icon-button";
import { ChangeEvent, useEffect, useState } from "react";

import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br'

import { api } from "../services/api";

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

interface Attendee {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  checkIn: {
    createdAt: string;
  } | null;
}

interface PropsEvent {
  attendees: Attendee[];
}

export function AttendeeList({ attendees }: PropsEvent) {
  const [inputValue, setInputValue] = useState<Attendee[]>(attendees);
  const [page, setPage] = useState<number>(1);
  const [totalParticipants, setTotalParticipants] = useState<number>(0);

  useEffect(() => {
    api.get(`/event/9e9bd979-9d10-4915-b339-3786b1634f33/attendees`)
      .then(response => {
        const fetchedAttendees = response.data.attendees;
        setInputValue(fetchedAttendees);
        setTotalParticipants(response.data.total);
        console.log(fetchedAttendees);
      })
  }, []);

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredAttendees = attendees.filter(attendee =>
      attendee.name.toLowerCase().includes(searchTerm) ||
      attendee.email.toLowerCase().includes(searchTerm)
    );
    setInputValue(filteredAttendees);
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

  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalParticipants / itemsPerPage);

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
            {inputValue && inputValue.slice((page - 1) * 10, page * 10).map((attendee) => {
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
                  <TableCell>{dayjs().to(attendee.checkIn?.createdAt)}</TableCell>
                  <TableCell>
                  </TableCell>
                </TableRow>
              )
            })}
          </tbody>
          <tfoot>
            <TableRow>
              <TableCell colSpan={3}>
                Mostrando 10 de {totalParticipants} items
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