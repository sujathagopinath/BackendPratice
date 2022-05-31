import { Request, ResponseToolkit } from "@hapi/hapi";
import { ILoginRequest } from '../../interfaces/index';
import { poolPromise } from '../../database'
import { Config } from "../../config/settings";
const bcrypt = require('bcryptjs')
const Jwt = require('jsonwebtoken')

class userData {
    async createUser(request: ILoginRequest, h: ResponseToolkit) {
        const data = request.payload
        const hashPassword = await bcrypt.hash(data.Password, 10);
        const result = await poolPromise
        const somecreate: any = new Promise(async (resolve: any, reject: any) => {
            result.query("exec spcreateuser @Name='" + data.Name + "', @Email='" + data.Email + "', @Password='" + hashPassword + "';",
                function (err: any, data: any) {
                    if (err)
                        reject(err);
                    const response = h.response(data);
                    resolve(response);

                });
        })
        return somecreate
    }

    async loginUser(request: ILoginRequest, h: ResponseToolkit) {
        const datas = request.payload
        console.log('datas', datas)
        const result = await poolPromise
        const somelogin: any = new Promise(async (resolve: any, reject: any) => {
            result.query("exec sploginuser  @Email='" + datas.Email + "'")
                .then(function (datas: any) {
                    bcrypt.compare(
                        request.payload.Password,
                        datas["recordset"][0]["Password"]
                    );

                    const accesstoken = Jwt.sign(
                        {
                            // userId: datas["recordset"][0]["userId"],
                            Email: datas["recordset"][0]["Email"],
                        },
                        Config.get('jwt').jwt_key,
                        Config.get('jwt').expiresIn
                    );
                    const response = h.response({
                        datas,
                        accesstoken
                    });

                    resolve(response);
                })
            // const response = h.response(datas);
            // resolve(response);
            // console.log('data', datas["recordset"][0]["Email"])
            // if (datas["recordset"][0]["Email"]) {
            // bcrypt.compare(request.payload.Password, datas["recordset"][0]["Password"])
            // }
            // console.log(datas[0]["Email"])
        })
        // .then(function (datas: any) {
        //     console.log('data', datas)
        //     bcrypt.compare(
        //         request.payload.Password,
        //         datas["recordset"][0]["Password"]
        //     )
        //     const accesstoken = Jwt.sign(
        //         {
        //             userId: datas["recordset"][0]["userId"],
        //             email: datas["recordset"][0]["Email"],
        //         },
        //         Config.get('jwt').jwt_key,
        //         Config.get('jwt').expiresIn
        //     );
        //     const response = h.response({
        //         datas,
        //         accesstoken
        //     });
        //     resolve(response)
        // })
        // .catch((err: any) => {
        //     reject(err)
        // })

        // })
        return somelogin
    }
}

export const users = new userData()