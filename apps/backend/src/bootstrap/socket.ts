import { Server } from "socket.io";
import { registerSocketHandlers } from "../modules/realtime/socket/socket.handler.ts";
export let io: Server;

export const initializeSocket = (
    httpServer: any
) => {
    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        registerSocketHandlers(io, socket)
    })
}