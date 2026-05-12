import fs from "fs";
import path from "path";

import { DatabasePool } from "./pool.ts";
export class MigrationRunner {
    private pool = DatabasePool.getPool();

    async runMigrations() {
        try {
            await this.createMigrationTable();

            const migrationPath = path.join(
                __dirname,
                "migrations"
            );

            const files = fs
                .readdirSync(migrationPath)
                .sort();

            for (const file of files) {
                const alreadyExecuted =
                    await this.isMigrationExecuted(file);

                if (alreadyExecuted) {
                    continue;
                }

                const sql = fs.readFileSync(
                    path.join(migrationPath, file),
                    "utf-8"
                );

                console.log(`Running migration: ${file}`);

                await this.pool.query(sql);

                await this.pool.query(
                    `
          INSERT INTO migrations(name)
          VALUES($1)
        `,
                    [file]
                );

                console.log(`Completed: ${file}`);
            }

            console.log("All migrations completed");
        } catch (error) {
            console.log("Migration Error:", error);
            process.exit(1);
        }
    }

    private async createMigrationTable() {
        await this.pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    }

    private async isMigrationExecuted(
        fileName: string
    ) {
        const result = await this.pool.query(
            `
      SELECT * FROM migrations
      WHERE name = $1
    `,
            [fileName]
        );

        return result.rows.length > 0;
    }
}