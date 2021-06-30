import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
){

    //Receiver the token
    const authToken = request.headers.authorization;

    //Validate if token is filled
    if (!authToken) {
        return response.status(401).end();
    }

    const[, token] = authToken.split("");
    
    try {
        //validate if token is valid
       const { sub } =  verify(token, "coloque aqui a chave gerada no MD5") as IPayload;

       request.user_id = sub

    } catch (err){
        return response.status(401).end();
    };
     

    return next()
}

