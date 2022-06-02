const convict = require('convict');
export const Config = convict({
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
            trustServerCertificate:
            {
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
        host: {
            doc: "redis_host",
            format: String,
            default: 'localhost'
        },
        port: {
            doc: "redis_port",
            format: Number,
            default: 2001
        }
    },
    jwt: {
        jwt_key: {
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

var env = Config.get('env');
Config.loadFile('./src/config/' + env + '.json');
Config.validate({ allowed: 'strict' });