import { DatabasePool } from "../../../core/database/pool.ts";

export class AuthRepository {
    private pool = DatabasePool.getPool();

    async createUser(
        name: string,
        email: string,
        password: string,
        role: string
    ) {
        const query = `
      INSERT INTO users(name, email, password, role)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `;

        const values = [name, email, password, role];
        const result = await this.pool.query(query, values);
        return result.rows[0];
    }

    async findUserByEmail(email: string) {
        const query = `
      SELECT * FROM users
      WHERE email = $1
    `;

        const result = await this.pool.query(query, [email]);

        return result.rows[0];
    }

    async verifyUser(email: string) {
        const query = `
      UPDATE users
      SET is_verified = true
      WHERE email = $1
    `;

        await this.pool.query(query, [email]);
    }
}