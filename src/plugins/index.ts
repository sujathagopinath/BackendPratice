import { users } from '../controllers/users'

exports.plugin = {
    name: "jwt-token",
    register: async (server: any, options: any) => {
        server.route(
            {
                method: 'GET',
                path: '/get_user_data',
                handler: users.getUser
            }
        )
    }

}
