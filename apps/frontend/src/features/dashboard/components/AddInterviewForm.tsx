import { PlusCircle, Lightbulb } from 'lucide-react';

export default function AddInterviewForm() {
    return (
        <div className="bg-[#fcfcfc] p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-slate-800 font-medium">
                <PlusCircle className="w-5 h-5 text-[#bd5118]" />
                <h3>Add Interview</h3>
            </div>

            <form className="space-y-4">
                <div>
                    <label className="block text-sm text-slate-600 mb-1">Candidate Name</label>
                    <input type="text" placeholder="e.g. Jordan Miller" className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bd5118]/20" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-slate-600 mb-1">Date</label>
                        <input type="date" className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-600 mb-1">Time</label>
                        <input type="time" className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-500 focus:outline-none" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-slate-600 mb-1">Company Name</label>
                    <input type="text" placeholder="e.g. Netflix" className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none" />
                </div>

                <div>
                    <label className="block text-sm text-slate-600 mb-1">Round No.</label>
                    <select className="w-full p-2.5 border border-slate-200 rounded-lg text-slate-700 bg-white focus:outline-none">
                        <option>Round 1: Screening</option>
                        <option>Round 2: Technical</option>
                        <option>Round 3: System Design</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-slate-600 mb-1">Agenda / Notes</label>
                    <textarea rows={3} placeholder="Core competencies to focus on..." className="w-full p-2.5 border border-slate-200 rounded-lg focus:outline-none resize-none"></textarea>
                </div>

                <button type="button" className="w-full bg-[#bd5118] hover:bg-[#a64512] text-white py-3 rounded-lg font-medium transition-colors mt-2">
                    Confirm Schedule
                </button>
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