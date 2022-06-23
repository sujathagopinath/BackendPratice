"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const users_1 = require("../controllers/users");
const validation_1 = require("../validation");
exports.routes = [
    {
        method: "POST",
        path: '/create',
        handler: users_1.users.createUser,
        config: {
            validate: {
                payload: validation_1.registerSchema,
                failAction: validation_1.errorValidation,
            },
            auth: false
        },
    },
    {
        method: "POST",
        path: '/login',
        handler: users_1.users.loginUser,
        config: {
            validate: {
                payload: validation_1.loginSchema,
                failAction: validation_1.errorValidation,
            },
            auth: false
        },
    },
    {
        method: "GET",
        path: '/get_user_data',
        handler: users_1.users.getUser,
    },
];
