import { Server, Socket } from "socket.io";

export const registerWebRTCHandlers = (
    io: Server,
    socket: Socket
) => {
    //create offer for connection
    socket.on(
        "webrtc:offer",
        ({ roomId, offer }: any) => {
            io.to(roomId).emit(
                "webrtc:offer",
                offer
            );
            console.log("offer created")
        }
    )

    socket.on(
        "webrtc:answer",
        ({ roomId, answer }: any) => {
            io.to(roomId).emit(
                "webrtc:answer",
                answer
            )
        }
    );

    //ice candidate
    socket.on(
        "webrtc:ice-candidate",

        ({ roomId, candidate }) => {
            
            io.to(roomId).emit(
                "webrtc:ice-candidate",
                candidate
            );

        }
    );
}