import React from 'react'
import LoginForm from '../components/LoginForm'
import { Brain, Clock, Gauge, LayoutDashboardIcon } from 'lucide-react'
import AuthInfo from '../components/AuthInfo'
import SignupForm from '../components/SignupForm'

function SignupPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md">
                        <SignupForm />
                    </div>
                </div>
            </div>
            <div className="relative   hidden bg-muted lg:block">
                <div className='min-h-svh flex items-center justify-center'>
                    <AuthInfo />
                </div>
            </div>
        </div>
    )
}

export default SignupPage;