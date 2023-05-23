/**
 * @author Lars Brinker
 */
import { Session } from '../models/session';
import { Session as businessSession } from '../../business/session';
import { User } from '../models/user';
import { User as businessUser } from '../../business/user';
import { LoginInterface } from '../interfaces/login-interface';

export class LoginSequelize implements LoginInterface {
    public constructor() {}

    /**
     * Get a user object by a email address
     * @param email string
     * @returns a user or null
     */
    public async getUserByMail(email: string): Promise<businessUser | null> {
        let user: businessUser | User | null = await User.findOne({ where: { email: email } });
        if (user != null) {
            user = new businessUser(user.id, user.email, user.password, user.level, user.role, user.levelProgress);
        }
        return user;
    }

    /**
     * Save a session to the database
     * @param userID number
     * @param sessionID string
     * @param expirationDate date
     * @returns the created session object
     */
    public async saveSession(userID: number, sessionID: string, expirationDate: Date): Promise<businessSession> {
        let session = await Session.create({ sessionID: sessionID, userID: userID, expirationDate: expirationDate });
        return new businessSession(session.sessionID, session.userID, session.expirationDate);
    }

    /**
     * Delete session by sessionID
     * @param sessionID string
     * @returns number of deleted rows
     */
    public async deleteSession(sessionID: string): Promise<Number> {
        return await Session.destroy({
            where: {
                sessionID: sessionID,
            },
        });
    }

    /**
     * Get a session object by a sessionID
     * @param sessionID string
     * @returns a session or null
     */
    public async getSession(sessionID: string): Promise<businessSession | null> {
        let session: Session | businessSession | null = await Session.findOne({ where: { sessionID: sessionID } });
        if (session != null) {
            session = new businessSession(session.sessionID, session.userID, session.expirationDate);
        }
        return session;
    }

    /**
     * Get a user object by a sessionID
     * @param sessionID string
     * @returns a user or null
     */
    public async getUserBySession(sessionID: string): Promise<businessUser | null> {
        let user: businessUser | User | null = null;
        user = await User.findOne({
            include: { model: Session, attributes: ['userID'], where: { sessionID: sessionID } },
        });
        if (user != null) {
            user = new businessUser(user.id, user.email, '', user.level, user.role, user.levelProgress);
        }
        return user;
    }
}
