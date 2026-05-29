import type { Server, Socket } from "socket.io";
export const registerRoomHandlers = (
    io: Server,
    socket: Socket
) => {
    socket.on(
        "room:join",
        ({ roomId }: { roomId: string }) => {
            socket.join(roomId);
            console.log(
                "Joining Room:",
                roomId
            );
            // io.to(roomId).emit(
            //     "room:user-joined",
            // )
            const room =
                io.sockets.adapter.rooms.get(roomId);

            const numberOfUsers =
                room?.size || 0;

            /*
            ONLY notify existing user
            when second user joins
            */
            socket.to(roomId).emit("user:joined", socket.id)
        }
    );

    socket.on('room:leave', ({ roomId }: { roomId: string }) => {
        socket.to(roomId).emit('user:left', socket.id);
        socket.leave(roomId);
    })

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`)
    })

}