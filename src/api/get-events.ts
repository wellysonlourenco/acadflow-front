import { api } from "@/lib/api";

export interface EventsResponse {
    events: Event[];
    pageIndex: number;
    perPage: number;
    totalPages: number;
    totalCount: number;
}

export interface Event {
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

export async function getEvents({ }: EventsResponse) {
    const response = await api.get<Event>('/events')
    return response.data

}