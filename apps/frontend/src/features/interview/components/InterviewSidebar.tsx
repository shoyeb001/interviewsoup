import VideoFeed from "./VideoFeed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useWebRTC } from "../hooks/useWebRTC";

export default function Sidebar({ roomId }: { roomId: string }) {
  const { localVideoRef, remoteVideoRef } = useWebRTC(roomId);
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Video Feeds Container */}
      <div className="flex flex-col gap-3">

        <VideoFeed
          name="Interviewer"
          videoRef={remoteVideoRef}
          showSignal
        />

        <VideoFeed
          name="Jamie L."
          videoRef={localVideoRef}
          showSignal={true}
        />
      </div>

      {/* Evaluator Notes Panel */}
      <div className="flex-1 flex flex-col bg-transparent">
        <Tabs defaultValue="notes" className="flex-1 flex flex-col">
          <TabsList className="bg-transparent border-b border-[#E8DFD8] w-full justify-start rounded-none h-12 p-0">
            <TabsTrigger
              value="notes"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#A8441A] data-[state=active]:text-[#A8441A] rounded-none px-4 text-sm font-medium text-stone-500 h-full"
            >
              Evaluator Notes
            </TabsTrigger>
            <TabsTrigger
              value="specs"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-4 text-sm font-medium text-stone-400 h-full"
            >
              Problem Specs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notes" className="flex-1 flex flex-col gap-5 pt-4 m-0">
            <div>
              <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Current Focus</h3>
              <p className="text-sm text-stone-800">Explain the time complexity of the Two Sum solution.</p>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Live Observations</h3>
                <span className="text-[10px] text-stone-400">Auto-saving...</span>
              </div>
              <Textarea
                placeholder="Type notes here..."
                className="flex-1 min-h-[120px] resize-none border-[#E8DFD8] focus-visible:ring-[#A8441A] text-sm p-3 shadow-sm"
              />
              <div className="text-right mt-1">
                <span className="text-[10px] text-stone-400">14:24:02</span>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Quick Feedback</h3>
              <div className="flex flex-wrap gap-2">
                {["Good Logic", "Needs Hint", "Clear Comms"].map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-[#F2E8E1] text-[#7A5A4A] text-xs font-medium hover:bg-[#E8DFD8] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <Button className="w-full mt-auto bg-[#50637A] hover:bg-[#3B4A5B] text-white py-6 text-sm font-medium rounded-md shadow-sm">
              Submit Interim Evaluation
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}