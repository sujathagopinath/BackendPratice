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
exports.users = void 0;
const database_1 = require("../../database");
const settings_1 = require("../../config/settings");
const redis_1 = require("../../redis");
const tokenmiddleware_1 = require("../../plugins/tokenmiddleware");
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
class userData {
    createUser(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = request.payload;
            const hashPassword = yield bcrypt.hash(data.Password, 10);
            const result = yield database_1.poolPromise;
            const somecreate = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                result.query("exec spcreateuser @Name='" + data.Name + "', @Email='" + data.Email + "', @Password='" + hashPassword + "';", function (err, data) {
                    if (err)
                        reject(err);
                    const response = h.response(data);
                    var datas = JSON.stringify(data);
                    redis_1.redis.set('createdata', datas);
                    resolve(response);
                });
            }));
            return somecreate;
        });
    }
    loginUser(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            const datas = request.payload;
            const result = yield database_1.poolPromise;
            const somelogin = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                result.query("exec sploginuser  @Email='" + datas.Email + "'", (err, data) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        yield bcrypt.compare(request.payload.Password, data.recordset[0].Password);
                        const accesstoken = yield Jwt.sign({
                            userId: data.recordset[0].userId,
                        }, settings_1.Config.get('jwt').jwt_key, {
                            expiresIn: settings_1.Config.get('jwt').expiresIn
                        });
                        const response = h.response({
                            accesstoken
                        });
                        var datas = JSON.stringify(data);
                        redis_1.redis.set('logindata', datas);
                        resolve(response);
                    }
                }));
            }));
            return somelogin;
        });
    }
    getUser(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.poolPromise;
            const header = request.headers['authorization'];
            let token = header.split(" ")[1];
            const verifyTokenDecode = (0, tokenmiddleware_1.verifyToken)(token);
            const somegetUser = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                result.query("exec spgetuser @userId='" + verifyTokenDecode.userId + "'", function (err, data) {
                    if (err)
                        reject(err);
                    const response = h.response(data);
                    resolve(response);
                });
            }));
            return somegetUser;
        });
    }
}
exports.users = new userData();
