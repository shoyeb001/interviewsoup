import { DatabasePool } from "../../../core/database/pool.ts";

export class UserRepository{
    private pool = DatabasePool.getPool();

    async getUserById(id:number){
        const query = `
        SELECT name, email, role, is_verified FROM users Where id = $1`;
        const result = await this.pool.query(query, [id]);
        return result.rows[0];
    }
}