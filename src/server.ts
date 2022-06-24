/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server, ResponseToolkit } from "@hapi/hapi";
import { config } from "./config/settings";
import { poolPromise } from "./database";
import { routes } from './routes/index'
import { redis } from "./redis";
// import Jwt from '@hapi/jwt'
import { validate } from "./plugins/tokenMiddleware";
import Jwt from "jsonwebtoken";

const init = async () => {
    const server: Server = new Server({
        host: config.get('hapi').host,
        port: config.get('hapi').port
    });
    // await server.register({
    //     plugin: require(Jwt)
    // })
    await server.register(Jwt)

    server.auth.strategy(
        'jwt', 'jwt',
        {
            key: 'test',
            validate: validate,
            verifyOptions: { algorithms: ['HS256'] }
        });

    // server.auth.strategy('my_jwt_strategy', 'jwt', {
    //     keys: 'some_shared_secret',
    //     verify: {
    //         aud: 'urn:audience:test',
    //         iss: 'urn:issuer:test',
    //         sub: false,
    //         nbf: true,
    //         exp: true,
    //         maxAgeSec: 14400,
    //         timeSkewSec: 15
    //     },
    //     validate: validate
    //     // validate: (artifacts, request, h) => {
    //     //     // let token;
    //     //     // token = request.headers.authorization
    //     //     console.log(artifacts)
    //     //     return {
    //     //         isValid: true,
    //     //         credentials: { user: artifacts.decoded.payload.user }
    //     //     };
    //     // }
    // });

    // // Set the strategy

    // server.auth.default('my_jwt_strategy');
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

    poolPromise
    redis
    await server.start();
    console.log('Server running on 6000');
    server.route(routes)

};
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init()