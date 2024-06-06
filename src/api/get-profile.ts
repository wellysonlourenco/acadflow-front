import { api } from "@/lib/api";
import { jwtDecode } from "jwt-decode";


export interface GetProfileResponse {
  userData: UserData;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  avatarUrl?: any;
}

export async function getProfile() {
  const token = localStorage.getItem('@Auth:token');

  if (!token) {
    throw new Error("Token não encontrado no armazenamento local.");
  }
  const decodedToken = jwtDecode(token); // decode your token here
  const userId = decodedToken.sub;

  console.log(userId);



  const response = await api.get<GetProfileResponse>(`/users/me/${userId}`);
  console.log(response.data);
  return response.data;
}
