/* eslint-disable @typescript-eslint/no-explicit-any */
import { poolPromise } from "../database"

export class Dbservice {
    dbConnect: any
    constructor() {
        (async () => {
            this.dbConnect = await poolPromise
        })();
    }
    async spCreateUser(createUserInfo: any, hashPassword: string) {
        return await this.dbConnect.query("exec spcreateuser @name='" +
            createUserInfo.name + "', @email='" + createUserInfo.email + "', @password='" + hashPassword + "';")
    }

    async spLoginUser(email: string) {
        return await this.dbConnect.query("exec sploginuser  @Email='" + email + "';")
    }

    async spgetUserData(userId: number) {
        return await this.dbConnect.query("exec spgetuser @id='" + userId + "'")
    }
}

export const db = new Dbservice()