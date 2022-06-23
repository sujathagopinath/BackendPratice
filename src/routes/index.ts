import { users } from "../controllers/users"
import { registerSchema, loginSchema, errorValidation } from "../validation"

export const routes = [
    {
        method: "POST",
        path: '/create',
        handler: users.createUser,
        config: {
            validate: {
                payload: registerSchema,
                failAction: errorValidation,
            },
            auth: false
        },
    },
    {
        method: "POST",
        path: '/login',
        handler: users.loginUser,
        config: {
            validate: {
                payload: loginSchema,
                failAction: errorValidation,
            },
            auth: false
        },
    },
    {
        method: "GET",
        path: '/get_user_data',
        handler: users.getUser,
    },
]