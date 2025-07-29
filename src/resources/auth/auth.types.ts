import { User } from "@prisma/client";

export type singUpDTO = Pick<User, "name" | "email" | "password" >;

export type loginDTO = Pick<User, "email"| "password">;