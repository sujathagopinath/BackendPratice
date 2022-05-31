"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.poolPromise = void 0;
const sqlDb = require("mssql");
const settings_1 = require("./config/settings");
exports.poolPromise = new sqlDb.ConnectionPool(settings_1.Config.get("db"))
    .connect()
    .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
})
    .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));
