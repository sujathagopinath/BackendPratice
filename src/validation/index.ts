/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, ResponseToolkit } from "@hapi/hapi";
import Joi from "joi";

export const registerSchema = Joi.object({
    name: Joi.string().min(4).max(10).required(),
    email: Joi.string().min(5).max(30).email().required(),
    password: Joi.string()
        .regex(
            /^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9]).{8}$/
        )
        .required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().min(5).max(30).email().required(),
    password: Joi.string()
        .regex(
            /^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9]).{8}$/
        )
        .required(),
});

export const errorValidation = (request: Request, h: ResponseToolkit, error: any) => {
    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
}