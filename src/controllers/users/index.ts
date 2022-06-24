/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, ResponseToolkit } from "@hapi/hapi";
import bcrypt from 'bcryptjs';
import { ICreateRequest, ILoginRequest } from '../../interfaces/index';
import { redis } from "../../redis";
import { accessToken } from "../../jwtValidation";
import { db } from '../../repositories/index'

class Userdata {
    async createUser(request: ICreateRequest, h: ResponseToolkit) {
        const hashPassword = await bcrypt.hash(request.payload.password, 10);
        const userData = await db.spCreateUser(request.payload, hashPassword)
        console.log(userData.recordset[0].userId)
        redis.set(
            userData.recordset[0].userId,
            JSON.stringify(userData.recordset[0])
        );
        return h
            .response({
                data: userData.recordset
            })
    }

    async loginUser(request: ILoginRequest, h: ResponseToolkit) {
        const userLogin = await db.spLoginUser(request.payload.email)
        if (userLogin) {
            await bcrypt.compare(request.payload.password, userLogin.recordset[0].Password)
            const accesstoken = accessToken(userLogin.recordset[0].userId)
            if (accesstoken) {
                redis.set(
                    userLogin.recordset[0].userId,
                    JSON.stringify(userLogin.recordset[0])
                )
            }
            return h
                .response({
                    data: accesstoken
                })
        }
    }

    async getUser(request: Request, h: ResponseToolkit) {
        // // const result = await poolPromise
        // // const header = request.headers['authorization']
        // // let token = header.split(" ")[1];
        // // const verifyTokenDecode = verifyToken(token)
        // const somegetUser: any = new Promise(async (resolve: any, reject: any) => {
        //     // result.query("exec spgetuser @userId='" + verifyTokenDecode.userId + "'", function (err: any, data: any) {
        //     //     if (err)
        //     //         reject(err);
        //     //     const response = h.response(data);
        //     //     resolve(response);

        //     // });
            console.log('hello from getuser')
        // })
        // return somegetUser
    }
}

export const users = new Userdata()
