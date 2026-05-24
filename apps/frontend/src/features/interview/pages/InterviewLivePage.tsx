import React from "react";
import InterviewHeader from "../components/InterviewHeader";
import EditorWorkspace from "../components/EditorWorkspace";
import Sidebar from "../components/InterviewSidebar";

export default function InterviewLivePage() {
    return (
        <div className="flex flex-col h-screen bg-[#FCF8F5] text-slate-900 font-sans overflow-hidden">
            <InterviewHeader />
            <main className="flex flex-1 overflow-hidden p-4 gap-4">
                <section className="flex-1 flex flex-col min-w-0">
                    <EditorWorkspace />
                </section>
                <aside className="w-96 flex flex-col shrink-0 overflow-y-auto">
                    <Sidebar />
                </aside>
            </main>
        </div>
    );
}