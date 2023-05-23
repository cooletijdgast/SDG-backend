/**
 * @author Lars Brinker
 */

import { User } from '../../business/user';
import { Session } from '../../business/session';

export interface LoginInterface {
    getUserByMail(email: string): Promise<User | null>;
    saveSession(userID: number, sessionID: string, expirationDate: Date): Promise<Session>;
    deleteSession(sessionID: string): Promise<Number>;
    getSession(sessionID: string): Promise<Session | null>;
    getUserBySession(sessionID: string): Promise<User | null>;
}
