import { Pool } from "pg";

export class DatabasePool {
    private static pool: Pool;
    public static getPool(): Pool {
        console.log("Database", process.env.DB_Host)
        if (!DatabasePool.pool) {
            DatabasePool.pool = new Pool({
                host: process.env.DB_Host,
                port: Number(process.env.DB_PORT),
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            });
        }

        return DatabasePool.pool;
    }
}
