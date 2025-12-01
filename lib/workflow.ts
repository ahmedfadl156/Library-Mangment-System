import { Client } from "@upstash/workflow";
import config from "./config";


const client = new Client({
    url: config.env.qstashUrl,
    token: config.env.qstashToken,
})