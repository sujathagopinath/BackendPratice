/* eslint-disable @typescript-eslint/no-explicit-any */
import sqlDb from "mssql";
import { config } from './config/settings'

export const poolPromise = new sqlDb.ConnectionPool(config.get("db"))
    .connect()
    .then((pool: any) => {
        console.log("Connected to MSSQL");
        return pool;
    })
    .catch((err: any) => console.log("Database Connection Failed! Bad Config: ", err));

