/**
 * @author Lars Brinker
 */
import { User } from '../../business/user';

export interface RegisterInterface {
    getUserByMail(email: string): Promise<User | null>;
    createUser(username: string, password: string): Promise<User>;
}
