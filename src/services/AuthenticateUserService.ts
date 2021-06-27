import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs"
import { UsersRepositories } from "../repositories/UsersRepositories";
import { sign } from "jsonwebtoken";





interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({email, password}: IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);

        //Check if the email exists
        const user = await usersRepositories.findOne({
            email
        });

        if(!user){
            throw new Error("Email/Password incorrect")
        }

        //Check if the password is correct
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("Email/Password incorrect")
        }

        //Generate token
        const token = sign(
            {
                email: user.email,
            },
            "coloque aqui a chave gerada no MD5",
            {
                subject: user.id,
                expiresIn: "1d",
            }
        );

        return token;
    }
}
export {AuthenticateUserService};

