import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search } from "lucide-react";

//export interface EventTableRowProps { }
interface EventTableRowProps {
    events: {
        id: string;
        name: string;
        status: string;
        dtStart: string;
        dtEnd: string;
        qtdHours: number;
        qtdParticipants: number;
        createdAt: string;
        updatedAt: string;
        imagem: string;
    }
}




export function EventTableRow({ events }: EventTableRowProps) {
    return (
        <TableRow>
            <TableCell>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="xs">
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Detalhes do Evento {events.id}</span>
                        </Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Detalhes do Evento: {events.name}</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-6">
                            <div className="items-center">
                                <img src="\logo.svg" alt="" className="w-[100px]" />
                            </div>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="text-muted-foreground">
                                            {events.status === 'ACTIVE' ? 'Inscrições abertas' : 'Inscrições encerradas'}
                                        </TableCell>
                                        <TableCell className="flex justify-end">
                                            <div className="flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full bg-green-400" />
                                                <span className="font-medium text-muted-foreground">Inscrição Aberta</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="text-muted-foreground">Nome</TableCell>
                                        <TableCell className="flex justify-end">{events.name} </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="text-muted-foreground">Carga Horaria</TableCell>
                                        <TableCell className="flex justify-end">{events.qtdHours} horas</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="text-muted-foreground">Local</TableCell>
                                        <TableCell className="flex justify-end">IFMS</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="text-muted-foreground">Data Inicio:</TableCell>
                                        <TableCell className="flex justify-end">{new Date(events.dtStart).toLocaleDateString()}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="text-muted-foreground">Data Final:</TableCell>
                                        <TableCell className="flex justify-end">{new Date(events.dtEnd).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                    <Separator />
                                </TableBody>
                            </Table>
                            <Button className="w-full">Fazer Inscrição</Button>


                        </div>
                    </DialogContent>
                </Dialog>
            </TableCell>
            <TableCell className="font-mono text-xs font-medium">{events.id}</TableCell>
            <TableCell className="font-medium">{events.name}</TableCell>
            <TableCell className="text-muted-foreground">{events.qtdHours} horas</TableCell>
            <TableCell className="">
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    <span className="font-medium text-muted-foreground">
                        {events.status === 'ACTIVE' ? 'Inscrições abertas' : 'Inscrições encerradas'}
                    </span>
                </div>
            </TableCell>
            <TableCell className="font-medium">{events.qtdParticipants} vagas</TableCell>
            <TableCell>
                <Button variant="outline" size="xs" className="">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="xs">
                        <ArrowRight className="h-3 w-3 mr-2" />
                            Fazer Inscrição
                        </Button>
                    </DialogTrigger>

                </Dialog>

                </Button>
            </TableCell>

        </TableRow>
    )
}