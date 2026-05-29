export function StatCard({ icon, title, value, className }: { icon: React.ReactNode, title: string, value: string, className?: string }) {
    return (
        <div className={`p-6 rounded-xl flex flex-col justify-between ${className}`}>
            <div className="mb-4">
                {icon}
            </div>
            <div>
                <h4 className="text-sm opacity-90 font-medium">{title}</h4>
                <span className="text-4xl font-bold mt-1 block">{value}</span>
            </div>
        </div>
    );
}