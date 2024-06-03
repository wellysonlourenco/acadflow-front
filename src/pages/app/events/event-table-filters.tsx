import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";

export function EventTableFilters() {
    return (
        <form className="flex items-center gap-2">
            <span className="text-sm font-semibold">Filtros:</span>
            <Input placeholder="ID do Evento" className="h-8 w-auto" />
            <Input placeholder="Nome do Evento" className="h-8 w-[320px]" />
            <Select defaultValue="all">
                <SelectTrigger className="h-8 w-[180px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="pending">Inscrições Abertas</SelectItem>
                    <SelectItem value="processing">Inscrições encerradas</SelectItem>
                    <SelectItem value="canceled">Evento Cancelado</SelectItem>
                </SelectContent>
            </Select>

            <Button type="submit" variant="secondary" size="xs" className="">
                <Search className="h-4 w-4 mr-2" />
                Filtrar resultados
            </Button>
            <Button type="button" variant="outline" size="xs" className="">
                <X className="h-4 w-4 mr-2" />
                Remover Filtros
            </Button>
        </form>
    )
}