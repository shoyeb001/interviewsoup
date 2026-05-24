import { Calendar, Building2, Clock, Hourglass } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function InterviewDetails() {
    return (
        <>
            {/* Session Tag */}
            <div className="inline-flex items-center gap-1.5 bg-[#A8441A] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md w-fit">
                <Calendar className="w-3 h-3 fill-current" />
                Upcoming Session
            </div>

            {/* Main Greeting */}
            <h2 className="text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
                Ready for your <br />
                interview, <span className="text-[#A8441A]">Jamie?</span>
            </h2>

            {/* Main Info Card */}
            <Card className="border-[#EADFC9] bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-5">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#D2E4FF] text-[#1E5BAA] rounded-lg">
                        <Building2 className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                            Interviewing With
                        </p>
                        <p className="text-xl font-bold text-stone-800">Stripe</p>
                    </div>
                </div>

                <div className="h-px bg-[#EADFC9]/60 w-full" />

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">
                            Position
                        </p>
                        <p className="text-sm font-bold text-stone-800">
                            Senior Frontend Engineer
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">
                            Round
                        </p>
                        <p className="text-sm font-bold text-stone-800 text-right lg:text-left">
                            Technical (Round 2)
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1.5 bg-[#FDF0EB] text-[#A8441A] text-xs font-semibold px-3 py-1.5 rounded-md">
                        <Clock className="w-3.5 h-3.5" />
                        Today, 02:30 PM
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#FDF0EB] text-[#A8441A] text-xs font-semibold px-3 py-1.5 rounded-md">
                        <Hourglass className="w-3.5 h-3.5" />
                        60 Minutes
                    </div>
                </div>
            </Card>

            {/* Agenda Card */}
            <Card className="border-[#EADFC9] bg-white/60 rounded-2xl p-4 shadow-sm">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2">
                    Today's Agenda
                </p>
                <div className="flex flex-wrap gap-2">
                    {["System Design", "Scalability", "Cultural Fit"].map((item) => (
                        <Badge
                            key={item}
                            variant="secondary"
                            className="bg-[#EAE2DB] text-stone-600 hover:bg-[#EAE2DB] px-3 py-1 text-xs font-medium rounded-full"
                        >
                            {item}
                        </Badge>
                    ))}
                </div>
            </Card>
        </>
    );
}