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
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = require("@hapi/hapi");
const settings_1 = require("./config/settings");
const database_1 = require("./database");
const index_1 = require("./routes/index");
const redis_1 = require("./redis");
// import { validate } from "./plugins/tokenMiddleware"
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = new hapi_1.Server({
        host: settings_1.config.get('hapi').host,
        port: settings_1.config.get('hapi').port
    });
    // await server.register({
    //     plugin: require(Jwt)
    // })
    // function validate(req: any, res: ResponseToolkit) {
    //     // var token = req.headers.authorization;
    //     // console.log(token)
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
