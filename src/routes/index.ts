import { Request, ResponseToolkit } from "@hapi/hapi";
import { users } from "../controllers/users"
import { userSchema } from "../validation"
export const routes = [
    {
        method: "POST",
        path: '/register',
        handler: users.createUser,
        options: {
            validate: {
                payload: userSchema,
                failAction: (request: Request, h: ResponseToolkit, error: any) => {
                    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                }
            }
        }

    },

    {
        method: "POST",
        path: '/login',
        handler: users.loginUser,
        options: {
            validate: {
                payload: userSchema,
                failAction: (request: Request, h: ResponseToolkit, error: any) => {
                    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                }
            }
        }

    },



]