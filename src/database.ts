const sqlDb = require("mssql");
import { Config } from './config/settings'

export const poolPromise = new sqlDb.ConnectionPool(Config.get("db"))
    .connect()
    .then((pool: any) => {
        console.log("Connected to MSSQL");
        return pool;
    })
    .catch((err: any) => console.log("Database Connection Failed! Bad Config: ", err));

