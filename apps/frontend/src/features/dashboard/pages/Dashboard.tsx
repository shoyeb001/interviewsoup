import WeeklyCalendarView from '../components/CalenderView';
import AddInterviewForm from '../components/AddInterviewForm';
import { StatCard } from '../components/StatCard';
import { QueueCard } from '../components/QueueCard';
import { TrendingUp, Smile } from 'lucide-react';

export default function Dashboard() {
    return (
        <>
            <div className="mb-8">
                <h1 className="text-xl font-semibold text-slate-800">Interviewer Dashboard</h1>
                <p className="text-slate-500 mt-1">Welcome back, Sarah. You have 3 interviews scheduled for today.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">

                <div className="flex-1 flex flex-col gap-6">

                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-[320px]">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-medium">Weekly Schedule</h2>
                        </div>
                        <WeeklyCalendarView />
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
                            <QueueCard
                                name="Jamie L."
                                role="Senior Engineer @ Stripe"
                                status="LIVE NOW"
                                statusColor="bg-green-100 text-green-700"
                                room="Room: 402-A"
                                avatar="https://i.pravatar.cc/150?u=jamie"
                            />
                            <QueueCard
                                name="Sam T."
                                role="Product Designer @ Meta"
                                status="Starting in 2h 45m"
                                statusColor="text-slate-500"
                                avatar="https://i.pravatar.cc/150?u=sam"
                            />
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