import { HelpCircle, Bell } from "lucide-react";

export default function LobbyHeader() {
    return (
        <header className="flex items-center justify-between px-8 py-4 bg-transparent">
            <h1 className="text-2xl font-bold text-[#A8441A] tracking-tight cursor-pointer">
                InterviewSoup
            </h1>
            <div className="flex items-center gap-4 text-stone-600">
                <button className="p-1 hover:text-stone-900 transition-colors">
                    <HelpCircle className="w-5 h-5 stroke-[1.75]" />
                </button>
                <button className="p-1 hover:text-stone-900 transition-colors relative">
                    <Bell className="w-5 h-5 stroke-[1.75]" />
                </button>
            </div>
        </header>
    );
}