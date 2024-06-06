export interface UserResponse {
    users: User[];
    pageIndex: number;
    perPage: number;
    totalPages: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    avatar?: any;
}