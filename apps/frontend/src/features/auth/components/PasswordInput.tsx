import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

interface Props {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export default function PasswordInput({
    ...props
}: Props) {
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        console.log(props.value)
    }, [props.value])
    return (
        <div className="relative">
            <Input
                {...props}
                type={showPassword ? "text" : "password"}

                className="h-10 rounded-xl border-[#e8d7cf] pr-12 text-lg shadow-none focus-visible:ring-1 focus-visible:ring-[#b54100]"
            />

            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
    );
}