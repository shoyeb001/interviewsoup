import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, PhoneOff } from "lucide-react";
const InterviewHeader = () => {
    return (
        <header className="flex items-center justify-between px-6 py-3 bg-[#FCF8F5] border-b border-[#E8DFD8]">
            <div className="flex items-center gap-6">
                <h1 className="text-2xl font-bold text-[#A8441A] tracking-tight">
                    InterviewSoup
                </h1>
                <div className="h-6 w-px bg-stone-300"></div>
                <div className="flex items-center gap-2 bg-[#F2E8E1] px-3 py-1.5 rounded-md text-sm font-medium text-stone-700">
                    <Clock className="w-4 h-4" />
                    <span>42:18</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm font-medium text-stone-600">
                    Session: Senior Frontend Engineer
                    <Badge className="bg-[#1E5BAA] hover:bg-[#1E5BAA] text-white text-xs px-2 py-0">
                        LIVE
                    </Badge>
                </div>
                <Button className="bg-[#C53030] hover:bg-red-800 text-white rounded-md flex items-center gap-2 px-4 py-2">
                    <PhoneOff className="w-4 h-4" />
                    Leave Call
                </Button>
            </div>
        </header>
    )
}

export default InterviewHeader