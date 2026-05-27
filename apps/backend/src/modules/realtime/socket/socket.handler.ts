import { Server, Socket } from "socket.io";

import { registerRoomHandlers } from "./room.handler.ts";
import { registerEditorHandlers } from "./editor.handler.ts";
import { registerWebRTCHandlers } from "./webrtc.handler.ts";

export const registerSocketHandlers = (
    io: Server,
    socket: Socket
) => {

    registerRoomHandlers(io, socket);

    registerEditorHandlers(io, socket);

    registerWebRTCHandlers(io, socket);
};