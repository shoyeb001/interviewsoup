import { PlusCircle, Lightbulb } from 'lucide-react';
import { useAuth } from '@/shared/useAuth';
import { useScheduleInterviewMutation } from '@/services/interviewApi';
import { useForm } from 'react-hook-form';
import addInterviewSchema, { type AddInterviewSchemaType } from '../schemas/interview.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import notification from '@/shared/toast';
import { Button } from '@/components/ui/button';
export default function AddInterviewForm() {
    const [scheduleInterview, { isLoading }] = useScheduleInterviewMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AddInterviewSchemaType>({
        resolver: zodResolver(addInterviewSchema),
    });

    const onSubmit = async (data: AddInterviewSchemaType) => {
        try {
            console.log(data)
            const interviewData = {
                ...data,
                roundNo: parseInt(data.roundNo)
            }
            const response = await scheduleInterview(interviewData).unwrap();
            notification("Interview scheduled", "success");
            reset();
        } catch (error) {
            notification("Interview schedule failed", "error");
        }
    }

    return (
        <div className="bg-[#fcfcfc] p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-slate-800 font-medium">
                <PlusCircle className="w-5 h-5 text-[#bd5118]" />
                <h3>Add Interview</h3>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block text-sm text-slate-600 mb-1">Candidate Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Jordan Miller"
                        className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bd5118]/20 ${errors.candidateName ? 'border-red-500' : 'border-slate-200'
                            }`}
                        {...register('candidateName', { required: 'Candidate name is required' })}
                    />
                    {errors.candidateName && (
                        <p className="text-sm text-red-500">
                            {errors.candidateName.message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm text-slate-600 mb-1">Candidate Email</label>
                    <input type="text" placeholder="e.g. Jordan Miller" className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bd5118]/20" {...register('candidateEmail', { required: "Candidate enail required" })} />
                    {errors.candidateEmail && (
                        <p className="text-sm text-red-500">
                            {errors.candidateEmail.message}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-slate-600 mb-1">Date</label>
                        <input type="date" className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-500 focus:outline-none"    {...register('interviewDate', { required: "Date is required." })}
                        />
                        {errors.interviewDate && (
                            <p className="text-sm text-red-500">
                                {errors.interviewDate.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm text-slate-600 mb-1">Time</label>
                        <input type="time" className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-500 focus:outline-none"                         {...register('interviewTime', { required: "Time is required." })}
                        />
                        {errors.interviewTime && (
                            <p className="text-sm text-red-500">
                                {errors.interviewTime.message}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-slate-600 mb-1">Company Name</label>
                    <input type="text" placeholder="e.g. Netflix" className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none" {...register('companyName', { required: "Company name is required." })} />
                    {errors.companyName && (
                        <p className="text-sm text-red-500">
                            {errors.companyName.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm text-slate-600 mb-1">Round No.</label>
                    <select className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-700 bg-white focus:outline-none" {
                        ...register('roundNo')
                    }>
                        <option value="1">Round 1: Screening</option>
                        <option value="2">Round 2: Technical</option>
                        <option value="3">Round 3: System Design</option>
                    </select>
                    {errors.roundNo && (
                        <p className="text-sm text-red-500">
                            {errors.roundNo.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm text-slate-600 mb-1">Agenda / Notes</label>
                    <textarea rows={3} placeholder="Core competencies to focus on..." className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none resize-none" {...register("agenda")}></textarea>
                    {errors.agenda && (
                        <p className="text-sm text-red-500">
                            {errors.agenda.message}
                        </p>
                    )}
                </div>

                <Button
                    disabled={isLoading}
                    type='submit'
                    className="w-full bg-[#bd5118] hover:bg-[#a64512] disabled:bg-orange-300 disabled:cursor-not-allowed text-white py-6 rounded-lg font-medium transition-colors flex justify-center items-center gap-2 cursor-pointer"
                >
                    {isLoading ? "Schedulling..." : "Schedule Interview"}
                </Button>
            </form>

            {/* Pro-tip alert */}
            <div className="mt-6 bg-orange-50 text-orange-900 p-4 rounded-lg flex items-start gap-3 border border-orange-100">
                <Lightbulb className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed">
                    <strong>Pro-tip:</strong> Attach the JD link in the agenda to automatically generate relevant coding challenges.
                </p>
            </div>
        </div>
    );
}