import { Server } from "@hapi/hapi";
import { config } from "./config/settings";
import { poolPromise } from "./database";
import { routes } from './routes/index'
import { redis } from "./redis";
// import { validate } from "./plugins/tokenMiddleware"

const init = async () => {
    const server: Server = new Server({
        host: config.get('hapi').host,
        port: config.get('hapi').port
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
init();