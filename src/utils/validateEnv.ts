import {cleanEnv, port, str, num, url} from "envalid"

export function validateEnv(){
    cleanEnv(process.env,{
        PORT: port(),
        NODE_ENV: str({choices:["development", "production"]}),
        DATABASE_URL: url(),
        BCRYPT_SALT_ROUNDS: num(),
        ADMIN_PASSWORD: str(),
        ADMIN_USER: str(),
        SESSION_SECRET: str(),
    })
}