"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorValidation = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object({
    name: joi_1.default.string().min(4).max(10).required(),
    email: joi_1.default.string().min(5).max(30).email().required(),
    password: joi_1.default.string()
        .regex(/^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9]).{8}$/)
        .required(),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().min(5).max(30).email().required(),
    password: joi_1.default.string()
        .regex(/^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9]).{8}$/)
        .required(),
});
const errorValidation = (request, h, error) => {
    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
};
exports.errorValidation = errorValidation;
