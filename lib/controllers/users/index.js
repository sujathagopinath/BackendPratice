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
exports.users = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const redis_1 = require("../../redis");
const jwtValidation_1 = require("../../jwtValidation");
const index_1 = require("../../repositories/index");
class Userdata {
    createUser(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashPassword = yield bcryptjs_1.default.hash(request.payload.password, 10);
            const userData = yield index_1.db.spCreateUser(request.payload, hashPassword);
            redis_1.redis.set(userData.recordset[0].userId, JSON.stringify(userData.recordset[0]));
            return h
                .response({
                data: userData.recordset
            });
        });
    }
    loginUser(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            const userLogin = yield index_1.db.spLoginUser(request.payload.email);
            if (userLogin) {
                yield bcryptjs_1.default.compare(request.payload.password, userLogin.recordset[0].Password);
                const accesstoken = (0, jwtValidation_1.accessToken)(userLogin.recordset[0].userId);
                if (accesstoken) {
                    redis_1.redis.set(userLogin.recordset[0].userId, JSON.stringify(userLogin.recordset[0]));
                }
                return h
                    .response({
                    data: accesstoken
                });
            }
        });
    }
    getUser(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
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
            console.log('hello from getuser');
            // })
            // return somegetUser
        });
    }
}
exports.users = new Userdata();
