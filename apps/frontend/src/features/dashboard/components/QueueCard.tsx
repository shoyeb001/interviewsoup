export function QueueCard({ name, role, status, statusColor, room, avatar }: { name: string, role: string, status: string, statusColor: string, room?: string, avatar: string }) {
    return (
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-4">
            <img src={avatar} alt={name} className="w-12 h-12 rounded-lg object-cover" />
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-slate-800">{name}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider ${statusColor}`}>
                        {status}
                    </span>
                </div>
                <p className="text-sm text-slate-500 mt-0.5">{role}</p>
                {room ? (
                    <p className="text-xs font-semibold text-orange-700 mt-2">{room}</p>
                ) : (
                    <p className="text-xs text-slate-400 mt-2">{status}</p>
                )}
            </div>
        </div>
    );
}