import { api } from "@/lib/api";
import { jwtDecode } from "jwt-decode";


export interface GetProfileResponse {
  id?: string;
  name?: string;
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
  const user = jwtDecode(token); // decode your token here
  const userId = user.sub;

  console.log(userId);



  const response = await api.get<GetProfileResponse>(`/users/me/${userId}`);
  console.log(response.data);
  return response.data;
}
