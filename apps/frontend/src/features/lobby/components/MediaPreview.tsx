import { Mic, Video, Settings, ArrowRight, VideoOff, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

export default function MediaPreview() {
    const navigate = useNavigate();
    const { roomId } = useParams();
    console.log(roomId)
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [micEnable, setMicEnable] = useState(true);
    const [cameraEnable, setCameraEnable] = useState(true);
    const [audioLevel, setAudioLevel] = useState(0);
    const [loading, setLoading] = useState(true);
    const [permissionError, setPermissionError] = useState("");


    useEffect(() => {
        console.log("thisi")
        startMedia();
        return () => {
            stopTracks();
        }
    }, [])

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    //audio detection
    useEffect(() => {
        if (!stream) return;
        const audioTrack = stream.getAudioTracks()[0];
        if (!audioTrack) return;
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const dataArray = new Uint8Array(
            analyser.frequencyBinCount
        );
        microphone.connect(analyser);
        analyser.fftSize = 256;
        let animationId: number;
        const checkAudio = () => {
            analyser.getByteFrequencyData(dataArray);

            const average =
                dataArray.reduce((a, b) => a + b, 0) /
                dataArray.length;

            setAudioLevel(average);

            animationId = requestAnimationFrame(checkAudio);
        };
        checkAudio();
        return () => {
            cancelAnimationFrame(animationId);
            audioContext.close();
        }
    }, [stream])

    const startMedia = async () => {
        try {
            setLoading(true);
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            setStream(mediaStream);
            setPermissionError("");
        } catch (error) {
            console.log(error);
            setPermissionError(
                "Camera or microphone permissiond denied"
            );
        } finally {
            setLoading(false)
        }
    }

    const stopTracks = () => {
        stream?.getTracks().forEach((track) => {
            track.stop();
        })
    }

    const toggleMic = () => {
        if (!stream) return;
        const enabled = !micEnable;
        stream.getAudioTracks().forEach((track) => {
            track.enabled = enabled
        })
        setMicEnable(enabled)
    }

    const togggleCamera = () => {
        console.log("clicking")
        if (!stream) return;
        const enabled = !cameraEnable;
        stream.getVideoTracks().forEach((track) => {
            track.enabled = enabled;
        })
        // Re-attach stream when turning camera back on
        if (enabled && videoRef.current) {
            console.log("This is showing")
            videoRef.current.srcObject = stream;
        }

        setCameraEnable(enabled);
    }
    const handelJoinInterview = () => {
        navigate(`/interview/live/${roomId}`)
    }

    return (
        <Card className="w-full max-w-lg border-[#EADFC9] bg-white rounded-3xl p-4 shadow-md flex flex-col gap-4">
            {/* Simulated Camera Window */}
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-stone-800 border border-stone-200">
                {/* <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800"
                    alt="Camera Preview"
                    className="w-full h-full object-cover"
                /> */}
                {/* {
                    cameraEnable ? (
                        <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-white gap-3">
                            <VideoOff className="w-12 h-12 opacity-70" />
                            <p className="text-sm opacity-80">
                                Camera is turned off
                            </p>
                        </div>
                    )
                } */}
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                />

                {/* CAMERA OFF OVERLAY */}
                {!cameraEnable && (
                    <div className="absolute inset-0 bg-stone-900 flex flex-col items-center justify-center text-white gap-3">
                        <VideoOff className="w-12 h-12 opacity-70" />

                        <p className="text-sm opacity-80">
                            Camera is turned off
                        </p>
                    </div>
                )}
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm">
                        Initializing camera...
                    </div>
                )}

                {/* Permission Error */}
                {permissionError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm text-center px-6">
                        {permissionError}
                    </div>
                )}


                {/* Floating Quick Action Overlay */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    {/* <button className="p-2.5 bg-black/40 backdrop-blur-md hover:bg-black/60 text-white rounded-full transition-colors border border-white/10">
                        <Mic className="w-4 h-4" />
                    </button>
                    <button className="p-2.5 bg-black/40 backdrop-blur-md hover:bg-black/60 text-white rounded-full transition-colors border border-white/10">
                        <Video className="w-4 h-4" />
                    </button> */}
                    <button
                        onClick={toggleMic}
                        className={`p-3 rounded-full transition-all border border-white/10 backdrop-blur-md ${micEnable
                            ? "bg-black/40 hover:bg-black/60 text-white"
                            : "bg-red-500 hover:bg-red-600 text-white"
                            }`}
                    >
                        {micEnable ? (
                            <Mic className="w-4 h-4" />
                        ) : (
                            <MicOff className="w-4 h-4" />
                        )}
                    </button>
                    <button
                        onClick={togggleCamera}
                        className={`p-3 rounded-full transition-all border border-white/10 backdrop-blur-md cursor-pointer ${cameraEnable
                            ? "bg-black/40 hover:bg-black/60 text-white"
                            : "bg-red-500 hover:bg-red-600 text-white"
                            }`}
                    >
                        {cameraEnable ? (
                            <Video className="w-4 h-4" />
                        ) : (
                            <VideoOff className="w-4 h-4" />
                        )}
                    </button>

                </div>

                {/* Hardware Diagnostics Badge */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1.5 border border-white/10">
                    <div
                        className={`w-2 h-2 rounded-full ${permissionError
                            ? "bg-red-500"
                            : "bg-[#22C55E]"
                            }`}
                    />
                    <span className="text-[10px] font-semibold text-white tracking-wider uppercase">
                        {permissionError
                            ? "Permission Error"
                            : "Hardware OK"}
                    </span>
                </div>
            </div>

            {/* Hardware Device Selection Labels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-1 py-2 text-sm">
                <div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                        Camera
                    </span>

                    <div className="flex items-center gap-2 text-stone-700 font-medium">
                        <Video className="w-4 h-4 text-[#A8441A] shrink-0" />

                        <span className="truncate">
                            {stream?.getVideoTracks()?.[0]?.label ||
                                "No camera detected"}
                        </span>
                    </div>
                </div>

                <div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">
                        Microphone
                    </span>
                    <div className="flex items-center justify-between gap-2 text-stone-700 font-medium">
                        <div className="flex items-center gap-2 min-w-0">
                            <Mic className="w-4 h-4 text-[#A8441A] shrink-0" />

                            <span className="truncate">
                                {stream?.getAudioTracks()?.[0]?.label ||
                                    "No microphone detected"}
                            </span>
                        </div>

                        <button className="flex items-center gap-1 text-[11px] font-bold text-[#A8441A] hover:underline whitespace-nowrap shrink-0">
                            Settings
                            <Settings className="w-3 h-3" />
                        </button>
                    </div>

                    {/* Audio Level Meter */}
                    <div className="mt-2 h-2 w-full bg-stone-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-green-500 transition-all duration-100"
                            style={{
                                width: `${Math.min(audioLevel, 100)}%`,
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Join Action Area */}
            <div className="flex flex-col gap-3">
                <Button className="w-full bg-[#A8441A] hover:bg-[#8C3512] text-white py-6 rounded-xl text-base font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-orange-950/10 group" onClick={handelJoinInterview}>
                    Join Interview
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <p className="text-center text-xs text-stone-400">
                    Interviewers will be notified when you join the room.
                </p>
            </div>
        </Card>
    );
}