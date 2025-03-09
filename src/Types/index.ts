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

// export type FileType = {
//     id: string;
//     file_url: string;
//     file_key: string;
// }

export type ModelType = {
    id: string;
    name: string | null;
    height: string | null;
    waist: string | null;
    shoes: string | null;
    contact: string | null;
    file_key?: string;
    file_url?: string;

    userId: string | null
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
    start_date: string;
    end_date: string;
    location: string;
    userId: string

    file_url?: string;
    file_key?: string
}

export interface UserResponse extends UserType {
    online_status?: boolean | null
}

export type InterestType = {
    type: string;
    name: string
}

export type ModelRequestType = {
    userId: string;
    modelId: string;
    agencyId: string | null;
}