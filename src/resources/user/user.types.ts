import { User } from "@prisma/client";

export type CreateUserDTO = Pick<User, "name" | "email" | "password" | "userTypeId">;

export enum UserTypes {
    admin = "34a71597-9090-4379-ab10-dde17e218cab",
    client = "9a11fc39-3cdc-42af-8b5d-17b0948cd7e8",
}

export type ChangePasswordDTO ={
    oldPassword: string;
    newPassword: string;
}