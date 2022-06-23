/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Redis from 'ioredis'
import { config } from "../config/settings";

const nodes: any = [];
const ipAddress = config.get('redis').ips
ipAddress.forEach((ip) => {
    const element = ip.split(':')
    nodes.push({
        port: parseInt(element[1]),
        host: element[0]
    })
})
export const redis = new Redis.Cluster(nodes);
redis.on('connect', () => console.info('Successfully connected to Redis'));
redis.on('error', (err: any) => console.log(err));