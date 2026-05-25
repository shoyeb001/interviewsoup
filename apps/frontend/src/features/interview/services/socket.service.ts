import { io, Socket } from "socket.io-client";

class SocketService {
    private socket: Socket;
    constructor() {
        this.socket = io(
            "http://localhost:5000",
            {
                transports: ["websocket"]
            }
        )
    }
    public getSocket() {
        return this.socket;
    }
}

export const socketService = new SocketService();