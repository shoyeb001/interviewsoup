import { toast } from "sonner"

const notification = (message: string, type: "success" | "error") => {
    if (type === "success") {
        toast.success(message, {
            position: "top-right",
        })
    } else if (type === "error") {
        toast.error(message || "Login failed", {
            position: "top-right", style: {
                background: "#b54100",
                color: "#fff",
            }
        });
    }
}
export default notification;