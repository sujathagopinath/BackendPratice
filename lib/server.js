"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const hapi_1 = require("@hapi/hapi");
const settings_1 = require("./config/settings");
const database_1 = require("./database");
const index_1 = require("./routes/index");
const redis_1 = require("./redis");
const jwt_1 = __importDefault(require("@hapi/jwt"));
const tokenMiddleware_1 = require("./plugins/tokenMiddleware");
// import { validate } from "./plugins/tokenMiddleware"
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = new hapi_1.Server({
        host: settings_1.config.get('hapi').host,
        port: settings_1.config.get('hapi').port
    });
    // await server.register({
    //     plugin: require(Jwt)
    // })
    yield server.register(jwt_1.default);
    server.auth.strategy('my_jwt_strategy', 'jwt', {
        keys: 'some_shared_secret',
        verify: {
            aud: 'urn:audience:test',
            iss: 'urn:issuer:test',
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 14400,
            timeSkewSec: 15
        },
        validate: tokenMiddleware_1.validate
        // validate: (artifacts, request, h) => {
        //     // let token;
        //     // token = request.headers.authorization
        //     console.log(artifacts)
        //     return {
        //         isValid: true,
        //         credentials: { user: artifacts.decoded.payload.user }
        //     };
        // }
    });
    // Set the strategy
    server.auth.default('my_jwt_strategy');
    // function validate(request: any, h: ResponseToolkit) {
    //     const token = request.headers.authorization;
    //     console.log(token)
    //     console.log('validate')
    // }
    // server.auth.strategy('jwt', 'jwt', {
    //     key: 'yourkey',
    //     validate,
    //     verifyOptions: { algorithms: ['HS256'] }
    // })
    // server.auth.default('jwt')
    database_1.poolPromise;
    redis_1.redis;
    yield server.start();
    console.log('Server running on 6000');
    server.route(index_1.routes);
});
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();
