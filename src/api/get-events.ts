export interface EventsResponse {
    events: Event[];
    pageIndex: number;
    perPage: number;
    totalPages: number;
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