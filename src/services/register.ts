/**
 * @author Lars Brinker
 */
import { User } from '../business/user';
import { RegisterInterface } from '../repository/interfaces/register-interface';

export class RegisterService {
    public constructor(private registerRepository: RegisterInterface) {}

    public createUser(userMail: string, userPassword: string): Promise<User> {
        return this.registerRepository.createUser(userMail, userPassword);
    }

    public getUserByMail(userMail: string): Promise<User | null> {
        return this.registerRepository.getUserByMail(userMail);
    }
}
