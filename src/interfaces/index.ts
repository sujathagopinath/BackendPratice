import { Request, ResponseToolkit } from "@hapi/hapi";

export interface ILoginRequest extends Request {
    payload: {
        name: String,
        email: String
        password: String,

    }
}

export interface IJwtPayload {
    userId: number,

};
