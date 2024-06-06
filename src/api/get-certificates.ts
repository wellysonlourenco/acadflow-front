import { api } from "@/lib/api";

export interface CertificateResponse {
    certificates: CertificateResponse[];
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

export async function certificates(page: number) {
    await api.get('/certificates')
}