import { EventsResponse } from "@/api/get-events";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";
import { EventTableFilters } from "./event-table-filters";
import { EventTableRow } from "./event-table-row";

export function Events() {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams()

    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
    const pageSize = searchParams.get('pageSize') ? Number(searchParams.get('pageSize')) : 10


    const { data: eventsResponse, isLoading, error } = useQuery<EventsResponse>({
        queryKey: ['get-eventos, page, pageSize'],
        queryFn: async () => {
            const response = await api.get(`/events?page=${page}&pageSize=${pageSize}`);
            return response.data;
        },
        placeholderData: keepPreviousData,

    })


    return (
        <>
            <Helmet title="Eventos" />
            <div className="flex flex-col gap-4 m-auto w-[1280px] items-center">
                <h1 className="text-3xl font-bold tracking-tight">Eventos</h1>
                <div className="space-y-2.5">

                    <Dialog>
                        <DialogTrigger asChild>
                        <Button variant="outline">
                            Criar Evento
                        </Button>
                        </DialogTrigger>

                        <DialogPortal>
                            <DialogOverlay>
                                <DialogContent>
                                    <div className="flex flex-col gap-4">
                                        <h1 className="text-2xl font-semibold tracking-tight">Criar Evento</h1>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Nome</label>
                                                <input type="text" id="name" className="input" />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="qtdHours" className="text-sm font-medium text-muted-foreground">Carga Horaria</label>
                                                <input type="text" id="qtdHours" className="input" />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="qtdParticipants" className="text-sm font-medium text-muted-foreground">Total de Vagas</label>
                                                <input type="text" id="qtdParticipants" className="input" />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="status" className="text-sm font-medium text-muted-foreground">Status</label>
                                                <select name="status" id="status" className="input">
                                                    <option value="ACTIVE">Ativo</option>
                                                    <option value="INACTIVE">Inativo</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-4">
                                            <Button variant="outline">Cancelar</Button>
                                            <Button>Criar</Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </DialogOverlay>
                        </DialogPortal>
                    </Dialog>

                  

                    <EventTableFilters />

                    <div className="border rounded-md ">
                        <Table >
                            <TableHeader >
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

                    {eventsResponse && <Pagination pages={eventsResponse.pageIndex} total={eventsResponse.totalPages} page={page} />}
                </div>
            </div>
        </>
    )
}