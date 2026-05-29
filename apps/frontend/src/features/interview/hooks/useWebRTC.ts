// // src/features/interview/hooks/useWebRTC.ts

// import {
//     useEffect,
//     useRef,
//     useState,
// } from "react";

// import { socketService } from "../services/socket.service";

// export const useWebRTC = (
//     roomId: string
// ) => {

//     /*
//     =================================
//     SOCKET
//     =================================
//     */

//     const socket =
//         socketService.getSocket();

//     /*
//     =================================
//     VIDEO REFS
//     =================================
//     */

//     const localVideoRef =
//         useRef<HTMLVideoElement>(null);

//     const remoteVideoRef =
//         useRef<HTMLVideoElement>(null);

//     /*
//     =================================
//     PEER CONNECTION
//     =================================
//     */

//     const peerConnectionRef =
//         useRef<RTCPeerConnection | null>(
//             null
//         );

//     /*
//     =================================
//     LOCAL STREAM
//     =================================
//     */

//     const [localStream, setLocalStream] =
//         useState<MediaStream | null>(
//             null
//         );

//     /*
//     =================================
//     INITIALIZE WEBRTC
//     =================================
//     */

//     useEffect(() => {

//         const init = async () => {

//             try {

//                 /*
//                 ==========================
//                 CREATE PEER CONNECTION
//                 ==========================
//                 */

//                 peerConnectionRef.current =
//                     new RTCPeerConnection({

//                         iceServers: [
//                             {
//                                 urls:
//                                     "stun:stun.l.google.com:19302",
//                             },
//                         ],

//                     });

//                 const peer =
//                     peerConnectionRef.current;

//                 /*
//                 ==========================
//                 GET USER MEDIA
//                 ==========================
//                 */

//                 const stream =
//                     await navigator
//                         .mediaDevices
//                         .getUserMedia({
//                             video: true,
//                             audio: true,
//                         });

//                 setLocalStream(stream);

//                 /*
//                 ==========================
//                 SET LOCAL VIDEO
//                 ==========================
//                 */

//                 if (
//                     localVideoRef.current
//                 ) {

//                     localVideoRef.current.srcObject =
//                         stream;

//                 }

//                 /*
//                 ==========================
//                 ADD TRACKS
//                 ==========================
//                 */

//                 stream.getTracks().forEach(
//                     (track) => {

//                         peer.addTrack(
//                             track,
//                             stream
//                         );

//                     }
//                 );

//                 /*
//                 ==========================
//                 REMOTE TRACK
//                 ==========================
//                 */

//                 peer.ontrack = (
//                     event
//                 ) => {

//                     console.log(
//                         "REMOTE TRACK RECEIVED"
//                     );

//                     const remoteStream =
//                         event.streams[0];

//                     if (
//                         remoteVideoRef.current
//                     ) {

//                         remoteVideoRef.current.srcObject =
//                             remoteStream;

//                     }

//                 };

//                 /*
//                 ==========================
//                 ICE CANDIDATE
//                 ==========================
//                 */

//                 peer.onicecandidate =
//                     (event) => {

//                         if (
//                             event.candidate
//                         ) {

//                             console.log(
//                                 "Sending ICE Candidate"
//                             );

//                             socket.emit(
//                                 "webrtc:ice-candidate",
//                                 {
//                                     roomId,
//                                     candidate:
//                                         event.candidate,
//                                 }
//                             );

//                         }

//                     };

//             } catch (error) {

//                 console.log(
//                     "WebRTC Init Error:",
//                     error
//                 );

//             }

//         };

//         init();

//     }, [roomId]);

//     /*
//     =================================
//     CREATE OFFER
//     =================================
//     */

//     useEffect(() => {

//         socket.on(
//             "room:user-joined",

//             async () => {

//                 try {

//                     console.log(
//                         "Creating Offer"
//                     );

//                     const peer =
//                         peerConnectionRef.current;

//                     if (!peer) return;

//                     const offer =
//                         await peer.createOffer();

//                     await peer.setLocalDescription(
//                         offer
//                     );

//                     socket.emit(
//                         "webrtc:offer",
//                         {
//                             roomId,
//                             offer,
//                         }
//                     );

//                 } catch (error) {

//                     console.log(
//                         "Offer Creation Error:",
//                         error
//                     );

//                 }

//             }
//         );

//         return () => {

//             socket.off(
//                 "room:user-joined"
//             );

//         };

//     }, [roomId]);

//     /*
//     =================================
//     RECEIVE OFFER
//     =================================
//     */

//     useEffect(() => {

//         socket.on(
//             "webrtc:offer",

//             async (
//                 offer: RTCSessionDescriptionInit
//             ) => {

//                 try {

//                     console.log(
//                         "Offer Received"
//                     );

//                     const peer =
//                         peerConnectionRef.current;

//                     if (!peer) return;

//                     await peer.setRemoteDescription(
//                         new RTCSessionDescription(
//                             offer
//                         )
//                     );

//                     const answer =
//                         await peer.createAnswer();

//                     await peer.setLocalDescription(
//                         answer
//                     );

//                     socket.emit(
//                         "webrtc:answer",
//                         {
//                             roomId,
//                             answer,
//                         }
//                     );

//                 } catch (error) {

//                     console.log(
//                         "Receive Offer Error:",
//                         error
//                     );

//                 }

//             }
//         );

//         return () => {

//             socket.off(
//                 "webrtc:offer"
//             );

//         };

//     }, [roomId]);

//     /*
//     =================================
//     RECEIVE ANSWER
//     =================================
//     */

//     useEffect(() => {

//         socket.on(
//             "webrtc:answer",

//             async (
//                 answer: RTCSessionDescriptionInit
//             ) => {

//                 try {

//                     console.log(
//                         "Answer Received"
//                     );

//                     const peer =
//                         peerConnectionRef.current;

//                     if (!peer) return;

//                     await peer.setRemoteDescription(
//                         new RTCSessionDescription(
//                             answer
//                         )
//                     );

//                 } catch (error) {

//                     console.log(
//                         "Receive Answer Error:",
//                         error
//                     );

//                 }

//             }
//         );

//         return () => {

//             socket.off(
//                 "webrtc:answer"
//             );

//         };

//     }, []);

//     /*
//     =================================
//     RECEIVE ICE CANDIDATE
//     =================================
//     */

//     useEffect(() => {

//         socket.on(
//             "webrtc:ice-candidate",

//             async (
//                 candidate: RTCIceCandidateInit
//             ) => {

//                 try {

//                     console.log(
//                         "ICE Candidate Received"
//                     );

//                     const peer =
//                         peerConnectionRef.current;

//                     if (!peer) return;

//                     await peer.addIceCandidate(
//                         new RTCIceCandidate(
//                             candidate
//                         )
//                     );

//                 } catch (error) {

//                     console.log(
//                         "ICE Candidate Error:",
//                         error
//                     );

//                 }

//             }
//         );

//         return () => {

//             socket.off(
//                 "webrtc:ice-candidate"
//             );

//         };

//     }, []);

//     /*
//     =================================
//     CLEANUP
//     =================================
//     */

//     useEffect(() => {

//         return () => {

//             peerConnectionRef.current?.close();

//             localStream?.getTracks().forEach(
//                 (track) => track.stop()
//             );

//         };

//     }, [localStream]);

//     return {
//         localVideoRef,
//         remoteVideoRef,
//     };
// };