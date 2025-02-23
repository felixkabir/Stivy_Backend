
export type UserType = {
    id: string;
    created_at: Date;
    username: string;
    file_url: string | null;
    file_key: string | null;
    email: string;
    password: string;
}

export interface UserResponse extends UserType {
    online_status?: boolean | null
}