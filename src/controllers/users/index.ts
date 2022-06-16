import { Request, ResponseToolkit } from "@hapi/hapi";
import { IJwtPayload, ILoginRequest } from '../../interfaces/index';
import { poolPromise } from '../../database'
import { Config } from "../../config/settings";
import { redis } from "../../redis";
import { verifyToken } from "../../plugins/tokenmiddleware";
const bcrypt = require('bcryptjs')
const Jwt = require('jsonwebtoken')

class userData {
    async createUser(request: ILoginRequest, h: ResponseToolkit) {
        const data = request.payload
        const hashPassword = await bcrypt.hash(data.password, 10);
        const result = await poolPromise
        const somecreate: any = new Promise(async (resolve: any, reject: any) => {
            result.query("exec spcreateuser @name='" + data.name + "', @email='" + data.email + "', @password='" + hashPassword + "';",
                function (err: any, data: any) {
                    if (err)
                        reject(err);
                    const response = h.response(data);
                    var datas = JSON.stringify(data);
                    redis.set('createdata', datas)
                    resolve(response);

                });
        })
        return somecreate
    }

    async loginUser(request: ILoginRequest, h: ResponseToolkit) {
        const datas = request.payload
        const result = await poolPromise
        const somelogin: any = new Promise(async (resolve: any, reject: any) => {
            result.query("exec sploginuser  @Email='" + datas.email + "'",
                async (err: any, data: any) => {
                    if (err) {
                        console.log(err)
                    } else {
                        await bcrypt.compare(request.payload.password, data.recordset[0].Password)
                        const accesstoken = await Jwt.sign(
                            {
                                userId: data.recordset[0].userId,
                            },
                            Config.get('jwt').jwt_key,
                            {
                                expiresIn: Config.get('jwt').expiresIn
                            }

                        )
                        const response = h.response({
                            accesstoken
                        })
                        var datas = JSON.stringify(data);
                        redis.set('logindata', datas)
                        resolve(response)
                    }
                })
        })
        return somelogin
    }

    async getUser(request: Request, h: ResponseToolkit) {
        const result = await poolPromise
        const header = request.headers['authorization']
        let token = header.split(" ")[1];
        const verifyTokenDecode = verifyToken(token)
        const somegetUser: any = new Promise(async (resolve: any, reject: any) => {
            result.query("exec spgetuser @userId='" + verifyTokenDecode.userId + "'", function (err: any, data: any) {
                if (err)
                    reject(err);
                const response = h.response(data);
                resolve(response);

            });
        })
        return somegetUser
    }
}

export const users = new userData()

