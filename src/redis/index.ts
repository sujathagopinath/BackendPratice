import * as Redis from 'ioredis'
import { Config } from "../config/settings";

const ports = [1, 2, 3];
const nodes: any = [];

ports.forEach((port) => {
    nodes.push({
        port: 7000 + port,
        host: Config.get('redis').host

    });
});

export const redis = new Redis.Cluster(nodes);

redis.on('connect', () => console.info('Successfully connected to Redis'));
redis.on('error', (err: any) => console.log(err));



