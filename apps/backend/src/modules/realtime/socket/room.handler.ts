import type { Server } from "socket.io";

export const registerRoomHandlers = (
    io: Server,
    socket: any
) => {
    socket.on(
        "room:join",
        ({ roomId }: { roomId: string }) => {
            socket.join(roomId);
            console.log(
                "Joining Room:",
                roomId
            );
            io.to(roomId).emit(
                "room:user-joined",
            )
        }
    )
}