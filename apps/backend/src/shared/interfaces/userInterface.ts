import {type Request } from "express";

export interface AuthRequest extends Request{
    user?: {
        id: string;
        name: string;
        email: string;
        role: string;
        is_verified: boolean;
    }
}