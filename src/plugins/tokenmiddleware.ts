import { Request, ResponseToolkit } from "@hapi/hapi";
import { Config } from '../config/settings'
import { jwtPayload } from "../interfaces";
import jwt from 'jsonwebtoken'

// export const tokenMiddleware = async (request: IAuthRequest, h: ResponseToolkit, next: any) => {
//     let token;
//     if (
//         request.headers.authorization &&
//         request.headers.authorization.startsWith("Bearer")
//     ) {
//         try {
//             let token = request.headers.authorization.split(" ")[1];
//             jwt.verify(token, Config.get('jwt').jwt_key, (error: any, decoded: any) => {
//                 if (error) {
//                     console.log(error)
//                 }
//                 request.decoded = decoded.userId
//             })
//         } catch (error: any) {
//             return h.response(error).code(404)

//         }
//     }

//     if (!token) {
//         return h.response('Not Authorised').code(401)

//     }
// };

export const verifyToken = (token: any) => {
    const decode = jwt.verify(token, Config.get('jwt').jwt_key)
    return decode as jwtPayload
}



