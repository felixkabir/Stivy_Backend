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

export type FileType = {
    id: string;
    file_url: string;
    file_key: string;
}

export type ModelType = {
    id: string;
    name: string;
    height: string;
    waist: string;
    shoes: string;
    contact: string;

    userId: string
    files?: File[]
}

export type PostType = {
    id: string;
    content?: string;
    type: string
}

export type EventType = {
    id: string;
    created_at: Date;
    name: string
    start_date: Date;
    end_date: Date;
    userId: string

    file_url?: string;
    file_key?: string
}

export interface UserResponse extends UserType {
    online_status?: boolean | null
}