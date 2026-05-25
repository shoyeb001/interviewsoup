import dotenv from "dotenv";
dotenv.config();

import app from "./app.ts";

import { MigrationRunner } from "../core/database/migration.runner.ts";
import { createServer } from "http";
import { initializeSocket } from "./socket.ts";
const PORT = process.env.PORT || 5000;
export const server = createServer(app);


async function startServer() {
    try {
        const migrationRunner =
            new MigrationRunner();

        await migrationRunner.runMigrations();
        initializeSocket(server)

        // app.listen(PORT, () => {
        //     console.log(
        //         `Server running on ${PORT}`
        //     );
        // });
        server.listen(PORT, () => {
            console.log(`Server is running ${PORT}`)
        });
    } catch (error) {
        console.log("Server Startup Error:", error);
    }
}

startServer();