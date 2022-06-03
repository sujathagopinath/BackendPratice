import * as Hapi from '@hapi/hapi'

export interface ILoginRequest extends Hapi.Request {
    payload: {
        Name: String,
        Email: String
        Password: String,

    }
}

export type jwtPayload = {
    userId: number,

};
