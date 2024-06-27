import { EventsResponse } from "@/api/get-events";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { CalendarCheck } from "lucide-react";

export function MonthEventsAmountCard() {

    const { data: eventsResponse, isLoading, error } = useQuery<EventsResponse>({
        queryKey: ['eventos'],
        queryFn: async () => {
            const response = await api.get(`/events`);
            return response.data;
        },
        placeholderData: keepPreviousData,
    })



    console.log(eventsResponse?.totalCount)

    return (
        <Card>
            <CardHeader className="flex-row items-center space-y-0 justify-between pb-2">
                <CardTitle className="text-base font-semibold">Eventos Abertos</CardTitle>
                <CalendarCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
                <span className="text-2xl font-bold tracking-tight">{eventsResponse?.totalCount}</span>
                <p className="text-xs text-muted-foreground">
                    <span className="text-emerald-500 dark:text-emerald-400">+2 %</span> em relação ao mês passado.
                </p>
            </CardContent>
        </Card>
    );
}