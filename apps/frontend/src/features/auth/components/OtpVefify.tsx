import React, { use, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Shield, Lock, RefreshCw, ArrowLeft, HelpCircle } from 'lucide-react';
import type { FormValues } from '../schemas/auth.schema';
import { useResendOtpMutation, useVerifyOtpMutation } from '@/services/authApi';
import notification from '@/shared/toast';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
export default function OtpVerify() {
    const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
    const [resendOtp, { isLoading: isResendLoading }] = useResendOtpMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { email } = useSelector((state: any) => state.user);
    const { handleSubmit, setValue, watch } = useForm<FormValues>({
        defaultValues: {
            otp: ['', '', '', '', '', ''],
        },
    });

    const otpValues = watch('otp');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        // Prevent multiple characters (e.g., if user pastes)
        if (value.length > 1) {
            // Optional: Handle paste logic here by splitting the string
            value = value.slice(0, 1);
        }

        setValue(`otp.${index}`, value);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Move to previous input on backspace if current is empty
        if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const submitResendOtp = async () => {
        try {
            const response = await resendOtp({ email: email }).unwrap();
            notification("Otp resent Successfully", "success");
        } catch (error: any) {
            notification("Failed to send otp.", error)
        }
    }

    const onSubmit = async (data: FormValues) => {
        const otpCode = data.otp.join('');
        console.log('Submitted OTP:', otpCode);
        try {
            const response = await verifyOtp({ otp: otpCode, email: email }).unwrap();
            console.log('OTP verification successful:', response);
            notification("Otp verified Successfully", "success")
            navigate("/dashboard");
        } catch (error: any) {
            notification("Failed to verify OTP. Please try again.", error)
        }
    };

    return (
        <div className="min-h-screen font-sans bg-gradient-to-br from-[#fdfbfb] to-[#faeee9] flex items-center justify-center p-4 relative text-gray-800">

            {/* Main Center Content */}
            <div className="w-full max-w-[440px] flex flex-col items-center relative z-10">

                {/* Logo and Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-[#a64010] p-2.5 rounded-xl mb-4 shadow-sm">
                        <Shield className="text-white w-6 h-6" fill="currentColor" strokeWidth={1.5} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">InterviewSoup</h1>
                </div>

                {/* Main Verification Card */}
                <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 w-full mb-6">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-900">Verify Identity</h2>
                        <p className="text-sm text-gray-600">
                            We've sent a 6-digit verification code to<br />
                            <span className="font-semibold text-gray-900 mt-1 inline-block">j.doe@example.com</span>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* OTP Inputs */}
                        <div className="flex justify-between gap-3 mb-6">
                            {otpValues.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => {
                                        inputRefs.current[index] = el;
                                    }}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    placeholder="-"
                                    className="w-12 h-12 text-center text-lg font-medium border border-orange-200/60 rounded focus:outline-none focus:border-[#a64010] focus:ring-1 focus:ring-[#a64010] text-gray-700 bg-white placeholder-gray-300 transition-colors"
                                />
                            ))}
                        </div>

                        {/* Verify Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#a64010] text-white py-3 rounded text-sm font-medium hover:bg-[#8c350c] transition-colors mb-8 shadow-sm"
                        >
                            {isLoading || isResendLoading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </form>

                    {/* Resend Section */}
                    <div className="text-center mb-8">
                        <p className="text-sm text-gray-500 mb-2">Didn't receive the code?</p>
                        <button
                            type="button"
                            className="text-[#a64010] cursor-pointer text-sm font-medium flex items-center justify-center gap-1.5 mx-auto hover:text-[#8c350c] transition-colors"
                            onClick={submitResendOtp}
                        >
                            <RefreshCw className="w-3.5 h-3.5" />
                            Resend OTP
                        </button>
                    </div>

                    {/* Divider */}
                    <hr className="border-gray-100 mb-6" />

                    {/* Secure Verification Footer */}
                    <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Secure Verification</span>
                    </div>
                </div>

                <div className="flex justify-between w-full px-2">
                    <button type="button" className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to login
                    </button>
                    <button type="button" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        Contact Support
                    </button>
                </div>
            </div>

            <div className="hidden lg:flex absolute bottom-8 right-8 flex-col gap-4 w-[320px]">

                <div className="bg-[#fceede] rounded-xl border border-orange-100 p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="bg-blue-100/50 p-1 rounded-full">
                            <HelpCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        <h3 className="font-medium text-gray-800 text-sm">Need assistance?</h3>
                    </div>
                    <p className="text-[13px] leading-relaxed text-gray-700">
                        Our secure login ensures that only authorized interviewers can access candidate data.
                    </p>
                </div>

            </div>

        </div>
    );
}