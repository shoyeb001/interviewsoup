import Sidebar from '../components/Sidebar';
import HeaderNav from '../components/HeaderNav';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/shared/useAuth';
import { useGetUserProfileQuery } from '@/services/userApi';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { addUser } from '@/app/slices/userSlice';

export default function DashboardLayout() {
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
                isVerified: is_verified
            }))
        }
    }, [data])
    if (token === "") {
        return <Navigate to="/" replace />
    } else if (token !== "" && !isVerified) {
        return <Navigate to="/otp-verify" replace />
    }
    return (
        <div className="flex h-screen bg-[#fcf9f8] text-slate-800 font-sans overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-y-auto">
                <HeaderNav />

                <main className="p-8 max-w-7xl mx-auto w-full">
                    {/* Header Section */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
}