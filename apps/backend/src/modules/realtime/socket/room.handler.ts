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

            if (numberOfUsers === 2) {

                socket.to(roomId).emit(
                    "room:user-joined"
                );

            }
        }
    );

}