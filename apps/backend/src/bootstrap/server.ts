import dotenv from "dotenv";
dotenv.config();

import app from "./app.ts";

import { MigrationRunner } from "../core/database/migration.runner.ts";
const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        const migrationRunner =
            new MigrationRunner();

        await migrationRunner.runMigrations();

        app.listen(PORT, () => {
            console.log(
                `Server running on ${PORT}`
            );
        });
    } catch (error) {
        console.log("Server Startup Error:", error);
    }
}

startServer();