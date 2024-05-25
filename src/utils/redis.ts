import { createClient } from "redis";

// console.log(process.env.REDIS_URL);
const redisClient = createClient({ url: 'redis://127.0.0.1:6379' });

export default redisClient;