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
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = new hapi_1.Server({
        host: settings_1.Config.get('hapi').host,
        port: settings_1.Config.get('hapi').port
    });
    yield server.register([]);
    database_1.poolPromise;
    yield server.start();
    console.log('Server running on 6000');
    server.route(index_1.routes);
});
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();
