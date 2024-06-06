import { EventsResponse } from "@/api/get-events";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { EventTableFilters } from "./event-table-filters";
import { EventTableRow } from "./event-table-row";

export function Events() {
    const [searchParams, setSearchParams] = useSearchParams()


    const { data: eventsResponse, isLoading, error } = useQuery<EventsResponse>({
        queryKey: ['get-eventos'],
        queryFn: async () => {
            const response = await api.get(`/events`);
            return response.data;
        }
    })


    return (
        <>
            <Helmet title="Eventos" />
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Eventos</h1>
                <div className="space-y-2.5">

                    <Button variant="outline">
                        Criar Evento
                    </Button>

                    <EventTableFilters />

                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[64px]"></TableHead>
                                    <TableHead className="w-[140px]">ID</TableHead>
                                    <TableHead>Evento</TableHead>
                                    <TableHead className="w-[180px]">Carga Horaria</TableHead>
                                    <TableHead className="w-[140px]">Status</TableHead>
                                    <TableHead className="w-[140px]">Total de Vagas</TableHead>
                                    <TableHead className="w-[164px]"></TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {eventsResponse && eventsResponse.events.map((events) => {
                                    return <EventTableRow key={events.id} events={events} />
                                })}
                            </TableBody>
                        </Table>
                    </div>

                    <Pagination pageIndex={0} totalCount={105} perPage={10} />
                </div>
            </div>
        </>
    )
}