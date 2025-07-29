import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const createProductError = (res: Response, err: any) => {
    if (err instanceof Prisma.PrismaClientValidationError) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: "Validation Error",
            message: "The data provided is invalid.",
        });
    } 
    else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(
            err.code === "P2002" ? StatusCodes.CONFLICT : 
            StatusCodes.BAD_REQUEST                            
        ).json({
            error: "Database Error",
            message: "Produto ja existe",
        });
    } 
    else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Internal Server Error",
            message: "Something went wrong. Please try again later.",
        });
    }
};

export default createProductError;
