import { LayoutDashboard, Calendar, Video, Users, Settings, LifeBuoy, LogOut, Utensils } from 'lucide-react';
import React from 'react';

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-200 bg-[#fdf8f6] flex flex-col justify-between h-full">
      <div>
        <div className="p-6 flex items-center gap-3 text-orange-700 font-bold text-lg">
          <div className="bg-[#bd5118] p-2 rounded-md text-white">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            InterviewSoup
            <span className="block text-xs font-normal text-slate-500">Interviewer Portal</span>
          </div>
        </div>

        <nav className="px-4 space-y-1 mt-4">
          <NavItem icon={<LayoutDashboard />} label="Dashboard" active />
          <NavItem icon={<Calendar />} label="Calendar" />
          <NavItem icon={<Video />} label="Interviews" />
          <NavItem icon={<Users />} label="Candidates" />
          <NavItem icon={<Settings />} label="Settings" />
        </nav>
      </div>

      <div className="p-4 space-y-4">
        <button className="w-full bg-[#bd5118] hover:bg-[#a64512] text-white py-3 rounded-lg font-medium transition-colors">
          Schedule Interview
        </button>
        <div className="space-y-1">
          <NavItem icon={<LifeBuoy />} label="Support" />
          <NavItem icon={<LogOut />} label="Logout" />
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${active ? 'bg-[#bd5118] text-white' : 'text-slate-600 hover:bg-orange-50 hover:text-[#bd5118]'}`}>
      {React.cloneElement(icon as React.ReactElement)}
      {label}
    </a>
  );
}