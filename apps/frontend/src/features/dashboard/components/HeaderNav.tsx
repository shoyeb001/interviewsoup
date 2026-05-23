import { Search, Bell, HelpCircle } from 'lucide-react';

export default function HeaderNav() {
    return (
        <header className="h-16 border-b border-slate-200 bg-[#fdf8f6] flex items-center justify-between px-8">
            <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search interviews..."
                    className="w-full pl-10 pr-4 py-2 bg-transparent border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
            </div>

            <div className="flex items-center gap-6">
                <button className="text-slate-500 hover:text-slate-700">
                    <Bell className="w-5 h-5" />
                </button>
                <button className="text-slate-500 hover:text-slate-700">
                    <HelpCircle className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                    <img src="https://i.pravatar.cc/150?u=sarah" alt="Profile" className="w-full h-full object-cover" />
                </div>
            </div>
        </header>
    );
}