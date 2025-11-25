import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { generateToken } from "../../config/generate-token.adapter";
import { TokenModel } from "../../database/models/token.model";
import { UserModel } from "../../database/models/user.model";
import { RegisterUserDto } from "../../domain/dtos/user/register.dto";
import { CustomError } from "../../domain/error/error";



export class AuthServices {
    constructor() { }

    async register(registerUserDto: RegisterUserDto) {
        try {
            const existUser = await UserModel.findOne({ email: registerUserDto.email });
            if (existUser) throw CustomError.badRequest('Correo ya esta registrado en una cuenta');

            const newUser = new UserModel(registerUserDto);

            newUser.password = bcryptAdapter.hash(registerUserDto.password);

            //Generacion de token de confirmacion
            const token = new TokenModel();
            token.token = generateToken();
            token.user = newUser.id;

            //Enviando email

            await Promise.allSettled([token.save(), newUser.save()]);

            return 'Usuario, registrado correctamente. Revisa tu correo para validar tu cuenta';
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async login(req: Request, res: Response) { }

    async confirmAccount(req: Request, res: Response) { }

    async requestConfirmationCode(req: Request, res: Response) { }



}