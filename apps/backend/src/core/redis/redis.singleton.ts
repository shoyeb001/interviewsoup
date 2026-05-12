import Redis from 'redis';

export class RedisSingleton {
    private static client: any;
    public static async getInstance() {
        if (!this.client) {
            this.client = Redis.createClient({
                url: process.env.REDIS_URL || 'redis://localhost:6379'
            });
            this.client.on("error", (error: Error) => {
                console.log("Redis Error:", error);
            });
            await this.client.connect();
        }
        return this.client;
    }

}