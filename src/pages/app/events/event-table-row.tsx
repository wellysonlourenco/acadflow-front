import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search } from "lucide-react";
import { EventDatails } from "./event-details";

//export interface EventTableRowProps { }

export function EventTableRow() {
    return (
        <TableRow>
            <TableCell>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="xs">
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Detalhes do Evento</span>
                        </Button>
                    </DialogTrigger>

                    <EventDatails />
                </Dialog>
            </TableCell>
            <TableCell className="font-mono text-xs font-medium">123654</TableCell>
            <TableCell className="font-medium">Java Web</TableCell>
            <TableCell className="text-muted-foreground">2 horas</TableCell>
            <TableCell className="">
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    <span className="font-medium text-muted-foreground">Inscrições abertas</span>
                </div>
            </TableCell>
            <TableCell className="font-medium">100 vagas</TableCell>
            <TableCell>
                <Button variant="outline" size="xs" className="">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="xs">
                        <ArrowRight className="h-3 w-3 mr-2" />
                            Fazer Inscrição
                        </Button>
                    </DialogTrigger>

                    <EventDatails />
                </Dialog>

                </Button>
            </TableCell>

        </TableRow>
    )
}