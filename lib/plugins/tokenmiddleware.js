"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenMiddleware = void 0;
const settings_1 = require("../config/settings");
const jwt = require("jsonwebtoken");
const tokenMiddleware = (request, h, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (request.headers.authorization &&
        request.headers.authorization.startsWith("Bearer")) {
        try {
            let token = request.headers.authorization.split(" ")[1];
            const payload = jwt.verify(token, settings_1.Config.get('jwt').jwt_key);
            // request.userId = payload
            console.log(payload.userId);
            // (error: any, decoded: any) => {
            // if (error) {
            //     return h.response(error).code(404)
            // }
            // request.decoded = decoded.userId;
            // });
        }
        catch (error) {
            return h.response(error).code(404);
        }
    }
    if (!token) {
        return h.response('Not Authorised').code(401);
    }
});
exports.tokenMiddleware = tokenMiddleware;
// export const tokenmiddleware = async (token: any) => {
//     const payload = jwt.verify(token, Config.get('jwt').jwt_key)
//     return payload
// }
