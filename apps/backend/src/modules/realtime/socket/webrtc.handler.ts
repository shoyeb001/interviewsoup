import { Server, Socket } from "socket.io";

export const registerWebRTCHandlers = (
    io: Server,
    socket: Socket
) => {
    //create offer for connection
    socket.on('offer', (payload: { target: string, caller: string, sdp: RTCSessionDescription }) => {
        io.to(payload.target).emit('offer', payload);
    });
    // create webRTC answer
    socket.on('answer', (payload: { target: string, caller: string, sdp: RTCSessionDescription }) => {
        io.to(payload.target).emit('answer', payload);
    });
    // create ice candidate
    socket.on('ice:candidate', (incoming: { target: string, candidate: RTCIceCandidateInit }) => {
        io.to(incoming.target).emit('ice:candidate', incoming);
    });
}