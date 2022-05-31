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
                    resolve(response);
                });
            }));
            return somecreate;
        });
    }
    loginUser(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            const datas = request.payload;
            console.log('datas', datas);
            const result = yield database_1.poolPromise;
            const somelogin = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                result.query("exec sploginuser  @Email='" + datas.Email + "'")
                    .then(function (datas) {
                    bcrypt.compare(request.payload.Password, datas["recordset"][0]["Password"]);
                    const accesstoken = Jwt.sign({
                        // userId: datas["recordset"][0]["userId"],
                        Email: datas["recordset"][0]["Email"],
                    }, settings_1.Config.get('jwt').jwt_key, settings_1.Config.get('jwt').expiresIn);
                    const response = h.response({
                        datas,
                        accesstoken
                    });
                    resolve(response);
                });
                // const response = h.response(datas);
                // resolve(response);
                // console.log('data', datas["recordset"][0]["Email"])
                // if (datas["recordset"][0]["Email"]) {
                // bcrypt.compare(request.payload.Password, datas["recordset"][0]["Password"])
                // }
                // console.log(datas[0]["Email"])
            }));
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
            return somelogin;
        });
    }
}
exports.users = new userData();
