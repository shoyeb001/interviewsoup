import { Server, Socket } from "socket.io";

export const registerEditorHandlers = (io: Server, socket: Socket) => {
    socket.on(
        "editor:code-change",
        ({ roomId, code }: { roomId: string, code: string }) => {
            io.to(roomId).emit(
                "editor:code-update",
                code
            )
        }
    )
}