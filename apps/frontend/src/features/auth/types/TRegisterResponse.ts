export type TRegisterResponse = {
    data:{
        access_token: string,
        user:{
            created_at: string;
            email: string;
            is_verified: boolean;
            name: string;
            role: string;
            updated_at: string;
        }
    },
    message: string;
    success: boolean;
}