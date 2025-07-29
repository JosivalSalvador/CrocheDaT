import {cleanEnv, port, str, num, url} from "envalid"
import { Languages } from "../resources/language/language.constants"

export function validateEnv(){
    cleanEnv(process.env,{
        PORT: port(),
        DEFAUlT_LANGUAGE: str({choices: Object.values(Languages)}),
        NODE_ENV: str({choices:["development", "production"]}),
        DATABASE_URL: url(),
        SESSION_SECRET: str(),
        BCRYPT_SALT_ROUNDS: num(),
    })
}