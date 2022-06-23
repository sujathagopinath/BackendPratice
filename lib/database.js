"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.poolPromise = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mssql_1 = __importDefault(require("mssql"));
const settings_1 = require("./config/settings");
exports.poolPromise = new mssql_1.default.ConnectionPool(settings_1.config.get("db"))
    .connect()
    .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
})
    .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));
