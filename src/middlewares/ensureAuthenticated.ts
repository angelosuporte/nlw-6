import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"

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
       const decode =  verify(token, "coloque aqui a chave gerada no MD5")

    } catch (err){
        return response.status(401).end();
    };
     {
        
    }

    return next()
}

