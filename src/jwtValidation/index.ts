import jwt from "jsonwebtoken";
import { config } from "../config/settings";

export const accessToken = (userId: number) => {
    const payload = {
        userId: userId,
    };
    const options = {
        expiresIn: config.get('jwt').expiresIn,
    };
    const token = jwt.sign(payload, config.get('jwt').jwtkey, options);
    return token;
};