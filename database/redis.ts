import config from "@/lib/config";
import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: config.env.upstashUrl,
    token: config.env.upstashToken
})

export default redis