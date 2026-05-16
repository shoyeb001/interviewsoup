import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PasswordInput from "./PasswordInput";
import { registerSchema, type RegisterSchemaType } from "../schemas/auth.schema";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CodeIcon } from "lucide-react";
import { useRegisterMutation } from "@/services/authApi";
import notification from "@/shared/toast";
import { useSelector, useDispatch } from "react-redux";
import { type TRegisterResponse } from "../types/TRegisterResponse";
import { addUser } from "@/app/slices/userSlice";
export default function SignupForm() {
    const [signup, { isLoading }] = useRegisterMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterSchemaType>({
        resolver: zodResolver(registerSchema),
    });
    const onSubmit = async (data: RegisterSchemaType) => {
        try {
            const userData = {
                ...data,
                role: "interviewer"
            }
            const response: TRegisterResponse = await signup(userData).unwrap();
            console.log(response);
            notification("Register successful", "success");
            const user = response.data.user;
            dispatch(addUser({
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.is_verified
            }));
            navigate("/otp-verify");
        } catch (error) {
            notification("Registration failed", "error");
        }
    }
    return (
        <div className="w-full max-w-[560px]">
            <div className="mb-14 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c14b05] text-white">
                    <CodeIcon />
                </div>

                <h1 className="text-[30px] font-bold tracking-tight text-[#b54100]">
                    InterviewSoup
                </h1>
            </div>
            <div>
                <h2 className="text-[40px] font-bold tracking-tight text-black">
                    Create an account
                </h2>

                <p className="mt-3 text-sm text-zinc-600">
                    Enter your credentials to access the Interviewer Portal.
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-4"
            >
                <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-[0.15em] text-zinc-700">
                        Full Name
                    </label>

                    <Input
                        {...register("name")}
                        placeholder="Enter Names"
                        className="h-10 rounded-xl border-[#e8d7cf] text-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#b54100]"
                    />

                    {errors.email && (
                        <p className="text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-[0.15em] text-zinc-700">
                        Email Address
                    </label>

                    <Input
                        {...register("email")}
                        placeholder="interviewer@interviewsoup.com"
                        className="h-10 rounded-xl border-[#e8d7cf] text-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#b54100]"
                    />

                    {errors.email && (
                        <p className="text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-bold uppercase tracking-[0.15em] text-zinc-700">
                            Password
                        </label>

                    </div>

                    <PasswordInput
                        placeholder="••••••••"
                        {...register("password")}
                    />

                    {errors.password && (
                        <p className="text-sm text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-bold uppercase tracking-[0.15em] text-zinc-700">
                            Confirm Password
                        </label>

                    </div>

                    <PasswordInput
                        placeholder="••••••••"
                        {...register("confirmPassword")}
                    />

                    {errors.confirmPassword && (
                        <p className="text-sm text-red-500">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <Checkbox id="remember" />

                    <label
                        htmlFor="remember"
                        className="text-base text-zinc-600"
                    >
                        Keep me logged in for 30 days
                    </label>
                </div>

                <Button
                    disabled={isLoading}
                    className="h-12 w-full rounded-xl bg-[#b54100] text-lg cursor-pointer font-semibold hover:bg-[#9d3900]"
                >
                    {isLoading ? "Creating account..." : "Register"}
                </Button>
            </form>
            {/* <div className="mt-10">
                <SocialAuth />
            </div> */}

            <p className="mt-12 text-center text-base text-zinc-600">
                Don&apos;t have an account? {" "}

                <Link
                    to="/signup"
                    className="font-semibold text-[#b54100]"
                >
                    Create an account
                </Link>
            </p>
        </div >
    );
}