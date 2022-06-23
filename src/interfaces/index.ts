import { Request } from "@hapi/hapi";

export interface ICreateRequest extends Request {
    payload: {
        name: string,
        email: string
        password: string,

    }
}
export interface ILoginRequest extends Request {
    payload: {
        email: string
        password: string,

    }
}