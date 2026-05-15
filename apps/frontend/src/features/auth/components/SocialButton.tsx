import { GitBranch } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SocialAuth() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-zinc-200" />

                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Or Continue With
                </span>

                <div className="h-[1px] flex-1 bg-zinc-200" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button
                    type="button"
                    variant="outline"
                    className="h-14 rounded-xl border-[#e8d7cf] text-base"
                >
                    <GitBranch size={22} />
                    Google
                </Button>
            </div>
        </div>
    );
}