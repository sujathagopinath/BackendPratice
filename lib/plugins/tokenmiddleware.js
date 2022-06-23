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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const settings_1 = require("../config/settings");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validate = (request, h) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (request.headers.authorization &&
        request.headers.authorization.startsWith("Bearer")) {
        try {
            token = request.headers.authorization.split(" ")[1];
            console.log(token);
            jsonwebtoken_1.default.verify(token, settings_1.config.get('jwt').jwtkey, (error, decoded) => {
                if (error) {
                    console.log(error);
                }
                request.decoded = decoded.userId;
                console.log(request.decoded);
            });
        }
        catch (error) {
            return h.response(error).code(404);
        }
    }
    if (!token) {
        return h.response('Not Authorised').code(401);
    }
});
exports.validate = validate;
// export const verifyToken = (token: any) => {
//     const decode = jwt.verify(token, Config.get('jwt').jwt_key)
//     return decode as IJwtPayload
// }
