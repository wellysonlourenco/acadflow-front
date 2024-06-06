export interface ParticipationResponse {
    participations: Participation[];
    pageIndex: number;
    perPage: number;
    totalPages: number;
}

export interface Participation {
    id: string;
    StatusCertificate: string;
    inscricao: string;
    userId: string;
    eventId: string;
    createdAt: string;
    updatedAt: string;
}