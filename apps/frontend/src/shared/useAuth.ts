import type { UserState } from "@/app/slices/userSlice";
import type { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux"


export const useAuth = () => {
    const { name, email, role, isVerified, token} = useSelector((state: RootState) => state.user as UserState);

    return {
        name, 
        email, 
        role, 
        isVerified,
        token
    }

}