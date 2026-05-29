import WeeklyCalendarView from '../components/CalenderView';
import AddInterviewForm from '../components/AddInterviewForm';
import { StatCard } from '../components/StatCard';
import { QueueCard } from '../components/QueueCard';
import { TrendingUp, Smile } from 'lucide-react';
import { useGetAllInterviewsQuery, useGetUpcomingInterviewsQuery } from '@/services/interviewApi';
import type { TUpcomingInterview } from '../types/dashboard.types';
import { extractCalendarEvents, getInterviewTimeLeft } from '@/lib/utils';

export default function Dashboard() {
    const { data: upcomingInterviews, isLoading, isSuccess } = useGetUpcomingInterviewsQuery({});
    const { data: interviews, isSuccess: interviewSuccess, isLoading: interviewLoading } = useGetAllInterviewsQuery({});
    return (
        <>
            <div className="mb-8">
                <h1 className="text-xl font-semibold text-slate-800">Interviewer Dashboard</h1>
                <p className="text-slate-500 mt-1">Welcome back, Sarah. You have 3 interviews scheduled for today.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">

                <div className="flex-1 flex flex-col gap-6">

                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm ">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-medium">Scheduled Interviews</h2>
                        </div>
                        {
                            interviewSuccess && <WeeklyCalendarView interviews={extractCalendarEvents(interviews.data.interviews)} />

                        }
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <StatCard
                            icon={<TrendingUp className="text-white w-6 h-6" />}
                            title="Total Interviews Done"
                            value="124"
                            className="bg-[#0e7cd4] text-white"
                        />
                        <StatCard
                            icon={<Smile className="text-slate-600 w-6 h-6" />}
                            title="Hiring Accuracy"
                            value="88%"
                            className="bg-[#d2e3fc] text-slate-800"
                        />
                    </div>

                    <div>
                        <h3 className="font-medium mb-2 mt-4">Today's Queue</h3>
                        <p className="text-sm text-slate-500 mb-4">Your immediate focus area for today's sessions.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {
                                isSuccess && upcomingInterviews.data.upcomingInterviews.map((interview: TUpcomingInterview) => (
                                    <QueueCard
                                        name={interview?.candidate_name}
                                        role={interview?.agenda}
                                        status={getInterviewTimeLeft(interview?.interview_date, interview?.interview_time)}
                                        statusColor="bg-green-100 text-green-700"
                                        room={interview?.room_id}
                                        avatar="https://i.pravatar.cc/150?u=jamie"
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-[380px]">
                    <AddInterviewForm />
                </div>

            </div>
        </>
    );
}