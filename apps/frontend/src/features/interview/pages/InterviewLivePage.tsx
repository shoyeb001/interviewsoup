import React, { useEffect, useRef, useState } from "react";
import InterviewHeader from "../components/InterviewHeader";
import EditorWorkspace from "../components/EditorWorkspace";
import Sidebar from "../components/InterviewSidebar";
import { socketService } from "../services/socket.service";
import { useParams } from "react-router";
import type { Socket } from "socket.io-client";

export default function InterviewLivePage() {
    const socket: Socket = socketService.getSocket();
    const ICE_SERVERS = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
        ]
    }
    const { roomId } = useParams();
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const peerConnectionRef = useRef<RTCPeerConnection>(null);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const icetCandidateQueueRef = useRef<RTCIceCandidateInit[]>([]);
    // Toggle controls
    const toggleMic = () => {
        const stream = localVideoRef.current?.srcObject as MediaStream;
        const audioTrack = stream?.getAudioTracks()[0];
        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled;
            setIsMicOn(audioTrack.enabled);
        }
    };

    const toggleCamera = () => {
        const stream = localVideoRef.current?.srcObject as MediaStream;
        const videoTrack = stream?.getVideoTracks()[0];
        if (videoTrack) {
            videoTrack.enabled = !videoTrack.enabled;
            setIsCameraOn(videoTrack.enabled);
        }
    };
    const processQueue = async () => {
        const pc = peerConnectionRef.current;
        if (!pc) return;

        while (icetCandidateQueueRef.current.length > 0) {
            const candidate = icetCandidateQueueRef.current.shift();
            if (candidate) {
                try {
                    await pc.addIceCandidate(new RTCIceCandidate(candidate));
                    console.log("Queued ICE candidate processed successfully");
                } catch (err) {
                    console.error("Error processing queued ICE candidate", err);
                }
            }
        }
    };

    const createPeerConnection = (targetUserId: string, localStream: MediaStream) => {
        const peerConnection = new RTCPeerConnection(ICE_SERVERS);
        localStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, localStream);
        });
        //listen remote tracks
        peerConnection.ontrack = (event) => {
            if (remoteVideoRef.current && event.streams[0]) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        //send ICE candidates
        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('ice:candidate', {
                    target: targetUserId,
                    candidate: event.candidate
                })
            }
        }
        return peerConnection;
    }
    useEffect(() => {

        //get local media stream
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
            // tell the server we arrived in the room
            socket.emit('room:join', { roomId });
            //handel when a new user join room
            socket.on('user:joined', async (newUserId: string) => {
                const peerConnection = createPeerConnection(newUserId, stream);
                peerConnectionRef.current = peerConnection;
                // Create an offer and send it to the new user
                const offer = await peerConnection.createOffer();
                await peerConnection.setLocalDescription(offer);
                console.log("user joined room")
                socket.emit('offer', {
                    target: newUserId,
                    caller: socket.id,
                    sdp: peerConnection.localDescription,
                });
                console.log("offer send")
            });
            //handel receiving offer
            socket.on('offer', async (payload: {
                caller: string,
                sdp: RTCSessionDescriptionInit
            }) => {
                const peerConnection = createPeerConnection(payload.caller, stream);
                console.log("offer come", payload);
                peerConnectionRef.current = peerConnection;
                await peerConnection.setRemoteDescription(new RTCSessionDescription(payload.sdp));
                const answer = await peerConnection.createAnswer();
                await peerConnection.setLocalDescription(answer);
                socket.emit('answer', {
                    target: payload.caller,
                    caller: socket.id,
                    sdp: peerConnection.localDescription
                })
            });

            socket.on('answer', async (payload: { sdp: RTCSessionDescriptionInit }) => {
                const peerConnection = peerConnectionRef.current;
                if (peerConnection) {
                    await peerConnection.setRemoteDescription(new RTCSessionDescription(payload.sdp));

                }
            });
            socket.on('ice:candidate', async (incoming: { candidate: RTCIceCandidateInit }) => {
                const peerConnection = peerConnectionRef.current;
                if (peerConnection) {
                    await peerConnection.addIceCandidate(new RTCIceCandidate(incoming.candidate));
                    console.log("ice candidate works")
                }
            });
        })

        // socket.emit("room:join", {
        //     roomId
        // });

        return () => {
            socket.off('room:joined');
            socket.off('user:joined');
            socket.off('answer');
            socket.off('ice:candidate');
            socket.off('offer');
            peerConnectionRef.current?.close()
        }

    }, [roomId]);
    return (
        <div className="flex flex-col h-screen bg-[#FCF8F5] text-slate-900 font-sans overflow-hidden">
            <InterviewHeader />
            <main className="flex flex-1 overflow-hidden p-4 gap-4">
                <section className="flex-1 flex flex-col min-w-0">
                    <EditorWorkspace />
                </section>
                <aside className="w-96 flex flex-col shrink-0 overflow-y-auto">
                    <Sidebar roomId={roomId || ""} remoteVideo={remoteVideoRef} localVideo={localVideoRef} />
                </aside>
            </main>
        </div>
    );
}