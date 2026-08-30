import { ObjectId } from "mongodb";

export type UserRole = "customer" | "provider" | "admin";

export interface UserDocument {
    _id?: ObjectId;
    name: string;
    email: string;
    password?: string;
    role: UserRole;
    phone?: string;
    avatar?: string;
    area?: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}