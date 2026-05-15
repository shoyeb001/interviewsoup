import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";
import { createBrowserRouter } from "react-router";

export const routerProvider = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />
    },
    {
        path: "/signup",
        element: <SignupPage />
    }
])