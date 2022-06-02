"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const users_1 = require("../controllers/users");
const validation_1 = require("../validation");
exports.routes = [
    {
        method: "POST",
        path: '/register',
        handler: users_1.users.createUser,
        options: {
            validate: {
                payload: validation_1.userSchema,
                failAction: (request, h, error) => {
                    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                }
            }
        }
    },
    {
        method: "POST",
        path: '/login',
        handler: users_1.users.loginUser,
        options: {
            validate: {
                payload: validation_1.userSchema,
                failAction: (request, h, error) => {
                    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                }
            }
        }
    },
    {
        method: "GET",
        path: '/getuserdata',
        handler: users_1.users.getUser,
    },
];
