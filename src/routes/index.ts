import { users } from "../controllers/users"
import { registerSchema, loginSchema, errorValidation } from "../validation"

export const routes = [
    {
        method: "POST",
        path: '/register',
        handler: users.createUser,
        options: {
            validate: {
                payload: registerSchema,
                failAction: errorValidation
            }
        }

    },
    {
        method: "POST",
        path: '/login',
        handler: users.loginUser,
        options: {
            validate: {
                payload: loginSchema,
                failAction: errorValidation
            }
        }

    },



]