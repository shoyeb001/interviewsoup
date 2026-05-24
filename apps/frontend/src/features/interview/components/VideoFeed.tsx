import React from "react";
import { MicOff, SignalHigh } from "lucide-react";

interface VideoFeedProps {
  name: string,
  imageUrl: string,
  isMuted?: boolean,
  showSignal?: boolean
}
export default function VideoFeed({ name, imageUrl, isMuted = false, showSignal = false }: VideoFeedProps) {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#E8DFD8] bg-stone-900 shadow-sm">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover opacity-90"
      />

      {/* Top right icon */}
      <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md rounded-full p-1.5">
        {isMuted && <MicOff className="w-4 h-4 text-white" />}
        {showSignal && <SignalHigh className="w-4 h-4 text-[#D95D22]" />}
      </div>

      {/* Bottom left name tag */}
      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-2">
        {name.includes("(You)") && (
          <div className="w-2 h-2 rounded-full bg-[#D95D22]"></div>
        )}
        <span className="text-xs text-white font-medium">{name}</span>
      </div>
    </div>
  );
}