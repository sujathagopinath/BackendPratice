import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import { Config } from "./config/settings";
import { poolPromise } from "./database";
import { routes } from './routes/index'

const init = async () => {
    const server: Server = new Server({
        host: Config.get('hapi').host,
        port: Config.get('hapi').port
    });

    await server.register([
    ])

    poolPromise
    await server.start();
    console.log('Server running on 6000');
    server.route(routes)

};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();

