import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TicketCheck } from "lucide-react";

export function TotalInscricoesCard() {
    return (
        <Card>
            <CardHeader className="flex-row items-center space-y-0 justify-between pb-2">
                <CardTitle className="text-base font-semibold">Total de Inscrições</CardTitle>
                <TicketCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
                <span className="text-2xl font-bold tracking-tight"> 312</span>
                <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-500 dark:text-emerald-400">+2 %</span> em relação ao mês passado.
                </p>
            </CardContent>
        </Card>
    );
}