export interface CertificateResponse {
    certificates: Certificate[];
    pageIndex: number;
    perPage: number;
    totalPages: number;
}

export interface Certificate {
    id: number;
    key: string;
    createdAt: string;
    participationId?: any;
    url?: any;
    Participations?: any;
}