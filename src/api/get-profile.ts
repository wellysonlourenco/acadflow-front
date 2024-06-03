import { api } from "@/lib/api";
import { jwtDecode } from "jwt-decode";
export interface GetProfileResponse {
  id?: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  createdAt: Date | null;
  updatedAt: Date | null;
  avatar?: string | null;
}

export async function getProfile() {
  const token = localStorage.getItem('@Auth:token');

  if (!token) {
    throw new Error("Token não encontrado no armazenamento local.");
  }

  // Decodifique o token para obter o payload
  const decodedHeader = jwtDecode(token, { header: true });

  // Extraia o ID do payload decodificado
  const userId = decodedHeader.;

  if (!userId) {
    throw new Error("ID do usuário não encontrado no token.");
  }

  const response = await api.get<GetProfileResponse>(`/me/${userId}`);

  return response.data;
}
