"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const convict_1 = __importDefault(require("convict"));
exports.config = (0, convict_1.default)({
    env: {
        doc: "The application environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV"
    },
    db: {
        server: {
            doc: "Database host",
            format: '*',
            default: 'localhost',
            env: 'SERVER'
        },
        port: {
            doc: 'DB port',
            format: Number,
            default: 1433,
            env: 'PORT'
        },
        database: {
            doc: "Database name",
            format: String,
            default: 'backendhapi'
        },
        user: {
            doc: "User name",
            format: String,
            default: 'sa'
        },
        password: {
            doc: "Database password",
            format: String,
            default: 'A',
            env: 'PASSWORD'
        },
        driver: {
            doc: "Driver",
            format: String,
            default: 'tedious'
        },
        options: {
            trustServerCertificate: {
                doc: 'options',
                format: Boolean,
                default: true
            }
        }
    },
    hapi: {
        host: {
            doc: "hapi_host",
            format: String,
            default: 'localhost'
        },
        port: {
            doc: "hapi_port",
            format: Number,
            default: 1000
        }
    },
    redis: {
        ips: {
            doc: "redis_ip",
            format: Array,
            default: ['127.0.0.1:7004'],
        }
    },
    jwt: {
        jwtkey: {
            doc: "secret data",
            format: String,
            default: 'SECRET'
        },
        expiresIn: {
            doc: "Expires In",
            format: String,
            default: '10m'
        }
    }
});
exports.config.loadFile('./src/config/' + exports.config.get('env') + '.json');
