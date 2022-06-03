"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const settings_1 = require("../config/settings");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
const verifyToken = (token) => {
    const decode = jsonwebtoken_1.default.verify(token, settings_1.Config.get('jwt').jwt_key);
    return decode;
};
exports.verifyToken = verifyToken;
