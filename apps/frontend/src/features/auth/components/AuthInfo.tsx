import { Brain, Gauge } from 'lucide-react'

const AuthInfo = () => {
    return (
        <div className='flex flex-col items-center justify-center gap-6 max-w-[600px] m-auto md:p-6'>
            <h2 className='text-[42px] font-bold tracking-tight text-[#b54100]'>Fueling Technical Excellence.</h2>
            <p>Join thousands of interviewers using InterviewSoup to streamline their evaluation process and find the best talent with warm professionalism.</p>
            <div className="flex flex-row items-center justify-center gap-6 w-full">
                <div className="w-[290px] h-[120px] rounded-2xl bg-white border border-[#e7d7cf] px-6 py-5 shadow-sm">
                    <div className='flex flex-col gap-4'>
                        <Gauge color='#b54100' />
                        <p className='text-sm font-medium'>Real-time evaluation</p>
                    </div>

                </div>
                <div className="w-[290px] h-[120px] rounded-2xl bg-white border border-[#e7d7cf] px-6 py-5 shadow-sm">
                    <div className='flex flex-col gap-4'>
                        <Brain color='#b54100' />
                        <p className='text-sm font-medium'>AI-Powered Insights</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthInfo