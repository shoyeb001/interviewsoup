import InterviewDetails from "../components/InterviewDetails";
import LobbyHeader from "../components/LobbyHeader";
import MediaPreview from "../components/MediaPreview";


export default function LobbyPage() {
    return (
        <div className="min-h-screen bg-[#FAF5F0] flex flex-col justify-between font-sans selection:bg-[#A8441A]/10">
            <div>
                <LobbyHeader />
                <main className="max-w-6xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <InterviewDetails />
                    </div>

                    {/* Right Column: Video & Setup */}
                    <div className="lg:col-span-7 flex justify-center lg:justify-end">
                        <MediaPreview />
                    </div>
                </main>
            </div>

            {/* Footer attribution */}
            <footer className="text-center py-6 text-[10px] font-semibold text-stone-400 tracking-widest uppercase border-t border-[#EAE0D5]/50 bg-[#FAF5F0]">
                Powered by InterviewSoup Architecture
            </footer>
        </div>
    );
}