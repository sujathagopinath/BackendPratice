"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const Joi = require("joi");
exports.userSchema = Joi.object({
    Name: Joi.string().min(4).max(10).required(),
    Email: Joi.string().min(5).max(30).email().required(),
    Password: Joi.string()
        .regex(/^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9]).{8}$/)
        .required(),
});
