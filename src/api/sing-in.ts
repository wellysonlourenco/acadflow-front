import { api } from "@/lib/api";

export interface SignInBody {
  email: string;
  password: string;
}

export async function signIn({ email , password }: SignInBody) {
  await api.post('/auth/login', { email , password })
}