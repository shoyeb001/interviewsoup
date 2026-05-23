import { addUser } from "@/app/slices/userSlice";
import { useGetUserProfileQuery } from "@/services/userApi";
import { useAuth } from "@/shared/useAuth";
import { useEffect, useState, type ReactNode } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router";

const OtpLayout = ({ children }: { children: ReactNode }) => {
    const { token, name, isVerified } = useAuth();
    const [skip, setSkip] = useState(true);
    const { data, error, isLoading } = useGetUserProfileQuery({ skip });
    const dispatch = useDispatch();

    useEffect(() => {
        if (token === "") {
            setSkip(false);
        }
    }, [token])
    useEffect(() => {
        if (data && !isLoading) {
            console.log(data, "data");
            const { name, email, role, is_verified } = data.data.user;
            dispatch(addUser({
                name: name,
                email,
                role,
                is_verified
            }))
        }
    }, [data])
    if (token === "") {
        return <Navigate to="/" replace />
    } else if (token !== "" && isVerified) {
        return <Navigate to="/dashbboard" replace />
    }

    return children;
}

export default OtpLayout