/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseToolkit } from "@hapi/hapi";
import { config } from '../config/settings'
import jwt from 'jsonwebtoken'

export const validate = async (request: any, h: ResponseToolkit) => {
    let token;
    if (
        request.headers.authorization &&
        request.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = request.headers.authorization.split(" ")[1];
            console.log(token)
            jwt.verify(token, config.get('jwt').jwtkey, (error: any, decoded: any) => {
                if (error) {
                    console.log(error)
                }
                request.decoded = decoded.userId
                console.log(request.decoded)
            })
        } catch (error: any) {
            return h.response(error).code(404)

        }
    }

    if (!token) {
        return h.response('Not Authorised').code(401)

    }
};

// export const verifyToken = (token: any) => {
//     const decode = jwt.verify(token, Config.get('jwt').jwt_key)
//     return decode as IJwtPayload
// }



