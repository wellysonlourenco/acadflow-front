import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export function EventInscricao() {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Confirmar inscrição?</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
                <div className="items-center">
                    <img src="\logo.svg" alt="" className="w-[100px]" />
                </div>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="text-muted-foreground">Status</TableCell>
                            <TableCell className="flex justify-end">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-green-400" />
                                    <span className="font-medium text-muted-foreground">Inscrição Aberta</span>
                                </div>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Nome</TableCell>
                            <TableCell className="flex justify-end">ReactJS </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Carga Horaria</TableCell>
                            <TableCell className="flex justify-end">15 horas</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Local</TableCell>
                            <TableCell className="flex justify-end">IFMS</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Data:</TableCell>
                            <TableCell className="flex justify-end">15/05/2024</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Horário Inicio:</TableCell>
                            <TableCell className="flex justify-end">19:00</TableCell>
                        </TableRow>
                        <Separator />
                    </TableBody>
                </Table>
                <Button className="w-full">Fazer Inscrição</Button>

                
            </div>
        </DialogContent>
    )
}