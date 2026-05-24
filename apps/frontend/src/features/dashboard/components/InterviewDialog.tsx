import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, LayoutList, Video } from "lucide-react";

interface InterviewPopupProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    data: any
}

export default function InterviewPopup({ isOpen, onOpenChange, data }: InterviewPopupProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] p-6 rounded-2xl gap-0">
                <DialogHeader className="text-left mb-6">
                    <DialogTitle className="text-xl font-bold text-gray-900">
                        {data?.candidate_name}
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                        {data?.agenda} @ {data?.company_name}
                    </p>
                </DialogHeader>

                <div className="flex flex-col gap-4 mb-6">
                    {/* Time */}
                    <div className="flex items-center gap-3 text-gray-700">
                        <Clock className="w-5 h-5 text-[#d96b27]" strokeWidth={2} />
                        <span className="text-sm font-medium">
                            {data?.candidate_email}
                        </span>
                    </div>

                    {/* Interview Type */}
                    <div className="flex items-center gap-3 text-gray-700">
                        <LayoutList className="w-5 h-5 text-[#d96b27]" strokeWidth={2} />
                        <span className="text-sm font-medium">
                            {data?.agenda} @ {data?.company_name}
                        </span>
                    </div>

                    {/* Agenda Box */}
                    <div className="bg-[#fff9f5] rounded-xl p-4 mt-2">
                        <h4 className="text-xs font-semibold text-gray-500 tracking-wider mb-2">
                            AGENDA
                        </h4>
                        <p className="text-sm font-medium text-gray-800">
                            System Design, Scalability, and Cultural Fit.
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    <Button
                        className="w-full h-12 bg-[#e05d14] hover:bg-[#c95210] text-white rounded-lg text-base font-semibold shadow-none flex items-center justify-center gap-2"
                    >
                        <Video className="w-5 h-5" />
                        Join Call
                    </Button>
                    {/* <Button
                        variant="outline"
                        className="w-full h-12 rounded-lg text-base font-semibold border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                        View Resume
                    </Button> */}
                </div>
            </DialogContent>
        </Dialog>
    );
}