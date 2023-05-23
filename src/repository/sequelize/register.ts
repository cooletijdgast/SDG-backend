/**
 * @author Lars Brinker
 */
import { User } from '../models/user';
import { Roles, User as businessUser } from '../../business/user';
import bcrypt from 'bcrypt';
import { RegisterInterface } from '../interfaces/register-interface';

export class RegisterSequelize implements RegisterInterface {
    public constructor() {}

    /**
     * Search a user by a email address
     * @param userMail string
     * @returns new a user object or null.
     */
    public async getUserByMail(userMail: string): Promise<businessUser | null> {
        let user: businessUser | User | null = await User.findOne({ where: { email: userMail } });
        if (user != null) {
            user = new businessUser(user.id, user.email, user.password, user.level, user.role, user.levelProgress);
        }
        return user;
    }

    /**
     * Create a new user in the database
     * @param userMail string
     * @param userPasswordNotHashed the non hashed password
     * @returns a new user object
     */
    public async createUser(userMail: string, userPasswordNotHashed: string): Promise<businessUser> {
        let user: businessUser | User = new businessUser(0, '', '', 1, Roles.STUDENT, 0);
        let userPasswordHased = await businessUser.hashPassword(userPasswordNotHashed);
        user = await User.create({ email: userMail, password: userPasswordHased });
        user = new businessUser(user.id, user.email, user.password, user.level, user.role, user.levelProgress);
        return user;
    }
}
