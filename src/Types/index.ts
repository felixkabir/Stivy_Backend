
export type UserType = {
    id: string;
    created_at: Date;
    username: string;
    file_url: string | null;
    file_key: string | null;
    email: string;
    password: string;
}

export type AgencyType = {
    id: string;
    created_at: Date;
  
    name: string;
    file_url: string | null;
    file_key: string | null;
    contact: string;
    userId: string;

    creator?: UserType
}

export interface UserResponse extends UserType {
    online_status?: boolean | null
}