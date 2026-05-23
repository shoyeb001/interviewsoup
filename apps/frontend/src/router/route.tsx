import AuthLayout from "@/components/AuthLayout";
import OtpLayout from "@/components/OtpLayout";
import OtpVerify from "@/features/auth/components/OtpVefify";
import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";
import VerifyOtpPage from "@/features/auth/pages/VerifyOtpPage";
import { createBrowserRouter } from "react-router";

export const routerProvider = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />
    },
    {
        path: "/signup",
        element: <SignupPage />
    },
    {
        path: "/otp-verify",
        element: (
            <>
                <OtpLayout>
                    <OtpVerify />
                </OtpLayout>
            </>
        )
    }
])